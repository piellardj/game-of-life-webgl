/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./tmp/script/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./tmp/script/automaton-2D.js":
/*!************************************!*\
  !*** ./tmp/script/automaton-2D.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fbo_1 = __importDefault(__webpack_require__(/*! ./gl-utils/fbo */ "./tmp/script/gl-utils/fbo.js"));
var gl_canvas_1 = __webpack_require__(/*! ./gl-utils/gl-canvas */ "./tmp/script/gl-utils/gl-canvas.js");
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-utils/gl-resource */ "./tmp/script/gl-utils/gl-resource.js"));
var vbo_1 = __importDefault(__webpack_require__(/*! ./gl-utils/vbo */ "./tmp/script/gl-utils/vbo.js"));
var ShaderManager = __importStar(__webpack_require__(/*! ./gl-utils/shader-manager */ "./tmp/script/gl-utils/shader-manager.js"));
var Automaton2D = (function (_super) {
    __extends(Automaton2D, _super);
    function Automaton2D() {
        var _this = _super.call(this, gl_canvas_1.gl) || this;
        _this._FBO = new fbo_1.default(gl_canvas_1.gl, 512, 512);
        _this._vbo = vbo_1.default.createQuad(gl_canvas_1.gl, -1, -1, 1, 1);
        var initializeTexturesForCanvas = function () {
            var canvasSize = Canvas.getSize();
            _this.initializeTextures(canvasSize[0], canvasSize[1]);
            _this._visibleSubTexture[0] = canvasSize[0] / _this._textureSize[0];
            _this._visibleSubTexture[1] = canvasSize[1] / _this._textureSize[1];
        };
        _this._textures = [null, null];
        _this._visibleSubTexture = [0, 0];
        initializeTexturesForCanvas();
        Canvas.Observers.canvasResize.push(initializeTexturesForCanvas);
        Button.addObserver("reset-button-id", initializeTexturesForCanvas);
        ShaderManager.buildShader({
            fragmentFilename: "display-2D.frag",
            vertexFilename: "display-2D.vert",
        }, function (shader) {
            if (shader !== null) {
                _this._displayShader = shader;
                _this._displayShader.a["aCorner"].VBO = _this._vbo;
                _this._displayShader.u["uSubTexture"].value = _this._visibleSubTexture;
            }
        });
        ShaderManager.buildShader({
            fragmentFilename: "update-2D.frag",
            vertexFilename: "fullscreen.vert",
        }, function (shader) {
            if (shader !== null) {
                _this._updateShader = shader;
                _this._updateShader.a["aCorner"].VBO = _this._vbo;
            }
        });
        return _this;
    }
    Automaton2D.prototype.freeGLResources = function () {
        if (this._FBO) {
            this._FBO.freeGLResources();
        }
        if (this._vbo) {
            this._vbo.freeGLResources();
            this._vbo = null;
        }
        if (this._displayShader) {
            this._displayShader.freeGLResources();
            this._displayShader = null;
        }
        if (this._updateShader) {
            this._updateShader.freeGLResources();
            this._updateShader = null;
        }
        this.freeTextures();
    };
    Automaton2D.prototype.update = function () {
        var shader = this._updateShader;
        if (shader) {
            var current = this._textures[this._currentIndex];
            var next = this._textures[(this._currentIndex + 1) % 2];
            this._FBO.bind([next]);
            shader.u["uPrevious"].value = current;
            shader.u["uCellSize"].value = [1 / this._textureSize[0], 1 / this._textureSize[1]];
            shader.use();
            shader.bindUniformsAndAttributes();
            gl_canvas_1.gl.drawArrays(gl_canvas_1.gl.TRIANGLE_STRIP, 0, 4);
            this._currentIndex = (this._currentIndex + 1) % 2;
            this._iteration++;
        }
    };
    Automaton2D.prototype.draw = function () {
        var shader = this._displayShader;
        if (shader) {
            shader.u["uTexture"].value = this._textures[this._currentIndex];
            shader.use();
            shader.bindUniformsAndAttributes();
            gl_canvas_1.gl.drawArrays(gl_canvas_1.gl.TRIANGLE_STRIP, 0, 4);
            Canvas.showLoader(false);
            this._needToRedraw = false;
        }
    };
    Object.defineProperty(Automaton2D.prototype, "iteration", {
        get: function () {
            return this._iteration;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Automaton2D.prototype, "needToRedraw", {
        get: function () {
            return this._needToRedraw;
        },
        enumerable: true,
        configurable: true
    });
    Automaton2D.prototype.freeTextures = function () {
        for (var i = 0; i < 2; ++i) {
            if (this._textures[i]) {
                gl_canvas_1.gl.deleteTexture(this._textures[i]);
                this._textures[i] = null;
            }
        }
    };
    Automaton2D.prototype.initializeTextures = function (width, height) {
        function upperPowerOfTwo(n) {
            return Math.pow(2, Math.ceil(Math.log(n) * Math.LOG2E));
        }
        width = upperPowerOfTwo(width);
        height = upperPowerOfTwo(height);
        this._FBO.width = width;
        this._FBO.height = height;
        this._textureSize = [width, height];
        this.freeTextures();
        var data = new Uint8Array(4 * width * height);
        for (var i = width * height; i > 0; --i) {
            var value = 255 * Math.round(Math.random());
            data[4 * i + 0] = value;
            data[4 * i + 1] = value;
            data[4 * i + 2] = value;
            data[4 * i + 3] = 255;
        }
        for (var i = 0; i < 2; ++i) {
            this._textures[i] = gl_canvas_1.gl.createTexture();
            gl_canvas_1.gl.bindTexture(gl_canvas_1.gl.TEXTURE_2D, this._textures[i]);
            gl_canvas_1.gl.texImage2D(gl_canvas_1.gl.TEXTURE_2D, 0, gl_canvas_1.gl.RGBA, width, height, 0, gl_canvas_1.gl.RGBA, gl_canvas_1.gl.UNSIGNED_BYTE, data);
            gl_canvas_1.gl.texParameteri(gl_canvas_1.gl.TEXTURE_2D, gl_canvas_1.gl.TEXTURE_MAG_FILTER, gl_canvas_1.gl.NEAREST);
            gl_canvas_1.gl.texParameteri(gl_canvas_1.gl.TEXTURE_2D, gl_canvas_1.gl.TEXTURE_MIN_FILTER, gl_canvas_1.gl.NEAREST);
        }
        this._currentIndex = 0;
        this._iteration = 0;
        this._needToRedraw = true;
        Canvas.setIndicatorText("Grid size", width + "x" + height);
    };
    return Automaton2D;
}(gl_resource_1.default));
exports.default = Automaton2D;


/***/ }),

