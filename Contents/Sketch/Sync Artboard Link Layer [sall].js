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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Sync Artboard Link Layer [sall].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Sync Artboard Link Layer [sall].js":
/*!************************************************!*\
  !*** ./src/Sync Artboard Link Layer [sall].js ***!
  \************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

var Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

/* harmony default export */ __webpack_exports__["default"] = (function () {
  //acquire Link_ layer
  var AllImg = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.find('Image');
  var AllLinkPng = AllImg.filter(function (item) {
    return item.name.indexOf("Link_") !== -1;
  }); //acquire all arrboards

  var AllArtboards = [];
  doc.pages.forEach(function (item) {
    AllArtboards = AllArtboards.concat(item.layers);
  }); //collect Link_ id

  var IdArray = [];

  var _loop = function _loop(i, len) {
    if (IdArray.findIndex(function (item) {
      return item === Settings.layerSettingForKey(AllLinkPng[i], 'ArtboardId');
    }) === -1) {
      IdArray.splice(IdArray.length, 0, Settings.layerSettingForKey(AllLinkPng[i], 'ArtboardId'));
    }
  };

  for (var i = 0, len = AllLinkPng.length; i < len; i++) {
    _loop(i, len);
  } //set export option


  var LinkPngOptions = {
    formats: 'jpg',
    output: false,
    scales: 1
  };
  var ArtboardIndex;
  var SyncResult = 0; //start syncing

  IdArray.forEach(function (item) {
    ArtboardIndex = AllArtboards.findIndex(function (item2) {
      return item2.id === item;
    }); //id available

    if (ArtboardIndex !== -1) {
      var LinkArtboard = AllArtboards[ArtboardIndex];
      var LinkPng = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.export(LinkArtboard, LinkPngOptions);
      var LinkPngLayer = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.createLayerFromData(LinkPng, 'bitmap');
      AllLinkPng.filter(function (item2) {
        return Settings.layerSettingForKey(item2, 'ArtboardId') === item;
      }).forEach(function (item3) {
        item3.image = LinkPngLayer.image;
        item3.frame.width = LinkArtboard.frame.width;
        item3.frame.height = LinkArtboard.frame.height;
        item3.name = "🧶Link_" + LinkArtboard.name;
        item3.locked = true;
        SyncResult = SyncResult + 1;
      });
    } //id unavailable
    else {
        AllLinkPng.filter(function (item2) {
          return Settings.layerSettingForKey(item2, 'ArtboardId') === item;
        }).forEach(function (item3) {
          if (item3.name.indexOf("💀Lose") === -1) {
            item3.name = "💀Lose" + item3.name;
            item3.locked = true;
          }
        });
      }
  }); //toast message

  if (SyncResult === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Fail In Syncing");
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Syncing " + SyncResult + " layer(s)");
  }
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

//# sourceMappingURL=Sync Artboard Link Layer [sall].js.map