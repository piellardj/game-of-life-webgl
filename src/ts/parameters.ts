declare const Button: any;
declare const Range: any;

let autorun: boolean;
const AUTORUN_CONTROL_ID = "stop-start-button-id";
Button.addObserver(AUTORUN_CONTROL_ID, () => {
    Parameters.autorun = !autorun;
});

let scale: number;
type ScaleObserver = (newValue: number) => void;
const scaleObservers: ScaleObserver[] = [];
const SCALE_CONTROL_ID = "scale-range-id";
Range.addObserver(SCALE_CONTROL_ID, (newValue: number) => {
    scale = newValue;

    for (const observer of scaleObservers) {
        observer(scale);
    }
});
scale = Range.getValue(SCALE_CONTROL_ID);

class Parameters {
    public static get autorun(): boolean {
        return autorun;
    }
    public static set autorun(ar: boolean) {
        autorun = ar;
        Button.setLabel(AUTORUN_CONTROL_ID, autorun ? "Stop" : "Start");
    }

    public static get scale(): number {
        return scale;
    }
    public static set scale(newValue: number) {
        Range.setValue(SCALE_CONTROL_ID, newValue);
    }
    public static get scaleObservers(): ScaleObserver[] {
        return scaleObservers;
    }

    private constructor() {}
}

export default Parameters;