/***/ "./tmp/script/gl-utils/fbo.js":
/*!************************************!*\
  !*** ./tmp/script/gl-utils/fbo.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-resource */ "./tmp/script/gl-utils/gl-resource.js"));
var FBO = (function (_super) {
    __extends(FBO, _super);
    function FBO(gl, width, height) {
        var _this = _super.call(this, gl) || this;
        _this.id = gl.createFramebuffer();
        _this.width = width;
        _this.height = height;
        return _this;
    }
    FBO.bindDefault = function (gl, viewport) {
        if (viewport === void 0) { viewport = null; }
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        if (viewport === null) {
            gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
        }
        else {
            gl.viewport(viewport.left, viewport.lower, viewport.width, viewport.height);
        }
    };
    FBO.prototype.bind = function (colorBuffers, depthBuffer) {
        if (depthBuffer === void 0) { depthBuffer = null; }
        var gl = _super.prototype.gl.call(this);
        gl.bindFramebuffer(gl.FRAMEBUFFER, this.id);
        gl.viewport(0, 0, this.width, this.height);
        for (var i = 0; i < colorBuffers.length; ++i) {
            gl.framebufferTexture2D(gl.FRAMEBUFFER, gl["COLOR_ATTACHMENT" + i], gl.TEXTURE_2D, colorBuffers[i], 0);
        }
        if (depthBuffer) {
            gl.bindRenderbuffer(gl.RENDERBUFFER, depthBuffer);
            gl.framebufferRenderbuffer(gl.FRAMEBUFFER, gl.DEPTH_ATTACHMENT, gl.RENDERBUFFER, depthBuffer);
        }
    };
    FBO.prototype.freeGLResources = function () {
        _super.prototype.gl.call(this).deleteFramebuffer(this.id);
        this.id = null;
    };
    return FBO;
}(gl_resource_1.default));
exports.default = FBO;


