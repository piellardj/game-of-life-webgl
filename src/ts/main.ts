import FBO from "./gl-utils/fbo";
import * as GlCanvas from "./gl-utils/gl-canvas";
import { gl } from "./gl-utils/gl-canvas";
import Viewport from "./gl-utils/viewport";

import Automaton2D from "./automaton-2D";
import Parameters from "./parameters";

declare const Canvas: any;

function main() {
    const glParams = {alpha: false};
    if (!GlCanvas.initGL(glParams)) {
        return;
    }

    Canvas.showLoader(true);

    Parameters.autorun = true;

    const automaton = new Automaton2D();

    function mainLoop() {
        if (Parameters.autorun) {
            /* Update */
            automaton.update();
        }

        if (Parameters.autorun || automaton.needToRedraw) {
            Canvas.setIndicatorText("Iteration", automaton.iteration);

            /* Display */
            FBO.bindDefault(gl);

            GlCanvas.adjustSize();
            Viewport.setFullCanvas(gl);

            /* tslint:disable:no-bitwise */
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
            /* tslint:enable:no-bitwise */

            automaton.draw();
        }

        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
}

main();
