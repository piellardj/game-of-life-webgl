declare const Button: any;
declare const Checkbox: any;
declare const Range: any;

type RangeObserver = (newValue: number) => void;

let autorun: boolean;
const AUTORUN_CONTROL_ID = "autorun-checkbox-id";
Checkbox.addObserver(AUTORUN_CONTROL_ID, (checked: boolean) => {
    autorun = checked;
});
autorun = Checkbox.isChecked(AUTORUN_CONTROL_ID);

let persistence: number;
const persistenceObservers: RangeObserver[] = [];
const persistenceScale = [0, .6, .7, .8, .9];
const PERSISTENCE_CONTROL_ID = "persistence-range-id";
Range.addObserver(PERSISTENCE_CONTROL_ID, (newValue: number) => {
    persistence = newValue;

    for (const observer of persistenceObservers) {
        observer(persistence);
    }
});
persistence = Range.getValue(PERSISTENCE_CONTROL_ID);

let scale: number;
const scaleObservers: RangeObserver[] = [];
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
        Checkbox.setChecked(ar);
    }

    public static get scale(): number {
        return scale;
    }
    public static set scale(newValue: number) {
        Range.setValue(SCALE_CONTROL_ID, newValue);
    }
    public static get scaleObservers(): RangeObserver[] {
        return scaleObservers;
    }

    public static get persistence(): number {
        return persistenceScale[persistence];
    }
    public static set persistence(newValue: number) {
        Range.setValue(PERSISTENCE_CONTROL_ID, newValue);
    }
    public static get persistenceObservers(): RangeObserver[] {
        return persistenceObservers;
    }

    private constructor() {}
}

export default Parameters;