/***/ }),

/***/ "./tmp/script/gl-utils/gl-canvas.js":
/*!******************************************!*\
  !*** ./tmp/script/gl-utils/gl-canvas.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var gl = null;
exports.gl = gl;
function initGL(flags) {
    function setError(message) {
        Demopage.setErrorMessage("webgl-support", message);
    }
    var canvas = Canvas.getCanvas();
    exports.gl = gl = canvas.getContext("webgl", flags);
    if (gl == null) {
        exports.gl = gl = canvas.getContext("experimental-webgl", flags);
        if (gl == null) {
            setError("Your browser or device does not seem to support WebGL.");
            return false;
        }
        setError("Your browser or device only supports experimental WebGL.\n" +
            "The simulation may not run as expected.");
    }
    gl.disable(gl.CULL_FACE);
    gl.disable(gl.DEPTH_TEST);
    gl.disable(gl.BLEND);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    return true;
}
exports.initGL = initGL;
function adjustSize(hidpi) {
    if (hidpi === void 0) { hidpi = false; }
    var cssPixel = (hidpi) ? window.devicePixelRatio : 1;
    var width = Math.floor(gl.canvas.clientWidth * cssPixel);
    var height = Math.floor(gl.canvas.clientHeight * cssPixel);
    if (gl.canvas.width !== width || gl.canvas.height !== height) {
        gl.canvas.width = width;
        gl.canvas.height = height;
    }
}
exports.adjustSize = adjustSize;


/***/ }),

/***/ "./tmp/script/gl-utils/gl-resource.js":
/*!********************************************!*\
  !*** ./tmp/script/gl-utils/gl-resource.js ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var GLResource = (function () {
    function GLResource(gl) {
        this._gl = gl;
    }
    GLResource.prototype.gl = function () {
        return this._gl;
    };
    return GLResource;
}());
exports.default = GLResource;


/***/ }),

/***/ "./tmp/script/gl-utils/shader-manager.js":
/*!***********************************************!*\
  !*** ./tmp/script/gl-utils/shader-manager.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_canvas_1 = __webpack_require__(/*! ./gl-canvas */ "./tmp/script/gl-utils/gl-canvas.js");
