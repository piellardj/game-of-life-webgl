declare const Button: any;
declare const Canvas: any;
declare const Checkbox: any;
declare const Range: any;
declare const Tabs: any;

enum Rule {
    DEATH = "death",
    ALIVE = "alive",
    BIRTH = "birth",
}

const rules: Rule[] = [
    Rule.DEATH,
    Rule.DEATH,
    Rule.ALIVE,
    Rule.BIRTH,
    Rule.DEATH,
    Rule.DEATH,
    Rule.DEATH,
    Rule.DEATH,
    Rule.DEATH,
];

function updateRuleControl(id: number) {
    if (rules[id] === Rule.DEATH) {
        Tabs.setValues("neighbours-tabs-" + id, ["death"]);
    } else if (rules[id] === Rule.ALIVE) {
        Tabs.setValues("neighbours-tabs-" + id, ["alive"]);
    } else if (rules[id] === Rule.BIRTH) {
        Tabs.setValues("neighbours-tabs-" + id, ["alive", "birth"]);
    }
}
for (let i = 0; i < 9; ++i) {
    updateRuleControl(i);
}

const rulesObservers: Array<() => void> = [];

window.addEventListener("load", () => {
    for (let i = 0; i < 9; ++i) {
        Tabs.addObserver("neighbours-tabs-" + i, (values) => {
            const previous = rules[i];

            if (rules[i] !== Rule.DEATH && values.includes(Rule.DEATH)) {
                rules[i] = Rule.DEATH;
            } else if (rules[i] !== Rule.ALIVE && values.includes(Rule.ALIVE)) {
                rules[i] = Rule.ALIVE;
            } else if (rules[i] !== Rule.BIRTH && values.includes(Rule.BIRTH)) {
                rules[i] = Rule.BIRTH;
            }

            updateRuleControl(i);

            if (previous !== rules[i]) {
                rulesObservers.forEach((callback) => callback());
            }
        });
    }
});

type ButtonObserver = () => void;
type RangeObserver = (newValue: number) => void;

let autorun: boolean;
const AUTORUN_CONTROL_ID = "autorun-checkbox-id";
Checkbox.addObserver(AUTORUN_CONTROL_ID, (checked: boolean) => {
    autorun = checked;
});
autorun = Checkbox.isChecked(AUTORUN_CONTROL_ID);

let speed: number;
const updateWaitTime = [1000 / 1, 1000 / 2, 1000 / 5, 1000 / 11, 1000 / 31, 0]; // iterations per second
const SPEED_CONTROL_ID = "speed-range-id";
Range.addObserver(SPEED_CONTROL_ID, (newValue: number) => {
    speed = newValue;
});
speed = Range.getValue(SPEED_CONTROL_ID);

const NEXT_STEP_CONTROL_ID = "next-button-id";
const nextStepObservers: ButtonObserver[] = [];
Button.addObserver(NEXT_STEP_CONTROL_ID,  () => {
    for (const observer of nextStepObservers) {
        observer();
    }
});

const RESET_CONTROL_ID = "reset-button-id";
const resetObservers: ButtonObserver[] = [];
Button.addObserver(RESET_CONTROL_ID,  () => {
    for (const observer of resetObservers) {
        observer();
    }
});

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
const MIN_SCALE = 1;
const MAX_SCALE = 10;
type ScaleObserver = (newScale: number, zoomCenter: number[]) => void;
const scaleObservers: ScaleObserver[] = [];
Canvas.Observers.mouseWheel.push((delta: number, zoomCenter: number[]) => {
    const newScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE,  scale - delta));

    if (newScale !== scale) {
        scale = newScale;

        if (!zoomCenter) {
            zoomCenter = Canvas.getMousePosition();
        }

        for (const observer of scaleObservers) {
            observer(scale, zoomCenter);
        }
    }
});
scale = MIN_SCALE;

const INDICATORS_CONTROL_ID = "indicators-checkbox-id";
Checkbox.addObserver(INDICATORS_CONTROL_ID, (checked: boolean) => {
    Canvas.setIndicatorsVisibility(checked);
});

class Parameters {
    public static get autorun(): boolean {
        return autorun;
    }
    public static set autorun(ar: boolean) {
        autorun = ar;
        Checkbox.setChecked(AUTORUN_CONTROL_ID, ar);
    }

    public static get updateWaitTime(): number {
        return updateWaitTime[speed - 1];
    }

    public static get nextStepObservers(): ButtonObserver[] {
        return nextStepObservers;
    }

    public static get resetObservers(): ButtonObserver[] {
        return resetObservers;
    }

    public static get scale(): number {
        return scale;
    }
    public static get scaleObservers(): ScaleObserver[] {
        return scaleObservers;
    }

    public static get persistence(): number {
        return persistenceScale[persistence];
    }
    public static set persistence(newValue: number) {
        Range.setValue(PERSISTENCE_CONTROL_ID, newValue);
        persistence = Range.getValue(PERSISTENCE_CONTROL_ID);
    }
    public static get persistenceObservers(): RangeObserver[] {
        return persistenceObservers;
    }

    public static get rules(): Rule[] {
        return rules;
    }
    public static get rulesObservers(): Array<() => void> {
        return rulesObservers;
    }

    private constructor() {}
}

export default Parameters;
