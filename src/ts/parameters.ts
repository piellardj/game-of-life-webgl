import "./page-interface-generated";

enum Rule {
    DEATH = "death",
    ALIVE = "alive",
    BIRTH = "birth",
}

type RulesSet = [Rule, Rule, Rule, Rule, Rule, Rule, Rule, Rule, Rule];

const DEFAULT_RULES: RulesSet = [
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

const rules = DEFAULT_RULES.slice() as RulesSet;

function updateRuleControl(id: number) {
    const controlId = `neighbours-tabs-${id}`;
    if (rules[id] === Rule.DEATH) {
        Page.Tabs.setValues(controlId, ["death"]);
    } else if (rules[id] === Rule.ALIVE) {
        Page.Tabs.setValues(controlId, ["alive"]);
    } else if (rules[id] === Rule.BIRTH) {
        Page.Tabs.setValues(controlId, ["alive", "birth"]);
    }
    Page.Tabs.storeState(controlId);
}

type RuleObserver = () => void;
const rulesObservers: RuleObserver[] = [];
function callRulesObservers(): void {
    for (const observer of rulesObservers) {
        observer();
    }
}

const CUSTOM_RULE_FLAG = "customrules";
function addCustomRulesUrlFlag(): void {
    if (typeof URLSearchParams !== "undefined") {
        const searchParamsObject = new URLSearchParams(window.location.search);
        searchParamsObject.set(CUSTOM_RULE_FLAG, "true");
        const searchParams = searchParamsObject.toString();

        const newUrl = window.location.origin + window.location.pathname + (searchParams ? `?${searchParams}` : "")
        window.history.replaceState("", "", newUrl);
    }

    for (let i = 0; i < 9; i++) {
        const controlId = `neighbours-tabs-${i}`;
        Page.Tabs.storeState(controlId);
    }
}

function removeCustomRulesUrlFlag(): void {
    if (typeof URLSearchParams !== "undefined") {
        const searchParamsObject = new URLSearchParams(window.location.search);
        searchParamsObject.delete(CUSTOM_RULE_FLAG);
        const searchParams = searchParamsObject.toString();

        const newUrl = window.location.origin + window.location.pathname + (searchParams ? `?${searchParams}` : "")
        window.history.replaceState("", "", newUrl);
    }
}

function isCustomRulesUrlFlagPresent(): boolean {
    if (typeof URLSearchParams !== "undefined") {
        const searchParamsObject = new URLSearchParams(window.location.search);
        return searchParamsObject.has(CUSTOM_RULE_FLAG);
    }
    return false;
}

window.addEventListener("load", () => {
    const customRules = isCustomRulesUrlFlagPresent();

    for (let i = 0; i < 9; ++i) {
        const controlId = `neighbours-tabs-${i}`;

        Page.Tabs.addObserver(controlId, (values) => {
            const previous = rules[i];
            if (rules[i] !== Rule.DEATH && values.indexOf(Rule.DEATH) >= 0) {
                rules[i] = Rule.DEATH;
            } else if (rules[i] !== Rule.ALIVE && values.indexOf(Rule.ALIVE) >= 0) {
                rules[i] = Rule.ALIVE;
            } else if (rules[i] !== Rule.BIRTH && values.indexOf(Rule.BIRTH) >= 0) {
                rules[i] = Rule.BIRTH;
            }

            updateRuleControl(i);
            addCustomRulesUrlFlag();

            if (previous !== rules[i]) {
                callRulesObservers();
            }
        });

        if (customRules) {
            const values = Page.Tabs.getValues(controlId);
            if (values.indexOf(Rule.BIRTH) >= 0) {
                rules[i] = Rule.BIRTH;
            } else if (values.indexOf(Rule.ALIVE) >= 0) {
                rules[i] = Rule.ALIVE;
            } else {
                rules[i] = Rule.DEATH;
            }
        }

        updateRuleControl(i);
    }

    callRulesObservers();
});

Page.Button.addObserver("reset-rules-button-id", () => {
    let somethingChanged = false;
    for (let i = 0; i < 9; i++) {
        somethingChanged = somethingChanged || (rules[i] !== DEFAULT_RULES[i]);
        rules[i] = DEFAULT_RULES[i];
        updateRuleControl(i);
        Page.Tabs.clearStoredState(`neighbours-tabs-${i}`);
    }

    removeCustomRulesUrlFlag();

    if (somethingChanged) {
        callRulesObservers();
    }
});

type ButtonObserver = () => void;
type RangeObserver = (newValue: number) => void;

let autorun: boolean;
const AUTORUN_CONTROL_ID = "autorun-checkbox-id";
Page.Checkbox.addObserver(AUTORUN_CONTROL_ID, (checked: boolean) => {
    autorun = checked;
});
autorun = Page.Checkbox.isChecked(AUTORUN_CONTROL_ID);

let speed: number;
const updateWaitTime = [1000 / 1, 1000 / 2, 1000 / 5, 1000 / 11, 1000 / 31, 0]; // iterations per second
const SPEED_CONTROL_ID = "speed-range-id";
Page.Range.addObserver(SPEED_CONTROL_ID, (newValue: number) => {
    speed = newValue;
});
speed = Page.Range.getValue(SPEED_CONTROL_ID);

const NEXT_STEP_CONTROL_ID = "next-button-id";
const nextStepObservers: ButtonObserver[] = [];
Page.Button.addObserver(NEXT_STEP_CONTROL_ID, () => {
    for (const observer of nextStepObservers) {
        observer();
    }
});

const RESET_CONTROL_ID = "reset-button-id";
const resetObservers: ButtonObserver[] = [];
Page.Button.addObserver(RESET_CONTROL_ID, () => {
    for (const observer of resetObservers) {
        observer();
    }
});

let persistence: number;
const persistenceObservers: RangeObserver[] = [];
const persistenceScale = [0, .6, .7, .8, .9];
const PERSISTENCE_CONTROL_ID = "persistence-range-id";
Page.Range.addObserver(PERSISTENCE_CONTROL_ID, (newValue: number) => {
    persistence = newValue;

    for (const observer of persistenceObservers) {
        observer(persistence);
    }
});
persistence = Page.Range.getValue(PERSISTENCE_CONTROL_ID);

let scale: number; // integer
let exactScale: number;
const MIN_SCALE = 1;
const MAX_SCALE = 10;
type ScaleObserver = (newScale: number, zoomCenter: number[]) => void;
const scaleObservers: ScaleObserver[] = [];
Page.Canvas.Observers.mouseWheel.push((delta: number, zoomCenter: number[]) => {
    exactScale = Math.min(MAX_SCALE, Math.max(MIN_SCALE, exactScale - delta));

    const newScale = Math.round(exactScale);
    if (newScale !== scale) {
        scale = newScale;

        if (!zoomCenter) {
            zoomCenter = Page.Canvas.getMousePosition();
        }

        for (const observer of scaleObservers) {
            observer(scale, zoomCenter);
        }
    }
});
scale = MIN_SCALE;
exactScale = scale;

const INDICATORS_CONTROL_ID = "indicators-checkbox-id";
Page.Checkbox.addObserver(INDICATORS_CONTROL_ID, (checked: boolean) => {
    Page.Canvas.setIndicatorsVisibility(checked);
});

class Parameters {
    public static get autorun(): boolean {
        return autorun;
    }
    public static set autorun(ar: boolean) {
        autorun = ar;
        Page.Checkbox.setChecked(AUTORUN_CONTROL_ID, ar);
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
        Page.Range.setValue(PERSISTENCE_CONTROL_ID, newValue);
        persistence = Page.Range.getValue(PERSISTENCE_CONTROL_ID);
    }
    public static get persistenceObservers(): RangeObserver[] {
        return persistenceObservers;
    }

    public static get rules(): RulesSet {
        return rules;
    }
    public static get rulesObservers(): RuleObserver[] {
        return rulesObservers;
    }

    private constructor() { }
}

export default Parameters;