var shader_1 = __importDefault(__webpack_require__(/*! ./shader */ "./tmp/script/gl-utils/shader.js"));
var ShaderSources = __importStar(__webpack_require__(/*! ./shader-sources */ "./tmp/script/gl-utils/shader-sources.js"));
var cachedShaders = {};
function getShader(name) {
    return cachedShaders[name].shader;
}
exports.getShader = getShader;
function buildShader(infos, callback) {
    var sourcesPending = 2;
    var sourcesFailed = 0;
    function loadedSource(success) {
        sourcesPending--;
        if (!success) {
            sourcesFailed++;
        }
        if (sourcesPending === 0) {
            var shader = null;
            if (sourcesFailed === 0) {
                var vert = ShaderSources.getSource(infos.vertexFilename);
                var frag = ShaderSources.getSource(infos.fragmentFilename);
                shader = new shader_1.default(gl_canvas_1.gl, vert, frag);
            }
            callback(shader);
        }
    }
    ShaderSources.loadSource(infos.vertexFilename, loadedSource);
    ShaderSources.loadSource(infos.fragmentFilename, loadedSource);
}
exports.buildShader = buildShader;
function registerShader(name, infos, callback) {
    function callAndClearCallbacks(cached) {
        for (var _i = 0, _a = cached.callbacks; _i < _a.length; _i++) {
            var cachedCallback = _a[_i];
            cachedCallback(!cached.failed, cached.shader);
        }
        cached.callbacks = [];
    }
    if (typeof cachedShaders[name] === "undefined") {
        cachedShaders[name] = {
            callbacks: [callback],
            failed: false,
            infos: infos,
            pending: true,
            shader: null,
        };
        var cached_1 = cachedShaders[name];
        buildShader(infos, function (builtShader) {
            cached_1.pending = false;
            cached_1.failed = builtShader === null;
            cached_1.shader = builtShader;
            callAndClearCallbacks(cached_1);
        });
    }
    else {
        var cached = cachedShaders[name];
        if (cached.pending === true) {
            cached.callbacks.push(callback);
        }
        else {
            callAndClearCallbacks(cached);
        }
    }
}
exports.registerShader = registerShader;
function deleteShader(name) {
    if (cachedShaders[name]) {
        if (cachedShaders[name].shader) {
            cachedShaders[name].shader.freeGLResources();
        }
        delete cachedShaders[name];
    }
}
exports.deleteShader = deleteShader;


/***/ }),

/***/ "./tmp/script/gl-utils/shader-sources.js":
/*!***********************************************!*\
  !*** ./tmp/script/gl-utils/shader-sources.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var cachedSources = {};
function loadSource(filename, callback) {
    function callAndClearCallbacks(cached) {
        for (var _i = 0, _a = cached.callbacks; _i < _a.length; _i++) {
            var cachedCallback = _a[_i];
            cachedCallback(!cached.failed);
        }
        cached.callbacks = [];
    }
    if (typeof cachedSources[filename] === "undefined") {
        cachedSources[filename] = {
            callbacks: [callback],
            failed: false,
            pending: true,
            text: null,
        };
        var cached_1 = cachedSources[filename];
        var xhr_1 = new XMLHttpRequest();
        xhr_1.open("GET", "./shaders/" + filename, true);
        xhr_1.onload = function () {
            if (xhr_1.readyState === 4) {
                cached_1.pending = false;
                if (xhr_1.status === 200) {
                    cached_1.text = xhr_1.responseText;
                    cached_1.failed = false;
                }
                else {
                    console.error("Cannot load '" + filename + "' shader source: " + xhr_1.statusText);
                    cached_1.failed = true;
                }
                callAndClearCallbacks(cached_1);
            }
        };
        xhr_1.onerror = function () {
            console.error("Cannot load '" + filename + "' shader source: " + xhr_1.statusText);
            cached_1.pending = false;
            cached_1.failed = true;
            callAndClearCallbacks(cached_1);
        };
        xhr_1.send(null);
    }
    else {
        var cached = cachedSources[filename];
        if (cached.pending === true) {
            cached.callbacks.push(callback);
        }
        else {
            callAndClearCallbacks(cached);
        }
    }
}
exports.loadSource = loadSource;
function getSource(filename) {
    return cachedSources[filename].text;
}
exports.getSource = getSource;


/***/ }),

/***/ "./tmp/script/gl-utils/shader.js":
/*!***************************************!*\
  !*** ./tmp/script/gl-utils/shader.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-resource */ "./tmp/script/gl-utils/gl-resource.js"));
