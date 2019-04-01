import FBO from "./gl-utils/fbo";
import * as GlCanvas from "./gl-utils/gl-canvas";
import { gl } from "./gl-utils/gl-canvas";
import Viewport from "./gl-utils/viewport";

import Automaton2D from "./automaton-2D";
import Parameters from "./parameters";

declare const Canvas: any;

function main() {
    const glParams = {
        alpha: false,
        preserveDrawingBuffer: true,
    };
    if (!GlCanvas.initGL(glParams)) {
        return;
    }

    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    Canvas.showLoader(true);

    let needToAdjustSize = true;
    Canvas.Observers.canvasResize.push(() => needToAdjustSize = true);

    Parameters.autorun = true;
    Parameters.scale = 1;
    Parameters.persistence = 0;

    const automaton = new Automaton2D();

    function updateIterationIndicator() {
        Canvas.setIndicatorText("Iteration", automaton.iteration);
    }
    window.setInterval(updateIterationIndicator, 50);

    function mainLoop() {
        let updated = false;
        if (Parameters.autorun) {
            automaton.update();
            updated = true;
        }

        if (updated || automaton.needToRedraw) {
            FBO.bindDefault(gl);

            if (needToAdjustSize) {
                GlCanvas.adjustSize();
                needToAdjustSize = false;
            }

            Viewport.setFullCanvas(gl);

            automaton.draw();
        }

        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
}

main();
