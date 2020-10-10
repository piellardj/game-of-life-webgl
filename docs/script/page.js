// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Demopage;
    (function (Demopage) {
        var errorsBlockId = "error-messages";
        var errorsBlock = document.getElementById(errorsBlockId);
        if (!errorsBlock) {
            console.error("Cannot find element '" + errorsBlockId + "'.");
        }
        function getErrorById(id) {
            return errorsBlock.querySelector("span[id=error-message-" + id + "]");
        }
        function setErrorMessage(id, message) {
            if (errorsBlock) {
                var existingSpan = getErrorById(id);
                if (existingSpan) {
                    existingSpan.innerHTML = message;
                    return;
                }
                else {
                    var newSpan = document.createElement("span");
                    newSpan.id = "error-message-" + id;
                    newSpan.innerText = message;
                    errorsBlock.appendChild(newSpan);
                    errorsBlock.appendChild(document.createElement("br"));
                }
            }
        }
        Demopage.setErrorMessage = setErrorMessage;
        function removeErrorMessage(id) {
            if (errorsBlock) {
                var span = getErrorById(id);
                if (span) {
                    var br = span.nextElementSibling;
                    if (br) {
                        errorsBlock.removeChild(br);
                    }
                    errorsBlock.removeChild(span);
                }
            }
        }
        Demopage.removeErrorMessage = removeErrorMessage;
    })(Demopage = Page.Demopage || (Page.Demopage = {}));
})(Page || (Page = {}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Helpers;
    (function (Helpers) {
        var URL;
        (function (URL) {
            var PARAMETERS_PREFIX = "page";
            var URLBuilder = /** @class */ (function () {
                function URLBuilder(url) {
                    this.queryParameters = {};
                    var queryStringDelimiterIndex = url.indexOf(URLBuilder.queryDelimiter);
                    if (queryStringDelimiterIndex < 0) {
                        this.baseUrl = url;
                    }
                    else {
                        this.baseUrl = url.substring(0, queryStringDelimiterIndex);
                        var queryString = url.substring(queryStringDelimiterIndex + URLBuilder.queryDelimiter.length);
                        var splitParameters = queryString.split(URLBuilder.parameterDelimiter);
                        for (var _i = 0, splitParameters_1 = splitParameters; _i < splitParameters_1.length; _i++) {
                            var parameter = splitParameters_1[_i];
                            var keyValue = parameter.split(URLBuilder.keyValueDelimiter);
                            if (keyValue.length === 2) {
                                var key = decodeURIComponent(keyValue[0]);
                                var value = decodeURIComponent(keyValue[1]);
                                this.queryParameters[key] = value;
                            }
                            else {
                                console.log("Unable to parse query string parameter '" + parameter + "'.");
                            }
                        }
                    }
                }
                URLBuilder.prototype.setQueryParameter = function (name, value) {
                    if (value === null) {
                        delete this.queryParameters[name];
                    }
                    else {
                        this.queryParameters[name] = value;
                    }
                };
                URLBuilder.prototype.loopOnParameters = function (prefix, callback) {
                    for (var _i = 0, _a = Object.keys(this.queryParameters); _i < _a.length; _i++) {
                        var parameterName = _a[_i];
                        if (parameterName.indexOf(prefix) === 0 && parameterName.length > prefix.length) {
                            var parameterValue = this.queryParameters[parameterName];
                            var shortParameterName = parameterName.substring(prefix.length);
                            callback(shortParameterName, parameterValue);
                        }
                    }
                };
                URLBuilder.prototype.buildUrl = function () {
                    var parameters = [];
                    for (var _i = 0, _a = Object.keys(this.queryParameters); _i < _a.length; _i++) {
                        var parameterName = _a[_i];
                        var parameterValue = this.queryParameters[parameterName];
                        var encodedName = encodeURIComponent(parameterName);
                        var encodedValue = encodeURIComponent(parameterValue);
                        parameters.push(encodedName + URLBuilder.keyValueDelimiter + encodedValue);
                    }
                    var queryString = parameters.join(URLBuilder.parameterDelimiter);
                    if (queryString) {
                        return this.baseUrl + URLBuilder.queryDelimiter + queryString;
                    }
                    else {
                        return this.baseUrl;
                    }
                };
                URLBuilder.queryDelimiter = "?";
                URLBuilder.parameterDelimiter = "&";
                URLBuilder.keyValueDelimiter = "=";
                return URLBuilder;
            }());
            function buildPrefix() {
                var prefixes = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    prefixes[_i] = arguments[_i];
                }
                return prefixes.join(":") + ":";
            }
            function updateUrl(newUrl) {
                window.history.replaceState("", "", newUrl);
            }
            function loopOnParameters(prefix, callback) {
                var urlBuilder = new URLBuilder(window.location.href);
                var fullPrefix = buildPrefix(PARAMETERS_PREFIX, prefix);
                urlBuilder.loopOnParameters(fullPrefix, callback);
            }
            URL.loopOnParameters = loopOnParameters;
            function setQueryParameter(prefix, name, value) {
                var urlBuilder = new URLBuilder(window.location.href);
                var fullPrefix = buildPrefix(PARAMETERS_PREFIX, prefix);
                urlBuilder.setQueryParameter(fullPrefix + name, value);
                updateUrl(urlBuilder.buildUrl());
            }
            URL.setQueryParameter = setQueryParameter;
            function removeQueryParameter(prefix, name) {
                var urlBuilder = new URLBuilder(window.location.href);
                var fullPrefix = buildPrefix(PARAMETERS_PREFIX, prefix);
                urlBuilder.setQueryParameter(fullPrefix + name, null);
                updateUrl(urlBuilder.buildUrl());
            }
            URL.removeQueryParameter = removeQueryParameter;
        })(URL = Helpers.URL || (Helpers.URL = {}));
    })(Helpers = Page.Helpers || (Page.Helpers = {}));
})(Page || (Page = {}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Controls;
    (function (Controls) {
        function getElementBySelector(selector) {
            var elt = document.querySelector(selector);
            if (!elt) {
                console.error("Cannot find control '" + selector + "'.");
            }
            return elt;
        }
        function setVisibility(id, visible) {
            var control = getElementBySelector("div#control-" + id);
            if (control) {
                control.style.display = visible ? "" : "none";
            }
        }
        Controls.setVisibility = setVisibility;
    })(Controls = Page.Controls || (Page.Controls = {}));
})(Page || (Page = {}));


// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Checkbox;
    (function (Checkbox) {
        function getCheckboxFromId(id) {
            var selector = "input[type=checkbox][id=" + id + "]";
            var elt = document.querySelector(selector);
            if (!elt) {
                console.error("Cannot find checkbox '" + selector + "'.");
            }
            return elt;
        }
        var Storage;
        (function (Storage) {
            var PREFIX = "checkbox";
            var CHECKED = "true";
            var UNCHECKED = "false";
            function attachStorageEvents() {
                var checkboxesSelector = "div.checkbox > input[type=checkbox][id]";
                var checkboxes = document.querySelectorAll(checkboxesSelector);
                var _loop_1 = function (i) {
                    var checkbox = checkboxes[i];
                    checkbox.addEventListener("change", function () {
                        var value = checkbox.checked ? CHECKED : UNCHECKED;
                        Page.Helpers.URL.setQueryParameter(PREFIX, checkbox.id, value);
                    });
                };
                for (var i = 0; i < checkboxes.length; i++) {
                    _loop_1(i);
                }
            }
            Storage.attachStorageEvents = attachStorageEvents;
            function applyStoredState() {
                Page.Helpers.URL.loopOnParameters(PREFIX, function (checkboxId, value) {
                    var input = getCheckboxFromId(checkboxId);
                    if (!input || (value !== CHECKED && value !== UNCHECKED)) {
                        console.log("Removing invalid query parameter '" + checkboxId + "=" + value + "'.");
                        Page.Helpers.URL.removeQueryParameter(PREFIX, checkboxId);
                    }
                    else {
                        input.checked = (value === CHECKED);
                    }
                });
            }
            Storage.applyStoredState = applyStoredState;
        })(Storage || (Storage = {}));
        Storage.applyStoredState();
        Storage.attachStorageEvents();
        /**
         * @return {boolean} Whether or not the observer was added
         */
        function addObserver(checkboxId, observer) {
            var elt = getCheckboxFromId(checkboxId);
            if (elt) {
                elt.addEventListener("change", function (event) {
                    event.stopPropagation();
                    observer(elt.checked);
                }, false);
                return true;
            }
            return false;
        }
        Checkbox.addObserver = addObserver;
        function setChecked(checkboxId, value) {
            var elt = getCheckboxFromId(checkboxId);
            if (elt) {
                elt.checked = value ? true : false;
            }
        }
        Checkbox.setChecked = setChecked;
        function isChecked(checkboxId) {
            var elt = getCheckboxFromId(checkboxId);
            return !!elt && elt.checked;
        }
        Checkbox.isChecked = isChecked;
    })(Checkbox = Page.Checkbox || (Page.Checkbox = {}));
})(Page || (Page = {}));


// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Range;
    (function (Range) {
        function isRangeElement(elt) {
            return elt.type && elt.type.toLowerCase() === "range";
        }
        function getRangeById(id) {
            var selector = "input[type=range][id=" + id + "]";
            var elt = document.querySelector(selector);
            if (!elt) {
                console.error("Cannot find range '" + selector + "'.");
            }
            return elt;
        }
        var thumbSize = 16;
        function updateTooltipPosition(range, tooltip) {
            tooltip.textContent = range.value;
            var bodyRect = document.body.getBoundingClientRect();
            var rangeRect = range.getBoundingClientRect();
            var tooltipRect = tooltip.getBoundingClientRect();
            var percentage = 0;
            if (+range.max > +range.min) {
                percentage = (+range.value - +range.min) / (+range.max - +range.min);
            }
            var top = (rangeRect.top - tooltipRect.height - bodyRect.top) - 4;
            var middle = percentage * (rangeRect.width - thumbSize) +
                (rangeRect.left + 0.5 * thumbSize) - bodyRect.left;
            tooltip.style.top = top + "px";
            tooltip.style.left = (middle - 0.5 * tooltipRect.width) + "px";
        }
        window.addEventListener("load", function () {
            var tooltips = document.querySelectorAll(".tooltip");
            var _loop_1 = function (i) {
                var tooltip = tooltips[i];
                var range = tooltip.previousElementSibling;
                if (isRangeElement(range)) {
                    range.parentNode.addEventListener("mouseenter", function () {
                        updateTooltipPosition(range, tooltip);
                    }, false);
                    range.addEventListener("input", function () {
                        updateTooltipPosition(range, tooltip);
                    }, false);
                }
            };
            for (var i = 0; i < tooltips.length; i++) {
                _loop_1(i);
            }
        });
        var Storage;
        (function (Storage) {
            var PREFIX = "range";
            function attachStorageEvents() {
                var inputsSelector = "div.range input.slider[type=range][id]";
                var inputElements = document.querySelectorAll(inputsSelector);
                var _loop_2 = function (i) {
                    var inputElement = inputElements[i];
                    inputElement.addEventListener("change", function () {
                        Page.Helpers.URL.setQueryParameter(PREFIX, inputElement.id, inputElement.value);
                    });
                };
                for (var i = 0; i < inputElements.length; i++) {
                    _loop_2(i);
                }
            }
            Storage.attachStorageEvents = attachStorageEvents;
            function applyStoredState() {
                Page.Helpers.URL.loopOnParameters(PREFIX, function (controlId, value) {
                    var input = getRangeById(controlId);
                    if (!input) {
                        console.log("Removing invalid query parameter '" + controlId + "=" + value + "'.");
                        Page.Helpers.URL.removeQueryParameter(PREFIX, controlId);
                    }
                    else {
                        setValue(controlId, +value);
                    }
                });
            }
            Storage.applyStoredState = applyStoredState;
        })(Storage || (Storage = {}));
        Storage.applyStoredState();
        Storage.attachStorageEvents();
        /**
         * @return {boolean} Whether or not the observer was added
         */
        function addObserverInternal(rangeId, observer, eventName) {
            var elt = getRangeById(rangeId);
            if (elt) {
                elt.addEventListener(eventName, function (event) {
                    event.stopPropagation();
                    observer(+elt.value);
                }, false);
                return true;
            }
            return false;
        }
        var isIE11 = !!window.MSInputMethodContext && !!document["documentMode"];
        /**
         * Callback will be called every time the value changes.
         * @return {boolean} Whether or not the observer was added
         */
        function addObserver(rangeId, observer) {
            if (isIE11) { // bug in IE 11, input event is never fired
                return addObserverInternal(rangeId, observer, "change");
            }
            else {
                return addObserverInternal(rangeId, observer, "input");
            }
        }
        Range.addObserver = addObserver;
        /**
         * Callback will be called only when the value stops changing.
         * @return {boolean} Whether or not the observer was added
         */
        function addLazyObserver(rangeId, observer) {
            return addObserverInternal(rangeId, observer, "change");
        }
        Range.addLazyObserver = addLazyObserver;
        function getValue(rangeId) {
            var elt = getRangeById(rangeId);
            if (!elt) {
                return null;
            }
            return +elt.value;
        }
        Range.getValue = getValue;
        function setValue(rangeId, value) {
            var elt = getRangeById(rangeId);
            if (elt) {
                elt.value = "" + value;
            }
        }
        Range.setValue = setValue;
    })(Range = Page.Range || (Page.Range = {}));
})(Page || (Page = {}));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Button;
    (function (Button) {
        function getButtonById(id) {
            var selector = "button[id=" + id + "]";
            var elt = document.querySelector(selector);
            if (!elt) {
                console.error("Cannot find button '" + id + "'.");
            }
            return elt;
        }
        /**
         * @return {boolean} Whether or not the observer was added
         */
        function addObserver(buttonId, observer) {
            var elt = getButtonById(buttonId);
            if (elt) {
                elt.addEventListener("click", function (event) {
                    event.stopPropagation();
                    observer();
                }, false);
                return true;
            }
            return false;
        }
        Button.addObserver = addObserver;
        function setLabel(buttonId, label) {
            var elt = getButtonById(buttonId);
            if (elt) {
                elt.innerText = label;
            }
        }
        Button.setLabel = setLabel;
    })(Button = Page.Button || (Page.Button = {}));
})(Page || (Page = {}));


// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Tabs;
    (function (Tabs) {
        var ID_SUFFIX = "-id";
        function getTabsById(id) {
            var selector = "div.tabs[id=" + id + ID_SUFFIX + "]";
            var elt = document.querySelector(selector);
            if (!elt) {
                console.error("Cannot find tabs '" + selector + "'.");
            }
            return elt;
        }
        /**
         * @param {Object} tabsElt Node tab element
         */
        function getSelectedValues(tabsElt) {
            var values = [];
            var inputs = tabsElt.querySelectorAll("input");
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];
                if (input.checked) {
                    values.push(input.value);
                }
            }
            return values;
        }
        var Storage;
        (function (Storage) {
            var PREFIX = "tabs";
            var SEPARATOR = ";";
            function attachStorageEvents() {
                var tabsElements = document.querySelectorAll("div.tabs[id]");
                var _loop_1 = function (i) {
                    var tabsElement = tabsElements[i];
                    var fullId = tabsElement.id;
                    if (fullId.indexOf(ID_SUFFIX, fullId.length - ID_SUFFIX.length) !== -1) {
                        var id_1 = fullId.substring(0, fullId.length - ID_SUFFIX.length);
                        var saveTabsState = function () {
                            var valuesList = getSelectedValues(tabsElement);
                            var values = valuesList.join(SEPARATOR);
                            Page.Helpers.URL.setQueryParameter(PREFIX, id_1, values);
                        };
                        var inputs = tabsElement.querySelectorAll("input");
                        for (var i_1 = 0; i_1 < inputs.length; i_1++) {
                            inputs[i_1].addEventListener("change", saveTabsState);
                        }
                    }
                };
                for (var i = 0; i < tabsElements.length; i++) {
                    _loop_1(i);
                }
            }
            Storage.attachStorageEvents = attachStorageEvents;
            function applyStoredState() {
                Page.Helpers.URL.loopOnParameters(PREFIX, function (controlId, value) {
                    var values = value.split(SEPARATOR);
                    if (!getTabsById(controlId)) {
                        console.log("Removing invalid query parameter '" + controlId + "=" + value + "'.");
                        Page.Helpers.URL.removeQueryParameter(PREFIX, controlId);
                    }
                    else {
                        setValues(controlId, values);
                    }
                });
            }
            Storage.applyStoredState = applyStoredState;
        })(Storage || (Storage = {}));
        Storage.applyStoredState();
        Storage.attachStorageEvents();
        /**
         * @return {boolean} Whether or not the observer was added
         */
        function addObserver(tabsId, observer) {
            var divWrapper = getTabsById(tabsId);
            if (divWrapper) {
                var inputs = divWrapper.querySelectorAll("input");
                for (var i = 0; i < inputs.length; i++) {
                    var input = inputs[i];
                    input.addEventListener("change", function (event) {
                        event.stopPropagation();
                        observer(getSelectedValues(divWrapper));
                    }, false);
                }
                return true;
            }
            return false;
        }
        Tabs.addObserver = addObserver;
        function getValues(tabsId) {
            var divWrapper = getTabsById(tabsId);
            if (!divWrapper) {
                return [];
            }
            return getSelectedValues(divWrapper);
        }
        Tabs.getValues = getValues;
        function setValues(tabsId, values) {
            var divWrapper = getTabsById(tabsId);
            var inputs = divWrapper.querySelectorAll("input");
            for (var i = 0; i < inputs.length; i++) {
                inputs[i].checked = false;
            }
            for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
                var value = values_1[_i];
                var id = tabsId + "-" + value + "-id";
                var inputElement = divWrapper.querySelector("input[id=" + id + "]");
                inputElement.checked = true;
            }
        }
        Tabs.setValues = setValues;
    })(Tabs = Page.Tabs || (Page.Tabs = {}));
})(Page || (Page = {}));