function notImplemented(gl, location, value) {
    alert("NOT IMPLEMENTED YET");
}
function bindUniformFloat(gl, location, value) {
    if (Array.isArray(value)) {
        gl.uniform1fv(location, value);
    }
    else {
        gl.uniform1f(location, value);
    }
}
function bindUniformFloat2v(gl, location, value) {
    gl.uniform2fv(location, value);
}
function bindUniformFloat3v(gl, location, value) {
    gl.uniform3fv(location, value);
}
function bindUniformFloat4v(gl, location, value) {
    gl.uniform4fv(location, value);
}
function bindUniformInt(gl, location, value) {
    if (Array.isArray(value)) {
        gl.uniform1iv(location, value);
    }
    else {
        gl.uniform1iv(location, value);
    }
}
function bindUniformInt2v(gl, location, value) {
    gl.uniform2iv(location, value);
}
function bindUniformInt3v(gl, location, value) {
    gl.uniform3iv(location, value);
}
function bindUniformInt4v(gl, location, value) {
    gl.uniform4iv(location, value);
}
function bindUniformBool(gl, location, value) {
    gl.uniform1i(location, +value);
}
function bindUniformBool2v(gl, location, value) {
    gl.uniform2iv(location, value);
}
function bindUniformBool3v(gl, location, value) {
    gl.uniform3iv(location, value);
}
function bindUniformBool4v(gl, location, value) {
    gl.uniform4iv(location, value);
}
function bindUniformFloatMat2(gl, location, value) {
    gl.uniformMatrix2fv(location, false, value);
}
function bindUniformFloatMat3(gl, location, value) {
    gl.uniformMatrix3fv(location, false, value);
}
function bindUniformFloatMat4(gl, location, value) {
    gl.uniformMatrix4fv(location, false, value);
}
function bindSampler2D(gl, location, unitNb, value) {
    gl.uniform1i(location, unitNb);
    gl.activeTexture(gl["TEXTURE" + unitNb]);
    gl.bindTexture(gl.TEXTURE_2D, value);
}
function bindSamplerCube(gl, location, unitNb, value) {
    gl.uniform1i(location, unitNb);
    gl.activeTexture(gl["TEXTURE" + unitNb]);
    gl.bindTexture(gl.TEXTURE_CUBE_MAP, value);
}
var types = {
    0x8B50: { str: "FLOAT_VEC2", binder: bindUniformFloat2v },
    0x8B51: { str: "FLOAT_VEC3", binder: bindUniformFloat3v },
    0x8B52: { str: "FLOAT_VEC4", binder: bindUniformFloat4v },
    0x8B53: { str: "INT_VEC2", binder: bindUniformInt2v },
    0x8B54: { str: "INT_VEC3", binder: bindUniformInt3v },
    0x8B55: { str: "INT_VEC4", binder: bindUniformInt4v },
    0x8B56: { str: "BOOL", binder: bindUniformBool },
    0x8B57: { str: "BOOL_VEC2", binder: bindUniformBool2v },
    0x8B58: { str: "BOOL_VEC3", binder: bindUniformBool3v },
    0x8B59: { str: "BOOL_VEC4", binder: bindUniformBool4v },
    0x8B5A: { str: "FLOAT_MAT2", binder: bindUniformFloatMat2 },
    0x8B5B: { str: "FLOAT_MAT3", binder: bindUniformFloatMat3 },
    0x8B5C: { str: "FLOAT_MAT4", binder: bindUniformFloatMat4 },
    0x8B5E: { str: "SAMPLER_2D", binder: bindSampler2D },
    0x8B60: { str: "SAMPLER_CUBE", binder: bindSamplerCube },
    0x1400: { str: "BYTE", binder: notImplemented },
    0x1401: { str: "UNSIGNED_BYTE", binder: notImplemented },
    0x1402: { str: "SHORT", binder: notImplemented },
    0x1403: { str: "UNSIGNED_SHORT", binder: notImplemented },
    0x1404: { str: "INT", binder: bindUniformInt },
    0x1405: { str: "UNSIGNED_INT", binder: notImplemented },
    0x1406: { str: "FLOAT", binder: bindUniformFloat },
};
var ShaderProgram = (function (_super) {
    __extends(ShaderProgram, _super);
    function ShaderProgram(gl, vertexSource, fragmentSource) {
        var _this = this;
        function createShader(type, source) {
            var shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            var compileSuccess = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
            if (!compileSuccess) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        }
        _this = _super.call(this, gl) || this;
        _this.id = null;
        _this.uCount = 0;
        _this.aCount = 0;
        var vertexShader = createShader(gl.VERTEX_SHADER, vertexSource);
        var fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentSource);
        var id = gl.createProgram();
        gl.attachShader(id, vertexShader);
        gl.attachShader(id, fragmentShader);
        gl.linkProgram(id);
        var linkSuccess = gl.getProgramParameter(id, gl.LINK_STATUS);
        if (!linkSuccess) {
            console.error(gl.getProgramInfoLog(id));
            gl.deleteProgram(id);
        }
        else {
            _this.id = id;
            _this.introspection();
        }
        return _this;
    }
    ShaderProgram.prototype.freeGLResources = function () {
        _super.prototype.gl.call(this).deleteProgram(this.id);
        this.id = null;
    };
    ShaderProgram.prototype.use = function () {
        _super.prototype.gl.call(this).useProgram(this.id);
    };
    ShaderProgram.prototype.bindUniforms = function () {
        var _this = this;
        var gl = _super.prototype.gl.call(this);
        var currTextureUnitNb = 0;
        Object.keys(this.u).forEach(function (uName) {
            var uniform = _this.u[uName];
            if (uniform.value !== null) {
                if (uniform.type === 0x8B5E || uniform.type === 0x8B60) {
                    var unitNb = currTextureUnitNb;
                    types[uniform.type].binder(gl, uniform.loc, unitNb, uniform.value);
                    currTextureUnitNb++;
                }
                else {
                    types[uniform.type].binder(gl, uniform.loc, uniform.value);
                }
            }
        });
    };
    ShaderProgram.prototype.bindAttributes = function () {
        var _this = this;
        Object.keys(this.a).forEach(function (aName) {
            var attribute = _this.a[aName];
            if (attribute.VBO !== null) {
                attribute.VBO.bind(attribute.loc);
            }
        });
    };
    ShaderProgram.prototype.bindUniformsAndAttributes = function () {
        this.bindUniforms();
        this.bindAttributes();
    };
    ShaderProgram.prototype.introspection = function () {
        var gl = _super.prototype.gl.call(this);
        this.uCount = gl.getProgramParameter(this.id, gl.ACTIVE_UNIFORMS);
        this.u = [];
        for (var i = 0; i < this.uCount; ++i) {
            var uniform = gl.getActiveUniform(this.id, i);
            var name_1 = uniform.name;
            this.u[name_1] = {
                loc: gl.getUniformLocation(this.id, name_1),
                size: uniform.size,
                type: uniform.type,
                value: null,
            };
        }
        this.aCount = gl.getProgramParameter(this.id, gl.ACTIVE_ATTRIBUTES);
        this.a = [];
        for (var i = 0; i < this.aCount; ++i) {
            var attribute = gl.getActiveAttrib(this.id, i);
            var name_2 = attribute.name;
            this.a[name_2] = {
                VBO: null,
                loc: gl.getAttribLocation(this.id, name_2),
                size: attribute.size,
                type: attribute.type,
            };
        }
    };
    return ShaderProgram;
}(gl_resource_1.default));
exports.default = ShaderProgram;


