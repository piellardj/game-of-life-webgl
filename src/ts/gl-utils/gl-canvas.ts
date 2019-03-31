declare const Demopage: any;
declare const Canvas: any;

let gl: WebGLRenderingContext = null;

/** Initializes a WebGL context */
function initGL(flags: any): boolean {
    function setError(message: string) {
        Demopage.setErrorMessage("webgl-support", message);
    }

    const canvas = Canvas.getCanvas();

    gl = canvas.getContext("webgl", flags) as WebGLRenderingContext;
    if (gl == null) {
        gl = canvas.getContext("experimental-webgl", flags) as WebGLRenderingContext;
        if (gl == null) {
            setError("Your browser or device does not seem to support WebGL.");
            return false;
        }

        setError("Your browser or device only supports experimental WebGL.\n" +
            "The simulation may not run as expected.");
    }

    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    return true;
}

/* Adjusts the GL canvas size to the actual canvas element size on the page */
function adjustSize(hidpi: boolean = false): void {
    const cssPixel: number = (hidpi) ? window.devicePixelRatio : 1;

    const width: number = Math.floor(gl.canvas.clientWidth * cssPixel);
    const height: number = Math.floor(gl.canvas.clientHeight * cssPixel);
    if (gl.canvas.width !== width || gl.canvas.height !== height) {
        gl.canvas.width = width;
        gl.canvas.height = height;
    }
}

export {
    adjustSize,
    initGL,
    gl,
};
