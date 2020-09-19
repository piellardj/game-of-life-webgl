import FBO from "./gl-utils/fbo";
import { gl } from "./gl-utils/gl-canvas";
import GLResource from "./gl-utils/gl-resource";
import Shader from "./gl-utils/shader";
import * as ShaderManager from "./gl-utils/shader-manager";
import VBO from "./gl-utils/vbo";

import Parameters from "./parameters";

import "./page-interface-generated";

class Automaton2D extends GLResource {
    private _displayShader: Shader;
    private _updateShader: Shader;

    private _FBO: FBO;
    private _vbo: VBO;

    private _gridSize: number[];
    private _textureSize: number[];
    private _textures: WebGLTexture[];
    private _currentIndex: number;
    private _visibleSubTexture: number[];

    private _iteration: number;

    private _needToRecomputeShader: boolean;
    private  _needToRedraw: boolean;
    private  _mustClear: boolean;

    constructor() {
        super(gl);

        this._FBO = new FBO(gl, 512, 512);
        this._vbo = VBO.createQuad(gl, -1, -1, 1, 1);

        const initializeTexturesForCanvas = () => {
            const canvasSize = Page.Canvas.getSize();
            this.initializeTextures(canvasSize[0], canvasSize[1]);
            this.recomputeVisibleSubTexture();
        };

        this._needToRecomputeShader = true;
        this._mustClear = true;

        this._textures = [null, null];
        this._visibleSubTexture = [0, 0, 1, 1];
        initializeTexturesForCanvas();

        Page.Canvas.Observers.mouseDrag.push((dX: number, dY: number) => {
            this._visibleSubTexture[0] -= dX * this._visibleSubTexture[2];
            this._visibleSubTexture[1] -= dY * this._visibleSubTexture[3];
            this.recomputeVisibleSubTexture();
            this._needToRedraw = true;
            this._mustClear = true;
        });

        Page.Canvas.Observers.canvasResize.push(initializeTexturesForCanvas);
        Parameters.resetObservers.push(initializeTexturesForCanvas);
        Parameters.rulesObservers.push(() => this._needToRecomputeShader = true );

        let previousScale = Parameters.scale;
        Parameters.scaleObservers.push((newScale: number, zoomCenter: number[]) => {
            this._needToRedraw = true;
            this._mustClear = true;

            this._visibleSubTexture[0] += zoomCenter[0] * (1 - previousScale / newScale) * this._visibleSubTexture[2];
            this._visibleSubTexture[1] += zoomCenter[1] * (1 - previousScale / newScale) * this._visibleSubTexture[3];

            previousScale = newScale;
            this.recomputeVisibleSubTexture();
        });

        ShaderManager.buildShader(
            {
                fragmentFilename: "display-2D.frag",
                vertexFilename: "display-2D.vert",
                injected: {},
            },
            (shader) => {
                if (shader !== null) {
                    /* tslint:disable:no-string-literal */
                    this._displayShader = shader;
                    this._displayShader.a["aCorner"].VBO = this._vbo;
                    this._displayShader.u["uSubTexture"].value = this._visibleSubTexture;
                    /* tslint:enable:no-string-literal */
                }
            },
        );
    }

    public freeGLResources(): void {
        if (this._FBO) {
            this._FBO.freeGLResources();
        }

        if (this._vbo) {
            this._vbo.freeGLResources();
            this._vbo = null;
        }

        if (this._displayShader) {
            this._displayShader.freeGLResources();
            this._displayShader = null;
        }

        if (this._updateShader) {
            this._updateShader.freeGLResources();
            this._updateShader = null;
        }

        this.freeTextures();
    }

    public update(): void {
        if (this._needToRecomputeShader) {
            this.recomputeUpdateShader();
        }

        const shader = this._updateShader;

        if (shader) {
            const current = this._textures[this._currentIndex];
            const next = this._textures[(this._currentIndex + 1) % 2];

            this._FBO.bind([next]);

            /* tslint:disable:no-string-literal */
            shader.u["uPrevious"].value = current;
            shader.u["uPhysicalCellSize"].value = [1 / this._textureSize[0], 1 / this._textureSize[1]];
            /* tslint:enable:no-string-literal */

            shader.use();
            shader.bindUniformsAndAttributes();

            gl.disable(gl.BLEND);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            this._currentIndex = (this._currentIndex + 1) % 2;
            this._iteration++;
        }
    }

