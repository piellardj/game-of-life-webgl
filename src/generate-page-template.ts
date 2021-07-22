import * as fs from "fs";
import * as path from "path";
import { Demopage } from "webpage-templates";

const data = {
    title: "Game of Life",
    description: "Variations of Conway's Game of Life, running on GPU.",
    introduction: [
        "This project is a simple simulation of Conway's Game of Life, running on GPU.",
        "The rules can be changed to see how the world evolves. You can use the mouse to zoom in and explore the world."
    ],
    githubProjectName: "game-of-life-webgl",
    additionalLinks: [],
    scriptFiles: [
        "script/main.min.js"
    ],
    indicators: [
        {
            id: "iterations-per-sec",
            label: "Iterations per second"
        },
        {
            id: "iteration",
            label: "Iteration"
        },
        {
            id: "grid-size",
            label: "Grid size"
        }
    ],
    canvas: {
        width: 512,
        height: 512,
        enableFullscreen: true
    },
    controlsSections: [
        {
            title: "Simulation",
            controls: [
                {
                    type: Demopage.supportedControls.Checkbox,
                    title: "Autorun",
                    id: "autorun-checkbox-id",
                    checked: true
                },
                {
                    type: Demopage.supportedControls.Range,
                    title: "Speed",
                    id: "speed-range-id",
                    min: 1,
                    max: 6,
                    value: 6,
                    step: 1
                },
                {
                    type: Demopage.supportedControls.Button,
                    id: "next-button-id",
                    label: "Next step",
                    flat: true
                },
                {
                    type: Demopage.supportedControls.Button,
                    id: "reset-button-id",
                    label: "Reset",
                    flat: true
                }
            ]
        },
        {
            title: "Rendering",
            controls: [
                {
                    type: Demopage.supportedControls.Range,
                    title: "Persistence",
                    id: "persistence-range-id",
                    min: 0,
                    max: 4,
                    value: 0,
                    step: 1
                },
                {
                    type: Demopage.supportedControls.Checkbox,
                    title: "Show indicators",
                    id: "indicators-checkbox-id",
                    checked: true
                }
            ]
        },
        {
            title: "Rules",
            controls: [
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "0 neighbour",
                    id: "neighbours-tabs-0",
                    options: [
                        {
                            value: "death",
                            label: "Death",
                            checked: true
                        },
                        {
                            value: "alive",
                            label: "Alive"
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "1 neighbour",
                    id: "neighbours-tabs-1",
                    options: [
                        {
                            value: "death",
                            label: "Death",
                            checked: true
                        },
                        {
                            value: "alive",
                            label: "Alive"
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "2 neighbours",
                    id: "neighbours-tabs-2",
                    options: [
                        {
                            value: "death",
                            label: "Death"
                        },
                        {
                            value: "alive",
                            label: "Alive",
                            checked: true
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "3 neighbours",
                    id: "neighbours-tabs-3",
                    options: [
                        {
                            value: "death",
                            label: "Death"
                        },
                        {
                            value: "alive",
                            label: "Alive",
                            checked: true
                        },
                        {
                            value: "birth",
                            label: "Birth",
                            checked: true
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "4 neighbours",
                    id: "neighbours-tabs-4",
                    options: [
                        {
                            value: "death",
                            label: "Death",
                            checked: true
                        },
                        {
                            value: "alive",
                            label: "Alive"
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "5 neighbours",
                    id: "neighbours-tabs-5",
                    options: [
                        {
                            value: "death",
                            label: "Death",
                            checked: true
                        },
                        {
                            value: "alive",
                            label: "Alive"
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "6 neighbours",
                    id: "neighbours-tabs-6",
                    options: [
                        {
                            value: "death",
                            label: "Death",
                            checked: true
                        },
                        {
                            value: "alive",
                            label: "Alive"
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "7 neighbours",
                    id: "neighbours-tabs-7",
                    options: [
                        {
                            value: "death",
                            label: "Death",
                            checked: true
                        },
                        {
                            value: "alive",
                            label: "Alive"
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Tabs,
                    title: "8 neighbours",
                    id: "neighbours-tabs-8",
                    options: [
                        {
                            value: "death",
                            label: "Death",
                            checked: true
                        },
                        {
                            value: "alive",
                            label: "Alive"
                        },
                        {
                            value: "birth",
                            label: "Birth"
                        }
                    ]
                },
                {
                    type: Demopage.supportedControls.Button,
                    id: "reset-rules-button-id",
                    label: "Reset rules",
                    flat: true
                }
            ]
        }
    ]
};

const DEST_DIR = path.resolve(__dirname, "..", "docs");
const minified = true;

const buildResult = Demopage.build(data, DEST_DIR, {
    debug: !minified,
});

// disable linting on this file because it is generated
buildResult.pageScriptDeclaration = "/* tslint:disable */\n" + buildResult.pageScriptDeclaration;

const SCRIPT_DECLARATION_FILEPATH = path.resolve(__dirname, ".", "ts", "page-interface-generated.ts");
fs.writeFileSync(SCRIPT_DECLARATION_FILEPATH, buildResult.pageScriptDeclaration);