import FBO from "./gl-utils/fbo";
import * as GlCanvas from "./gl-utils/gl-canvas";
import { gl } from "./gl-utils/gl-canvas";
import Viewport from "./gl-utils/viewport";

import Automaton2D from "./automaton-2D";
import Parameters from "./parameters";

import "./page-interface-generated";

function main() {
    const glParams = {
        alpha: false,
        preserveDrawingBuffer: true,
    };
    if (!GlCanvas.initGL(glParams)) {
        return;
    }

    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

    Page.Canvas.showLoader(true);

    let needToAdjustSize = true;
    Page.Canvas.Observers.canvasResize.push(() => needToAdjustSize = true);

    Parameters.autorun = true;
    Parameters.persistence = 0;

    const automaton = new Automaton2D();

    let lastIteration = automaton.iteration;
    function updateIterationPerSecIndicator() {
        Page.Canvas.setIndicatorText("iterations-per-sec", "" + (automaton.iteration - lastIteration));
        lastIteration = automaton.iteration;
    }
    window.setInterval(updateIterationPerSecIndicator, 1000);

    function updateIterationIndicator() {
        Page.Canvas.setIndicatorText("iteration", "" + automaton.iteration);
    }
    window.setInterval(updateIterationIndicator, 50);

    let forceUpdate = false;
    Parameters.nextStepObservers.push(() => forceUpdate = true);

    let firstDraw = true;
    let lastUpdate = 0;
    function mainLoop(time: number) {
        const update = automaton.needToUpdate || forceUpdate ||
            (Parameters.autorun && (time - lastUpdate > Parameters.updateWaitTime));
        if (update) {
            lastUpdate = time;
            automaton.update();
            forceUpdate = false;
        }

        if (update || automaton.needToRedraw) {
            FBO.bindDefault(gl);

            if (needToAdjustSize) {
                GlCanvas.adjustSize();
                needToAdjustSize = false;
            }

            Viewport.setFullCanvas(gl);

            automaton.draw();

            if (firstDraw) {
                firstDraw = false;

                Page.Canvas.showLoader(false);
            }
        }

        requestAnimationFrame(mainLoop);
    }

    requestAnimationFrame(mainLoop);
}

main();