    public draw(): void {
        const shader = this._displayShader;

        if (shader) {
            /* tslint:disable:no-string-literal */
            shader.u["uClearFactor"].value = (this._mustClear) ? 1 : 1 - Parameters.persistence;
            shader.u["uTexture"].value = this._textures[this._currentIndex];
            shader.u["uGridSize"].value = this._gridSize;
            /* tslint:enable:no-string-literal */

            shader.use();
            shader.bindUniformsAndAttributes();

            gl.enable(gl.BLEND);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            this._needToRedraw = false;
            this._mustClear = false;
        }
    }

    public get iteration(): number {
        return this._iteration;
    }

    public get needToRedraw(): boolean {
        return this._needToRedraw;
    }

    public get needToUpdate(): boolean {
        return this._needToRecomputeShader;
    }

    private recomputeUpdateShader(): void {
        ShaderManager.buildShader(
            {
                fragmentFilename: "update-2D.frag",
                vertexFilename: "update-2D.vert",
                injected: { rules: this.generateShaderRules() },
            },
            (shader) => {
                if (shader !== null) {
                    if (this._updateShader) {
                        this._updateShader.freeGLResources();
                    }

                    /* tslint:disable:no-string-literal */
                    this._updateShader = shader;
                    this._updateShader.a["aCorner"].VBO = this._vbo;
                    /* tslint:enable:no-string-literal */
                }
            },
        );
        this._needToRecomputeShader = false;
    }

    private generateShaderRules(): string {
        function generateRuleBlock(starting: number, ending: number, rule: string) {
            if (rule !== "alive") {
                const operation = (rule === "death") ? " -= " : " += ";
                let rangeCheck;
                if (starting === 0) {
                    rangeCheck = "step(N, " + (ending + .5) + ")";

                    if (ending === 8) {
                        rangeCheck = "1.0";
                    }
                } else if (ending === 8) {
                    rangeCheck = "step(" + (starting - .5) + ", N)";
                } else {
                    rangeCheck = "step(" + (starting - .5) + ", N) * step(N, " + (ending + .5) + ")";
                }

                return "currentState" + operation + rangeCheck + ";\n";
            }
            return "";
        }

        let result = "";

        const rules = Parameters.rules;
        let currentRule = rules[0];
        let from = 0;
        for (let i = 1; i < 9; ++i) {
            if (rules[i] !== currentRule) {
                result += generateRuleBlock(from, i - 1, currentRule);
                currentRule = rules[i];
                from = i;
            }
        }
        result += generateRuleBlock(from, 8, currentRule);

        return result;
    }

    private recomputeVisibleSubTexture(): void {
        const canvasSize = Page.Canvas.getSize();
        this._visibleSubTexture[2] = canvasSize[0] / this._gridSize[0] / Parameters.scale;
        this._visibleSubTexture[3] = canvasSize[1] / this._gridSize[1] / Parameters.scale;

        for (let i = 0; i < 2; ++i) {
            this._visibleSubTexture[i] -= Math.min(0, this._visibleSubTexture[i]);
            this._visibleSubTexture[i] -= Math.max(0, this._visibleSubTexture[i] + this._visibleSubTexture[i + 2] - 1);
        }
    }

    private freeTextures(): void {
        for (let i = 0; i < 2; ++i) {
            if (this._textures[i]) {
                gl.deleteTexture(this._textures[i]);
                this._textures[i] = null;
            }
        }
    }

    private initializeTextures(width: number, height: number): void {
        function upperPowerOfTwo(n: number): number {
            return Math.pow(2, Math.ceil(Math.log(n) * Math.LOG2E));
        }

        width = upperPowerOfTwo(width);
        height = upperPowerOfTwo(height);

        this._gridSize = [width, height];

        const physicalWidth = width / 4;
        const physicalHeight = height / 4;

        this._FBO.width = physicalWidth;
        this._FBO.height = physicalHeight;

        this._textureSize = [physicalWidth, physicalHeight];

        const data = new Uint8Array(4 * physicalWidth * physicalHeight);
        for (let i = data.length - 1; i >= 0; --i) {
            data[i] = Math.floor(256 * Math.random());
        }

        for (let i = 0; i < 2; ++i) {
            if (this._textures[i] === null) {
                this._textures[i] = gl.createTexture();
            }
            gl.bindTexture(gl.TEXTURE_2D, this._textures[i]);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, physicalWidth, physicalHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }

        this._currentIndex = 0;
        this._iteration = 0;
        this._needToRedraw = true;
        Page.Canvas.setIndicatorText("grid-size", width + "x" + height);
    }
}

export default Automaton2D;