// eslint-disable-next-line @typescript-eslint/no-unused-vars
var Page;
(function (Page) {
    var Canvas;
    (function (Canvas) {
        function getElementBySelector(selector) {
            var elt = document.querySelector(selector);
            if (!elt) {
                console.error("Cannot find element '" + selector + "'.");
            }
            return elt;
        }
        function getCanvasById(id) {
            return getElementBySelector("canvas[id=" + id + "]");
        }
        function getCheckboxFromId(id) {
            return getElementBySelector("input[type=checkbox][id=" + id + "]");
        }
        var canvasContainer = document.getElementById("canvas-container");
        var canvas = getCanvasById("canvas");
        var buttonsColumn = document.getElementById("canvas-buttons-column");
        var fullscreenCheckbox = getCheckboxFromId("fullscreen-checkbox-id");
        var sidePaneCheckbox = getCheckboxFromId("side-pane-checkbox-id");
        var loader = canvasContainer.querySelector(".loader");
        var maxWidth = 512;
        var maxHeight = 512;
        function bindCanvasButtons() {
            function hideOverflow(value) {
                document.body.style.overflow = value ? "hidden" : "auto";
            }
            if (fullscreenCheckbox) {
                window.addEventListener("load", function () {
                    hideOverflow(fullscreenCheckbox.checked);
                    fullscreenCheckbox.addEventListener("change", function () {
                        hideOverflow(fullscreenCheckbox.checked);
                    });
                }, false);
                if (sidePaneCheckbox) {
                    fullscreenCheckbox.addEventListener("change", function () {
                        if (fullscreenCheckbox.checked) {
                            sidePaneCheckbox.checked = false;
                        }
                    }, false);
                }
            }
        }
        bindCanvasButtons();
        function getCanvasSize() {
            var rect = canvas.getBoundingClientRect();
            return [Math.floor(rect.width), Math.floor(rect.height)];
        }
        var lastCanvasSize = [0, 0];
        var canvasResizeObservers = [];
        function inPx(size) {
            return size + "px";
        }
        /**
         * Calls callbacks if needed.
         */
        function updateCanvasSize() {
            canvasContainer.style.width = "100vw";
            var size = getCanvasSize();
            if (fullscreenCheckbox.checked) {
                canvasContainer.style.height = "100%";
                canvasContainer.style.maxWidth = "";
                canvasContainer.style.maxHeight = "";
            }
            else {
                size[1] = size[0] * maxHeight / maxWidth;
                canvasContainer.style.height = inPx(size[1]);
                canvasContainer.style.maxWidth = inPx(maxWidth);
                canvasContainer.style.maxHeight = inPx(maxHeight);
            }
            if (size[0] !== lastCanvasSize[0] ||
                size[1] !== lastCanvasSize[1]) {
                lastCanvasSize = getCanvasSize();
                for (var _i = 0, canvasResizeObservers_1 = canvasResizeObservers; _i < canvasResizeObservers_1.length; _i++) {
                    var observer = canvasResizeObservers_1[_i];
                    observer(lastCanvasSize[0], lastCanvasSize[1]);
                }
            }
        }
        window.addEventListener("load", updateCanvasSize, false);
        fullscreenCheckbox.addEventListener("change", updateCanvasSize, false);
        window.addEventListener("resize", updateCanvasSize, false);
        var fullscreenToggleObservers = [updateCanvasSize];
        var mouseDownObservers = [];
        var mouseUpObservers = [];
        var mouseDragObservers = [];
        var mouseMoveObservers = [];
        var mouseEnterObservers = [];
        var mouseLeaveObservers = [];
        var mouseWheelObservers = [];
        /* Bind fullscreen events */
        if (fullscreenCheckbox) {
            fullscreenCheckbox.addEventListener("change", function () {
                var isFullscreen = fullscreenCheckbox.checked;
                for (var _i = 0, fullscreenToggleObservers_1 = fullscreenToggleObservers; _i < fullscreenToggleObservers_1.length; _i++) {
                    var observer = fullscreenToggleObservers_1[_i];
                    observer(isFullscreen);
                }
            }, false);
        }
        document.addEventListener("keydown", function (event) {
            if (event.keyCode === 27) {
                Canvas.toggleFullscreen(false);
            }
        });
        function clientToRelative(clientX, clientY) {
            var rect = canvas.getBoundingClientRect();
            return [
                (clientX - rect.left) / rect.width,
                (clientY - rect.top) / rect.height,
            ];
        }
        var Mouse;
        (function (Mouse) {
            var mousePosition = [];
            var isMouseDownInternal = false;
            function getMousePosition() {
                return mousePosition.slice();
            }
            Mouse.getMousePosition = getMousePosition;
            function setMousePosition(x, y) {
                mousePosition[0] = x;
                mousePosition[1] = y;
            }
            Mouse.setMousePosition = setMousePosition;
            function isMouseDown() {
                return isMouseDownInternal;
            }
            Mouse.isMouseDown = isMouseDown;
            function mouseDown(clientX, clientY) {
                var pos = clientToRelative(clientX, clientY);
                setMousePosition(pos[0], pos[1]);
                isMouseDownInternal = true;
                for (var _i = 0, mouseDownObservers_1 = mouseDownObservers; _i < mouseDownObservers_1.length; _i++) {
                    var observer = mouseDownObservers_1[_i];
                    observer();
                }
            }
            Mouse.mouseDown = mouseDown;
            function mouseUp() {
                if (isMouseDownInternal) {
                    isMouseDownInternal = false;
                    for (var _i = 0, mouseUpObservers_1 = mouseUpObservers; _i < mouseUpObservers_1.length; _i++) {
                        var observer = mouseUpObservers_1[_i];
                        observer();
                    }
                }
            }
            Mouse.mouseUp = mouseUp;
            function mouseMove(clientX, clientY) {
                var newPos = clientToRelative(clientX, clientY);
                var dX = newPos[0] - mousePosition[0];
                var dY = newPos[1] - mousePosition[1];
                // Update the mousePosition before calling the observers,
                // because they might call getMousePosition() and it needs to be up to date.
                mousePosition[0] = newPos[0];
                mousePosition[1] = newPos[1];
                if (isMouseDownInternal) {
                    for (var _i = 0, mouseDragObservers_1 = mouseDragObservers; _i < mouseDragObservers_1.length; _i++) {
                        var observer = mouseDragObservers_1[_i];
                        observer(dX, dY);
                    }
                }
                for (var _a = 0, mouseMoveObservers_1 = mouseMoveObservers; _a < mouseMoveObservers_1.length; _a++) {
                    var observer = mouseMoveObservers_1[_a];
                    observer(newPos[0], newPos[1]);
                }
            }
            Mouse.mouseMove = mouseMove;
            if (canvas) {
                canvas.addEventListener("mousedown", function (event) {
                    if (event.button === 0) {
                        mouseDown(event.clientX, event.clientY);
                    }
                }, false);
                canvas.addEventListener("mouseenter", function () {
                    for (var _i = 0, mouseEnterObservers_1 = mouseEnterObservers; _i < mouseEnterObservers_1.length; _i++) {
                        var observer = mouseEnterObservers_1[_i];
                        observer();
                    }
                }, false);
                canvas.addEventListener("mouseleave", function () {
                    for (var _i = 0, mouseLeaveObservers_1 = mouseLeaveObservers; _i < mouseLeaveObservers_1.length; _i++) {
                        var observer = mouseLeaveObservers_1[_i];
                        observer();
                    }
                }, false);
                canvas.addEventListener("wheel", function (event) {
                    if (mouseWheelObservers.length > 0) {
                        var delta = (event.deltaY > 0) ? 1 : -1;
                        for (var _i = 0, mouseWheelObservers_1 = mouseWheelObservers; _i < mouseWheelObservers_1.length; _i++) {
                            var observer = mouseWheelObservers_1[_i];
                            observer(delta, mousePosition);
                        }
                        event.preventDefault();
                        return false;
                    }
                    return true;
                }, false);
                window.addEventListener("mousemove", function (event) {
                    mouseMove(event.clientX, event.clientY);
                });
                window.addEventListener("mouseup", function (event) {
                    if (event.button === 0) {
                        mouseUp();
                    }
                });
            }
        })(Mouse || (Mouse = {}));
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        var Touch;
        (function (Touch) {
            var currentTouches = [];
            var currentDistance = 0; // for pinching management
            function computeDistance(firstTouch, secondTouch) {
                var dX = firstTouch.clientX - secondTouch.clientX;
                var dY = firstTouch.clientY - secondTouch.clientY;
                return Math.sqrt(dX * dX + dY * dY);
            }
            function handleTouchStart(event) {
                var isFirstTouch = (currentTouches.length === 0);
                for (var i = 0; i < event.changedTouches.length; ++i) {
                    var touch = event.changedTouches[i];
                    var alreadyRegistered = false;
                    for (var _i = 0, currentTouches_1 = currentTouches; _i < currentTouches_1.length; _i++) {
                        var knownTouch = currentTouches_1[_i];
                        if (touch.identifier === knownTouch.id) {
                            alreadyRegistered = true;
                            break;
                        }
                    }
                    if (!alreadyRegistered) {
                        currentTouches.push({
                            id: touch.identifier,
                            clientX: touch.clientX,
                            clientY: touch.clientY,
                        });
                    }
                }
                if (isFirstTouch && currentTouches.length > 0) {
                    var currentTouch = currentTouches[0];
                    Mouse.mouseDown(currentTouch.clientX, currentTouch.clientY);
                }
                else if (currentTouches.length === 2) {
                    currentDistance = computeDistance(currentTouches[0], currentTouches[1]);
                }
            }
            function handleTouchEnd(event) {
                var knewAtLeastOneTouch = (currentTouches.length > 0);
                for (var i = 0; i < event.changedTouches.length; ++i) {
                    var touch = event.changedTouches[i];
                    for (var iC = 0; iC < currentTouches.length; ++iC) {
                        if (touch.identifier === currentTouches[iC].id) {
                            currentTouches.splice(iC, 1);
                            iC--;
                        }
                    }
                }
                if (currentTouches.length === 1) {
                    var newPos = clientToRelative(currentTouches[0].clientX, currentTouches[0].clientY);
                    Mouse.setMousePosition(newPos[0], newPos[1]);
                }
                else if (knewAtLeastOneTouch && currentTouches.length === 0) {
                    Mouse.mouseUp();
                }
            }
            function handleTouchMove(event) {
                var touches = event.changedTouches;
                for (var i = 0; i < touches.length; ++i) {
                    var touch = touches[i];
                    for (var _i = 0, currentTouches_2 = currentTouches; _i < currentTouches_2.length; _i++) {
                        var knownTouch = currentTouches_2[_i];
                        if (touch.identifier === knownTouch.id) {
                            knownTouch.clientX = touch.clientX;
                            knownTouch.clientY = touch.clientY;
                        }
                    }
                }
                var nbObservers = mouseMoveObservers.length + mouseDragObservers.length;
                if (Mouse.isMouseDown() && nbObservers > 0) {
                    event.preventDefault();
                }
                if (currentTouches.length === 1) {
                    Mouse.mouseMove(currentTouches[0].clientX, currentTouches[0].clientY);
                }
                else if (currentTouches.length === 2) {
                    var newDistance = computeDistance(currentTouches[0], currentTouches[1]);
                    var deltaDistance = (currentDistance - newDistance);
                    var zoomFactor = deltaDistance / currentDistance;
                    currentDistance = newDistance;
                    var zoomCenterXClient = 0.5 * (currentTouches[0].clientX + currentTouches[1].clientX);
                    var zoomCenterYClient = 0.5 * (currentTouches[0].clientY + currentTouches[1].clientY);
                    var zoomCenter = clientToRelative(zoomCenterXClient, zoomCenterYClient);
                    for (var _a = 0, mouseWheelObservers_2 = mouseWheelObservers; _a < mouseWheelObservers_2.length; _a++) {
                        var observer = mouseWheelObservers_2[_a];
                        observer(5 * zoomFactor, zoomCenter);
                    }
                }
            }
            if (canvas) {
                canvas.addEventListener("touchstart", handleTouchStart, false);
                window.addEventListener("touchend", handleTouchEnd);
                window.addEventListener("touchmove", handleTouchMove, { passive: false });
            }
        })(Touch || (Touch = {}));
        var Indicators;
        (function (Indicators) {
            var indicatorSpansCache = {};
            function getIndicatorSpan(id) {
                if (!indicatorSpansCache[id]) { // not yet in cache
                    var fullId = id + "-indicator-id";
                    indicatorSpansCache[id] = getElementBySelector("#" + fullId + " span");
                }
                return indicatorSpansCache[id];
            }
            Indicators.getIndicatorSpan = getIndicatorSpan;
        })(Indicators || (Indicators = {}));
        var Storage;
        (function (Storage) {
            var PREFIX = "canvas";
            var FULLSCREEN_PARAMETER = "fullscreen";
            var SIDE_PANE_PARAMETER = "sidepane";
            var TRUE = "true";
            var FALSE = "false";
            function updateBooleanParameter(name, checked) {
                var value = checked ? TRUE : FALSE;
                Page.Helpers.URL.setQueryParameter(PREFIX, name, value);
            }
            function attachStorageEvents() {
                if (fullscreenCheckbox) {
                    fullscreenCheckbox.addEventListener("change", function () {
                        updateBooleanParameter(FULLSCREEN_PARAMETER, fullscreenCheckbox.checked);
                        Page.Helpers.URL.removeQueryParameter(PREFIX, SIDE_PANE_PARAMETER);
                    });
                }
                if (sidePaneCheckbox) {
                    sidePaneCheckbox.addEventListener("change", function () {
                        updateBooleanParameter(SIDE_PANE_PARAMETER, sidePaneCheckbox.checked);
                    });
                }
            }
            Storage.attachStorageEvents = attachStorageEvents;
            function applyStoredState() {
                Page.Helpers.URL.loopOnParameters(PREFIX, function (name, value) {
                    if (name === FULLSCREEN_PARAMETER && (value === TRUE || value === FALSE)) {
                        if (fullscreenCheckbox) {
                            fullscreenCheckbox.checked = (value === TRUE);
                        }
                    }
                    else if (name === SIDE_PANE_PARAMETER && (value === TRUE || value === FALSE)) {
                        if (sidePaneCheckbox) {
                            sidePaneCheckbox.checked = (value === TRUE);
                        }
                    }
                    else {
                        console.log("Removing invalid query parameter '" + name + "=" + value + "'.");
                        Page.Helpers.URL.removeQueryParameter(PREFIX, name);
                    }
                });
            }
            Storage.applyStoredState = applyStoredState;
        })(Storage || (Storage = {}));
        Storage.applyStoredState();
        Storage.attachStorageEvents();
        Canvas.Observers = Object.freeze({
            canvasResize: canvasResizeObservers,
            fullscreenToggle: fullscreenToggleObservers,
            mouseDown: mouseDownObservers,
            mouseDrag: mouseDragObservers,
            mouseEnter: mouseEnterObservers,
            mouseLeave: mouseLeaveObservers,
            mouseMove: mouseMoveObservers,
            mouseWheel: mouseWheelObservers,
            mouseUp: mouseUpObservers,
        });
        function getAspectRatio() {
            var size = getCanvasSize();
            return size[0] / size[1];
        }
        Canvas.getAspectRatio = getAspectRatio;
        function getCanvas() {
            return canvas;
        }
        Canvas.getCanvas = getCanvas;
        function getCanvasContainer() {
            return canvasContainer;
        }
        Canvas.getCanvasContainer = getCanvasContainer;
        function getSize() {
            return getCanvasSize();
        }
        Canvas.getSize = getSize;
        function getMousePosition() {
            return Mouse.getMousePosition();
        }
        Canvas.getMousePosition = getMousePosition;
        function isFullScreen() {
            return fullscreenCheckbox && fullscreenCheckbox.checked;
        }
        Canvas.isFullScreen = isFullScreen;
        function isMouseDown() {
            return Mouse.isMouseDown();
        }
        Canvas.isMouseDown = isMouseDown;
        function setIndicatorText(id, text) {
            var indicator = Indicators.getIndicatorSpan(id);
            if (indicator) {
                indicator.innerText = text;
            }
        }
        Canvas.setIndicatorText = setIndicatorText;
        function setIndicatorsVisibility(visible) {
            var indicators = document.getElementById("indicators");
            indicators.style.display = visible ? "block" : "none";
        }
        Canvas.setIndicatorsVisibility = setIndicatorsVisibility;
        function setMaxSize(newMaxWidth, newMaxHeight) {
            maxWidth = newMaxWidth;
            maxHeight = newMaxHeight;
            updateCanvasSize();
        }
        Canvas.setMaxSize = setMaxSize;
        function setResizable(resizable) {
            buttonsColumn.style.display = resizable ? "block" : "none";
        }
        Canvas.setResizable = setResizable;
        function setLoaderText(text) {
            if (loader) {
                loader.querySelector("span").innerText = text;
            }
        }
        Canvas.setLoaderText = setLoaderText;
        function showLoader(show) {
            if (loader) {
                loader.style.display = (show) ? "block" : "";
            }
        }
        Canvas.showLoader = showLoader;
        function toggleFullscreen(fullscreen) {
            if (fullscreenCheckbox) {
                var needToUpdate = fullscreen !== fullscreenCheckbox.checked;
                if (needToUpdate) {
                    fullscreenCheckbox.checked = fullscreen;
                    if (typeof window.CustomEvent === "function") {
                        fullscreenCheckbox.dispatchEvent(new CustomEvent("change"));
                    }
                    else if (typeof CustomEvent.prototype.initCustomEvent === "function") {
                        var changeEvent = document.createEvent("CustomEvent");
                        changeEvent.initCustomEvent("change", false, false, undefined);
                        fullscreenCheckbox.dispatchEvent(changeEvent);
                    }
                }
            }
        }
        Canvas.toggleFullscreen = toggleFullscreen;
    })(Canvas = Page.Canvas || (Page.Canvas = {}));
})(Page || (Page = {}));

Page.Canvas.setMaxSize(512,512);