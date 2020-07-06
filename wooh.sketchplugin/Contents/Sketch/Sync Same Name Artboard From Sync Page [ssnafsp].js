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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Sync Same Name Artboard From Sync Page [ssnafsp].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Sync Same Name Artboard From Sync Page [ssnafsp].js":
/*!*****************************************************************!*\
  !*** ./src/Sync Same Name Artboard From Sync Page [ssnafsp].js ***!
  \*****************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

var Page = __webpack_require__(/*! sketch/dom */ "sketch/dom").Page;

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var SyncResult = 0;
  var NullResult = 0;
  var SameNameResult = 0;
  var SelectedPage = doc.selectedPage;

  if (doc.pages.findIndex(function (item) {
    return item.name === "Sync: 将新的同名画板复制到这里" || item.name === "Sync: 剩余画板不存在或存在多个同名匹配项" || item.name === "Sync: done!";
  }) !== -1) {
    var SyncPage = doc.pages.find(function (item) {
      return item.name === "Sync: 将新的同名画板复制到这里" || item.name === "Sync: 剩余画板不存在或存在多个同名匹配项" || item.name === "Sync: done!";
    });
    var SyncPageArtboard = SyncPage.layers; //check if that select page is syncpage

    if (SelectedPage.id !== SyncPage.id) {
      SyncPageArtboard.forEach(function (item) {
        //check for same name artboard
        var SameNameArtboardsLen = SelectedPage.layers.filter(function (item2) {
          return item2.name === item.name;
        }).length;
        /*
        if (SameNameArtboardsLen < SyncPageArtboard.filter(item2 => item2.name === item.name).length) {
            SameNameArtboardsLen = SyncPageArtboard.filter(item2 => item2.name === item.name).length
        }
        */
        //main function start

        var ToSyncIndex = SelectedPage.layers.findIndex(function (item2) {
          return item2.name === item.name;
        });

        if (SameNameArtboardsLen === 1) {
          SelectedPage.layers[ToSyncIndex].layers = item.layers;
          SelectedPage.layers[ToSyncIndex].selected = true;
          SelectedPage.layers[ToSyncIndex].frame.height = item.frame.height;
          SelectedPage.layers[ToSyncIndex].frame.width = item.frame.width;
          item.remove();
          SyncResult = SyncResult + 1;
        } else if (SameNameArtboardsLen > 1) {
          SameNameResult = 1;
        } else {
          NullResult = 1;
        }
      }); //return sync result

      if (SyncResult === 0) {
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Fail In Syncing");
      } else if (SyncResult >= 1) {
        sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Syncing " + SyncResult + " Artboards");
      }

      if (SameNameResult === 1 || NullResult === 1) {
        SyncPage.name = "Sync: 剩余画板不存在或存在多个同名匹配项";
      } else {
        SyncPage.name = "Sync: done!";
      }
    } else {
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("请切换到待同步页面");
    }
  } else {
    var NewSyncPage = new Page({
      name: 'Sync: 将新的同名画板复制到这里'
    });
    NewSyncPage.parent = doc;
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("请将新的同名画板复制到Sync页");
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

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

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

//# sourceMappingURL=Sync Same Name Artboard From Sync Page [ssnafsp].js.map