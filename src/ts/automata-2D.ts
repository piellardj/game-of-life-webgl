import FBO from "./gl-utils/fbo";
import { gl } from "./gl-utils/gl-canvas";
import GLResource from "./gl-utils/gl-resource";
import VBO from "./gl-utils/vbo";

import Shader from "./gl-utils/shader";
import * as ShaderManager from "./gl-utils/shader-manager";

declare const Canvas: any;

class Automata2D extends GLResource {
    private _displayShader: Shader;
    private _updateShader: Shader;

    private _FBO: FBO;
    private _vbo: VBO;

    private _textureSize: number[];
    private _textures: WebGLTexture[];
    private _currentIndex: number;

    private _iteration: number;

    constructor() {
        super(gl);

        this._FBO = new FBO(gl, 512, 512);
        this._vbo = VBO.createQuad(gl, -1, -1, 1, 1);

        this._textures = [null, null];
        this.initializeTextures(512, 512);

        ShaderManager.buildShader(
            {
                fragmentFilename: "display-2D.frag",
                vertexFilename: "display-2D.vert",
            },
            (shader) => {
                if (shader !== null) {
                    /* tslint:disable:no-string-literal */
                    this._displayShader = shader;
                    this._displayShader.a["aCorner"].VBO = this._vbo;
                    /* tslint:enable:no-string-literal */
                }
            });

        ShaderManager.buildShader(
            {
                fragmentFilename: "update-2D.frag",
                vertexFilename: "fullscreen.vert",
            },
            (shader) => {
                if (shader !== null) {
                    /* tslint:disable:no-string-literal */
                    this._updateShader = shader;
                    this._updateShader.a["aCorner"].VBO = this._vbo;
                    /* tslint:enable:no-string-literal */
                }
            });
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
        const shader = this._updateShader;

        if (shader) {
            const current = this._textures[this._currentIndex];
            const next = this._textures[(this._currentIndex + 1) % 2];

            this._FBO.bind([next]);

            /* tslint:disable:no-string-literal */
            shader.u["uPrevious"].value = current;
            shader.u["uCellSize"].value = [1 / this._textureSize[0], 1 / this._textureSize[1]];
            /* tslint:enable:no-string-literal */

            shader.use();
            shader.bindUniformsAndAttributes();

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            this._currentIndex = (this._currentIndex + 1) % 2;
            this._iteration++;
        }
    }

    public draw(): void {
        const shader = this._displayShader;

        if (shader) {
            /* tslint:disable:no-string-literal */
            shader.u["uTexture"].value = this._textures[this._currentIndex];
            /* tslint:enable:no-string-literal */

            shader.use();
            shader.bindUniformsAndAttributes();

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            Canvas.showLoader(false);
        }
    }

    public get iteration(): number {
        return this._iteration;
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

        this._FBO.width = width;
        this._FBO.height = height;

        this._textureSize = [width, height];

        this.freeTextures();

        const data = new Uint8Array(4 * width * height);
        for (let i = width * height; i > 0; --i) {
            const value = 255 * Math.round(Math.random());
            data[4 * i + 0] = value;
            data[4 * i + 1] = value;
            data[4 * i + 2] = value;
            data[4 * i + 3] = 255;
        }

        for (let i = 0; i < 2; ++i) {
            this._textures[i] = gl.createTexture();
            gl.bindTexture(gl.TEXTURE_2D, this._textures[i]);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, width, height, 0, gl.RGBA, gl.UNSIGNED_BYTE, data);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        }

        this._currentIndex = 0;
        this._iteration = 0;
    }
}

export default Automata2D;