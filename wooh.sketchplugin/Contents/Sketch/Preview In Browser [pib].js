var globalThis = this;
var global = this;
function __skpm_run (key, context) {
  globalThis.context = context;
  try {

var exports =
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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Preview In Browser [pib].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/sketch-module-google-analytics/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/sketch-module-google-analytics/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var kUUIDKey = "google.analytics.uuid";
var uuid = null
var uuid = NSUserDefaults.standardUserDefaults().objectForKey(kUUIDKey) + '-' + context.plugin.url().path().split('/')[context.plugin.url().path().split('/').findIndex(item => item === 'Users') + 1];
if (!uuid) {
    uuid = NSUUID.UUID().UUIDString();
    NSUserDefaults.standardUserDefaults().setObject_forKey(uuid, kUUIDKey)
}

var variant = MSApplicationMetadata.metadata().variant;
var source =
    "Sketch " +
    (variant == "NONAPPSTORE" ? "" : variant + " ") +
    Settings.version.sketch;

function jsonToQueryString(json) {
    return Object.keys(json)
        .map(function(key) {
            return encodeURIComponent(key) + "=" + encodeURIComponent(json[key]);
        })
        .join("&");
}

function makeRequest(url, options) {
    if (!url) {
        return
    }

    if (options && options.makeRequest) {
        return options.makeRequest(url)
    }
    if (options && options.debug) {
        var request = NSURLRequest.requestWithURL(url)
        var responsePtr = MOPointer.alloc().init();
        var errorPtr = MOPointer.alloc().init();

        var data = NSURLConnection.sendSynchronousRequest_returningResponse_error(request, responsePtr, errorPtr)
        return data ? NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding) : errorPtr.value()
    }

    NSURLSession.sharedSession()
        .dataTaskWithURL(url)
        .resume();
}

module.exports = function(trackingId, hitType, props, options) {
    var payload = {
        v: 1,
        tid: trackingId,
        ds: source,
        cid: uuid,
        t: hitType
    };

    if (typeof __command !== "undefined") {
        payload.an = __command.pluginBundle().name();
        payload.aid = __command.pluginBundle().identifier();
        payload.av = __command.pluginBundle().version();
    }

    if (props) {
        Object.keys(props).forEach(function(key) {
            payload[key] = props[key];
        });
    }

    var url = NSURL.URLWithString(
        "https://www.google-analytics.com/" + (options && options.debug ? "debug/" : "") + "collect?" +
        jsonToQueryString(payload) +
        "&z=" +
        NSUUID.UUID().UUIDString()
    );

    return makeRequest(url, options)
};

/***/ }),

/***/ "./src/Preview In Browser [pib].js":
/*!*****************************************!*\
  !*** ./src/Preview In Browser [pib].js ***!
  \*****************************************/
/*! exports provided: default, autoRefreshHandler, autoRefreshHandlerSave, artboardBrowse */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoRefreshHandler", function() { return autoRefreshHandler; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "autoRefreshHandlerSave", function() { return autoRefreshHandlerSave; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "artboardBrowse", function() { return artboardBrowse; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Google Analytics Method */ "./src/modules/Google Analytics Method.js");

 //thank gaddafirusli

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument(),
    Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings"),
    autoRefreshKey = Settings.sessionVariable('autoRefreshKey'),
    selection = doc.selectedLayers.layers,
    artboard = 0;

if (selection.length > 0) {
  for (var i = 0; artboard == 0 && i < selection.length; i++) {
    artboard = selection[i].getParentArtboard() || selection[i];

    if (artboard.type !== "Artboard") {
      artboard = 0;
    }
  }
}

/* harmony default export */ __webpack_exports__["default"] = (function () {
  if (autoRefreshKey === "Auto refresh" || autoRefreshKey === "Refresh when saving document") {
    artboardBrowse(artboard, "AutoRefreshing", false);
  } else {
    artboardBrowse(artboard, artboard.name, true);
  } //GA


  Object(_modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__["default"])(":-)");
});
function autoRefreshHandler() {
  if (autoRefreshKey === "Auto refresh") {
    refreshImg();
  }
}
function autoRefreshHandlerSave() {
  if (autoRefreshKey === "Refresh when saving document") {
    refreshImg();
  }
} //functions