/***/ }),

/***/ "./tmp/script/gl-utils/vbo.js":
/*!************************************!*\
  !*** ./tmp/script/gl-utils/vbo.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var gl_resource_1 = __importDefault(__webpack_require__(/*! ./gl-resource */ "./tmp/script/gl-utils/gl-resource.js"));
var VBO = (function (_super) {
    __extends(VBO, _super);
    function VBO(gl, array, size, type) {
        var _this = _super.call(this, gl) || this;
        _this.id = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.id);
        gl.bufferData(gl.ARRAY_BUFFER, array, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        _this.size = size;
        _this.type = type;
        _this.normalize = false;
        _this.stride = 0;
        _this.offset = 0;
        return _this;
    }
    VBO.createQuad = function (gl, minX, minY, maxX, maxY) {
        var vert = [
            minX, minY,
            maxX, minY,
            minX, maxY,
            maxX, maxY,
        ];
        return new VBO(gl, new Float32Array(vert), 2, gl.FLOAT);
    };
    VBO.prototype.freeGLResources = function () {
        this.gl().deleteBuffer(this.id);
        this.id = null;
    };
    VBO.prototype.bind = function (location) {
        var gl = _super.prototype.gl.call(this);
        gl.enableVertexAttribArray(location);
        gl.bindBuffer(gl.ARRAY_BUFFER, this.id);
        gl.vertexAttribPointer(location, this.size, this.type, this.normalize, this.stride, this.offset);
    };
    return VBO;
}(gl_resource_1.default));
exports.default = VBO;


