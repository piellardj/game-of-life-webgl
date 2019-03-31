declare const Button: any;

let autorun: boolean;
const AUTORUN_CONTROL_ID = "stop-start-button-id";
Button.addObserver(AUTORUN_CONTROL_ID, () => {
    Parameters.autorun = !autorun;
});

class Parameters {
    public static get autorun(): boolean {
        return autorun;
    }
    public static set autorun(ar: boolean) {
        autorun = ar;
        Button.setLabel(AUTORUN_CONTROL_ID, autorun ? "Stop" : "Start");
    }

    private constructor() {}
}

export default Parameters;