function artboardBrowse(artboard, pageTitle, customBlockKey) {
  if (artboard === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please Select 1 Artboard");
  } else {
    var artboardname = pageTitle;
    artboardname = artboardname.replace(/['|'|/|#|.|\\|"|"]/g, '');
    var filename = NSTemporaryDirectory() + artboardname + ".png";
    doc.sketchObject.saveArtboardOrSlice_toFile(scaleArtboard(artboard, 2), filename); //htmlContent

    var htmlContent = NSString.stringWithString_("<html>\
            <head><meta charset='UTF-8'></head>" + "<body id='" + customBlockKey + "'>\
            <img id='mainImg' width=" + artboard.sketchObject.frame().width() + " src='./" + artboardname + ".png' center top no-repeat;'>\
            <div id='refreshBlock' onClick='refreshBlock()'>Stop Refreshing</div>\
            </body>\
            <style type='text/css'>\
            body {\
                text-align: center;\
                margin: 0;\
                padding: 0;\
                background:" + colorToRGBA(artboard.sketchObject.backgroundColor()) + ";}\
            body::-webkit-scrollbar {\
                display: none;}\
            #refreshBlock {\
                opacity: .3;\
                position: fixed;\
                right: 20px;\
                bottom: 10px;\
                background: rgba(0, 0, 0, .8);\
                border-radius: 100px;\
                font-family: sans - serif;\
                font-size: 12px;\
                padding: 1px 8px;\
                color: white;\
                cursor: pointer;\
                user-select: none;}\
            #refreshBlock:hover {opacity: .9;\
                transition: .25s;}\
            </style>\
            <script>\
            let stopRefreshKey = JSON.parse(document.getElementsByTagName('body')[0].id);\
            if (stopRefreshKey == true) {document.getElementById('refreshBlock').remove();};\
            function workLoop(deadline) {\
                if (stopRefreshKey == false && deadline.timeRemaining() > 1 ) {\
                    document.getElementById('mainImg').src=document.getElementById('mainImg').src+'?t='+Math.random();\
                };\
                setTimeout('window.requestIdleCallback(workLoop)',1000);\
            };\
            window.requestIdleCallback(workLoop);\
            let refreshBlock = function() {\
                if (stopRefreshKey == false) { stopRefreshKey = true; document.getElementById('refreshBlock').innerHTML='Continue To Refresh';}\
                else { location.reload()\
                    /*stopRefreshKey = false; window.requestIdleCallback(workLoop); document.getElementById('refreshBlock').innerHTML='Stop Refreshing';*/};\
            };\
            </script>\
            </html>");
    var filepath = NSTemporaryDirectory() + artboardname + ".html";
    htmlContent.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(filepath, true);
    var file = NSURL.fileURLWithPath(filepath);
    NSWorkspace.sharedWorkspace().openFile(file.path());
  }
}

function refreshImg() {
  if (artboard !== 0) {
    var artboardname = "AutoRefreshing";
    artboardname = artboardname.replace(/['|'|/|#|.|\\|"|"]/g, '');
    var filename = NSTemporaryDirectory() + artboardname + ".png";
    doc.sketchObject.saveArtboardOrSlice_toFile(scaleArtboard(artboard, 2), filename);
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Browser Preview Refreshing");
  }
}

function scaleArtboard(layer, times) {
  var rect = layer.sketchObject.absoluteInfluenceRect();
  var request = MSExportRequest.new();
  request.rect = rect;
  request.scale = times;
  return request;
}

function colorToRGBA(color) {
  var rgbaValue = "rgba(" + (color.red() * 255).toFixed(0) + "," + (color.green() * 255).toFixed(0) + "," + (color.blue() * 255).toFixed(0) + "," + color.alpha().toFixed(2) + ")";
  return rgbaValue;
}

/***/ }),

/***/ "./src/modules/Google Analytics Method.js":
/*!************************************************!*\
  !*** ./src/modules/Google Analytics Method.js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

/* harmony default export */ __webpack_exports__["default"] = (function (CommandResult) {
  var track = __webpack_require__(/*! sketch-module-google-analytics */ "./node_modules/sketch-module-google-analytics/index.js");

  var variant = MSApplicationMetadata.metadata().variant;
  var Appinfo = context.plugin.url().path().split('/')[context.plugin.url().path().split('/').findIndex(function (item) {
    return item === 'Users';
  }) + 1] + "-Skth" + (variant == "NONAPPSTORE" ? "" : variant + " ") + Settings.version.sketch + "-" + context.plugin.identifier() + " [" + context.plugin.version() + "]";
  var CommandInfo = context.command.identifier();
  track("UA-169300937-3", "event", {
    ec: Appinfo,
    // the event category
    ea: CommandInfo,
    // the event action
    el: CommandResult // the event label

  });
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

/***/ }),

/***/ "sketch/settings":
/*!**********************************!*\
  !*** external "sketch/settings" ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/settings");

/***/ })

/******/ });
    if (key === 'default' && typeof exports === 'function') {
      exports(context);
    } else if (typeof exports[key] !== 'function') {
      throw new Error('Missing export named "' + key + '". Your command should contain something like `export function " + key +"() {}`.');
    } else {
      exports[key](context);
    }
  } catch (err) {
    if (typeof process !== 'undefined' && process.listenerCount && process.listenerCount('uncaughtException')) {
      process.emit("uncaughtException", err, "uncaughtException");
    } else {
      throw err
    }
  }
}
globalThis['onRun'] = __skpm_run.bind(this, 'default');
globalThis['autoRefreshHandlerSave'] = __skpm_run.bind(this, 'autoRefreshHandlerSave');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler');
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler')

//# sourceMappingURL=Preview In Browser [pib].js.map