/***/ }),

/***/ "./tmp/script/gl-utils/viewport.js":
/*!*****************************************!*\
  !*** ./tmp/script/gl-utils/viewport.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Viewport = (function () {
    function Viewport(left, lower, width, height) {
        this.left = left;
        this.lower = lower;
        this.width = width;
        this.height = height;
    }
    Viewport.setFullCanvas = function (gl) {
        gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    };
    Viewport.prototype.set = function (gl) {
        gl.viewport(this.lower, this.left, this.width, this.height);
    };
    return Viewport;
}());
exports.default = Viewport;


/***/ }),

/***/ "./tmp/script/main.js":
/*!****************************!*\
  !*** ./tmp/script/main.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var fbo_1 = __importDefault(__webpack_require__(/*! ./gl-utils/fbo */ "./tmp/script/gl-utils/fbo.js"));
var GlCanvas = __importStar(__webpack_require__(/*! ./gl-utils/gl-canvas */ "./tmp/script/gl-utils/gl-canvas.js"));
var gl_canvas_1 = __webpack_require__(/*! ./gl-utils/gl-canvas */ "./tmp/script/gl-utils/gl-canvas.js");
var viewport_1 = __importDefault(__webpack_require__(/*! ./gl-utils/viewport */ "./tmp/script/gl-utils/viewport.js"));
var automaton_2D_1 = __importDefault(__webpack_require__(/*! ./automaton-2D */ "./tmp/script/automaton-2D.js"));
var parameters_1 = __importDefault(__webpack_require__(/*! ./parameters */ "./tmp/script/parameters.js"));
function main() {
    var glParams = { alpha: false };
    if (!GlCanvas.initGL(glParams)) {
        return;
    }
    Canvas.showLoader(true);
    parameters_1.default.autorun = true;
    var automaton = new automaton_2D_1.default();
    function mainLoop() {
        if (parameters_1.default.autorun) {
            automaton.update();
        }
        if (parameters_1.default.autorun || automaton.needToRedraw) {
            Canvas.setIndicatorText("Iteration", automaton.iteration);
            fbo_1.default.bindDefault(gl_canvas_1.gl);
            GlCanvas.adjustSize();
            viewport_1.default.setFullCanvas(gl_canvas_1.gl);
            gl_canvas_1.gl.clear(gl_canvas_1.gl.COLOR_BUFFER_BIT | gl_canvas_1.gl.DEPTH_BUFFER_BIT);
            automaton.draw();
        }
        requestAnimationFrame(mainLoop);
    }
    requestAnimationFrame(mainLoop);
}
main();


/***/ }),

/***/ "./tmp/script/parameters.js":
/*!**********************************!*\
  !*** ./tmp/script/parameters.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var autorun;
var AUTORUN_CONTROL_ID = "stop-start-button-id";
Button.addObserver(AUTORUN_CONTROL_ID, function () {
    Parameters.autorun = !autorun;
});
var Parameters = (function () {
    function Parameters() {
    }
    Object.defineProperty(Parameters, "autorun", {
        get: function () {
            return autorun;
        },
        set: function (ar) {
            autorun = ar;
            Button.setLabel(AUTORUN_CONTROL_ID, autorun ? "Stop" : "Start");
        },
        enumerable: true,
        configurable: true
    });
    return Parameters;
}());
exports.default = Parameters;


/***/ })

/******/ });