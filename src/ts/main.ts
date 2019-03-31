import FBO from "./gl-utils/fbo";
import * as GlCanvas from "./gl-utils/gl-canvas";
import { gl } from "./gl-utils/gl-canvas";
import Viewport from "./gl-utils/viewport";

import Automata2D from "./automata-2D";

declare const Canvas: any;

function main() {
    const glParams = {alpha: false};
    if (!GlCanvas.initGL(glParams)) {
        return;
    }

    Canvas.showLoader(true);

    const automata = new Automata2D();

    function mainLoop() {
        /* Update */
        automata.update();

        Canvas.setIndicatorText("Iteration", automata.iteration);

        /* Display */
        FBO.bindDefault(gl);

        GlCanvas.adjustSize();
        Viewport.setFullCanvas(gl);

        /* tslint:disable:no-bitwise */
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        /* tslint:enable:no-bitwise */

        automata.draw();

        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
}

main();
