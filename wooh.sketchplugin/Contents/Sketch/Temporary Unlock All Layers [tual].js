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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Temporary Unlock All Layers [tual].js");
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

/***/ "./src/Temporary Unlock All Layers [tual].js":
/*!***************************************************!*\
  !*** ./src/Temporary Unlock All Layers [tual].js ***!
  \***************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Google Analytics Method */ "./src/modules/Google Analytics Method.js");

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

var settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");


/* harmony default export */ __webpack_exports__["default"] = (function () {
  //function: WriteLockedInfo
  var WriteLockedInfo = function WriteLockedInfo(item1, item2, item3, item4) {
    settings.setSessionVariable('ReadLockedInfo', {
      LockedLayersId: item1,
      Locked: item2,
      DocId: item3,
      PageId: item4
    });
  }; //判断一系列需要初始值的情况 即 WriteLockedInfo([], 1, null)


  var LockedLayersId, Locked, DocId, PageId, LockedLayers; // LockedLayers = sketch.find('[locked=true]', doc.selectedPage)
  //判断 WriteLockedInfo 为空时

  if (!settings.sessionVariable('ReadLockedInfo')) {
    LockedLayersId = [], Locked = 1, DocId = null, PageId = null;
  } //WriteLockedInfo 不为空时 
  else {
      LockedLayersId = settings.sessionVariable('ReadLockedInfo').LockedLayersId;
      Locked = settings.sessionVariable('ReadLockedInfo').Locked;
      DocId = settings.sessionVariable('ReadLockedInfo').DocId;
      PageId = settings.sessionVariable('ReadLockedInfo').PageId; //储存的锁定图层数量为 0 时

      if (settings.sessionVariable('ReadLockedInfo').LockedLayersId.length === 0) {
        LockedLayersId = [], Locked = 1, DocId = null, PageId = null;
      } //锁定图层数量不为 0 时，判断文档是否切换
      else {
          Locked = 0; // LockedLayersId = settings.sessionVariable('ReadLockedInfo').LockedLayersId
          //DocId = settings.sessionVariable('ReadLockedInfo').DocId
          //文档切换时

          if (settings.sessionVariable('ReadLockedInfo').DocId !== doc.id) {
            LockedLayersId = [], Locked = 1, DocId = null, PageId = null;
          } //文档未切换，页面切换时 
          else if (settings.sessionVariable('ReadLockedInfo').PageId !== doc.selectedPage.id) {
              LockedLayersId = [], Locked = 1, DocId = null, PageId = null;
            }
        }
    }

  WriteLockedInfo(LockedLayersId, Locked, DocId, PageId); //main function begins    //Locked 为 1 时 (执行完切换为 0 )

  if (settings.sessionVariable('ReadLockedInfo').Locked === 1) {
    WriteLockedInfo([], 0, doc.id, doc.selectedPage.id);
    LockedLayers = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.find('[locked=true]', doc.selectedPage);

    for (var i = 0, len = LockedLayers.length; i < len; i++) {
      LockedLayersId.splice(0, 0, LockedLayers[i].id);
    }

    LockedLayers.forEach(function (item) {
      item.locked = false;
    });
    WriteLockedInfo(LockedLayersId, 0, doc.id, doc.selectedPage.id);
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Unlocking");
  } //Locked 为 0 时 (执行完切换为 1 ) 
  else if (settings.sessionVariable('ReadLockedInfo').Locked === 0) {
      WriteLockedInfo(LockedLayersId, 1, null, null);
      /*
      LockedLayers = sketch.find('[locked=false]', doc.selectedPage)
      LockedLayers.forEach(item => {
          if (LockedLayersId.indexOf(item.id) !== -1) {
              item.locked = true
          }
      })
      */

      for (var _i = 0, _len = settings.sessionVariable('ReadLockedInfo').LockedLayersId.length; _i < _len; _i++) {
        if (doc.getLayerWithID(settings.sessionVariable('ReadLockedInfo').LockedLayersId[_i])) {
          var ThisLayer = doc.getLayerWithID(settings.sessionVariable('ReadLockedInfo').LockedLayersId[_i]);
          ThisLayer.locked = true;
        }
      }

      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Recovered");
    } //GA


  Object(_modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__["default"])(":-)");
});

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
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=Temporary Unlock All Layers [tual].js.map