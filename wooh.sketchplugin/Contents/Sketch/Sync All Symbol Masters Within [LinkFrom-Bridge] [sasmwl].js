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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Sync All Symbol Masters Within [LinkFrom-Bridge] [sasmwl].js");
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

/***/ "./src/Sync All Symbol Masters Within [LinkFrom-Bridge] [sasmwl].js":
/*!**************************************************************************!*\
  !*** ./src/Sync All Symbol Masters Within [LinkFrom-Bridge] [sasmwl].js ***!
  \**************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Google Analytics Method */ "./src/modules/Google Analytics Method.js");


var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var LinkResult = 0,
      ChooseLinkFromMasterResult = 0,
      findSymbolMasters = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.find('SymbolMaster'),
      LinkFromSymbolLikelyList = findSymbolMasters.filter(function (item) {
    return item.name.indexOf("Link") !== -1 && item.name.indexOf("Bridge") !== -1;
  }),
      LinkFromSymbolLikelyNames = [],
      LinkFromMaster;
  LinkFromSymbolLikelyList.forEach(function (item) {
    ChooseLinkFromMasterResult = ChooseLinkFromMasterResult + 1;
    LinkFromSymbolLikelyNames.push(item.name + " [" + ChooseLinkFromMasterResult + "]");
  }); //acquire LinkFrom master

  UI.getInputFromUser("Choose [Link/From-Bridge] Symbol Master", {
    type: UI.INPUT_TYPE.selection,
    possibleValues: LinkFromSymbolLikelyNames
  }, function (err, value) {
    if (err) {
      return;
    } else {
      LinkFromMaster = LinkFromSymbolLikelyList[LinkFromSymbolLikelyNames.findIndex(function (item) {
        return item === value;
      })];
    }
  });

  if (LinkFromMaster !== undefined) {
    LinkFromMaster.getAllInstances().forEach(function (item) {
      //acquire LinkOriginalMasterId info
      var LinkOriginalMasterId;

      if (item.overrides[0].value !== LinkFromMaster.layers[0].symbolId) {
        LinkOriginalMasterId = item.overrides[0].value; //set LinkOriginalMasterId info

        Settings.setLayerSettingForKey(item, 'LinkOriginalMasterId', LinkOriginalMasterId);
      } else if (Settings.layerSettingForKey(item, 'LinkOriginalMasterId') !== undefined) {
        LinkOriginalMasterId = Settings.layerSettingForKey(item, 'LinkOriginalMasterId');
      } else {
        LinkOriginalMasterId = findSymbolMasters.find(function (item2) {
          return item2.name === item.overrides[1].value;
        }).symbolId; //set LinkOriginalMasterId info

        Settings.setLayerSettingForKey(item, 'LinkOriginalMasterId', LinkOriginalMasterId);
      }

      if (LinkOriginalMasterId !== undefined) {
        var LinkMaster = doc.getSymbolMasterWithID(LinkOriginalMasterId); //remove old layers

        item.parent.layers.filter(function (item2) {
          return item2.id !== item.id;
        }).forEach(function (item2) {
          return item2.remove();
        }); //reset 'artboards' or 'group' frame

        if (item.parent.type === 'Artboard' || item.parent.type === 'SymbolMaster') {
          item.parent.frame.width = LinkMaster.frame.width;
          item.parent.frame.height = LinkMaster.frame.height;
        } //duplicate layers


        LinkMaster.layers.forEach(function (item2) {
          item2.duplicate().parent = item.parent;
        }); //reset group frame size

        if (item.parent.type === 'Group') {
          item.parent.frame.x = 0;
          item.parent.frame.y = 0; //item.parent.adjustToFit()

          var AllGroups = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.find('Group', item.getParentArtboard());

          for (var i = 0; i < AllGroups.length; i++) {
            AllGroups.forEach(function (item) {
              return item.adjustToFit();
            });
          }
        } //reset LinkFrom symbol instance


        item.index = 0;
        item.overrides[0].value = LinkFromMaster.overrides[0].value;
        item.overrides[1].value = LinkMaster.name;
        item.name = "⚙️LinkFrom: " + LinkMaster.name;
        item.frame.width = 0.1;
        item.frame.height = 0.1;
        item.frame.x = item.parent.frame.width / 2;
        item.frame.y = item.parent.frame.height / 2;
        item.locked = true;
        item.hidden = true;
      } //result counts


      LinkResult = LinkResult + 1;
    });
  } //result toast


  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Linking " + LinkResult + " Symbol(s)"); //GA

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

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

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

//# sourceMappingURL=Sync All Symbol Masters Within [LinkFrom-Bridge] [sasmwl].js.map