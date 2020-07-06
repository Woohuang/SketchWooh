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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Temporary Unselect All Selections [tuas].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Temporary Unselect All Selections [tuas].js":
/*!*********************************************************!*\
  !*** ./src/Temporary Unselect All Selections [tuas].js ***!
  \*********************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

var settings = __webpack_require__(/*! sketch/settings */ "sketch/settings");

var Selection = doc.selectedLayers.layers;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  //function: WriteSelectedInfo
  var WriteSelectedInfo = function WriteSelectedInfo(item1, item2, item3, item4) {
    settings.setSessionVariable('ReadSelectedInfo', {
      SelectedLayersId: item1,
      Selected: item2,
      DocId: item3,
      PageId: item4
    });
  }; //判断一系列需要初始值的情况 即 WriteSelectedInfo([], 1, null)


  var SelectedLayersId, Selected, DocId, PageId; //判断 WriteSelectedInfo 为空时

  if (!settings.sessionVariable('ReadSelectedInfo')) {
    SelectedLayersId = [], Selected = 1, DocId = null, PageId = null;
  } //WriteSelectedInfo 不为空时 
  else {
      SelectedLayersId = settings.sessionVariable('ReadSelectedInfo').SelectedLayersId;
      Selected = settings.sessionVariable('ReadSelectedInfo').Selected;
      DocId = settings.sessionVariable('ReadSelectedInfo').DocId;
      PageId = settings.sessionVariable('ReadSelectedInfo').PageId; //储存的选中图层数量为 0 时

      if (settings.sessionVariable('ReadSelectedInfo').SelectedLayersId.length === 0) {
        SelectedLayersId = [], Selected = 1, DocId = null, PageId = null;
      } //选中图层数量不为 0 时，判断文档是否切换
      else {
          Selected = 0; // SelectedLayersId = settings.sessionVariable('ReadSelectedInfo').SelectedLayersId
          //DocId = settings.sessionVariable('ReadSelectedInfo').DocId
          //文档切换时

          if (settings.sessionVariable('ReadSelectedInfo').DocId !== doc.id) {
            SelectedLayersId = [], Selected = 1, DocId = null, PageId = null;
          } //文档未切换，页面切换时 
          else if (settings.sessionVariable('ReadSelectedInfo').PageId !== doc.selectedPage.id) {
              SelectedLayersId = [], Selected = 1, DocId = null, PageId = null;
            }
        }
    }

  WriteSelectedInfo(SelectedLayersId, Selected, DocId, PageId); //主要功能开始
  //Selected 为 1 时 (执行完切换为 0 )

  if (settings.sessionVariable('ReadSelectedInfo').Selected === 1) {
    WriteSelectedInfo([], 0, doc.id, doc.selectedPage.id);

    if (Selection.length > 0) {
      for (var i = 0, len = Selection.length; i < len; i++) {
        SelectedLayersId.splice(0, 0, Selection[i].id);
      }

      Selection.forEach(function (item) {
        item.selected = false;
      });
      WriteSelectedInfo(SelectedLayersId, 0, doc.id, doc.selectedPage.id); //toast result

      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Unselecting");
    } else {
      //toast result
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("No Layer Selected");
    }
  } //Selected 为 0 时 (执行完切换为 1 ) 
  else if (settings.sessionVariable('ReadSelectedInfo').Selected === 0) {
      doc.selectedLayers.clear();
      WriteSelectedInfo(SelectedLayersId, 1, null, null);

      for (var _i = 0, _len = settings.sessionVariable('ReadSelectedInfo').SelectedLayersId.length; _i < _len; _i++) {
        if (doc.getLayerWithID(settings.sessionVariable('ReadSelectedInfo').SelectedLayersId[_i])) {
          var ThisLayer = doc.getLayerWithID(settings.sessionVariable('ReadSelectedInfo').SelectedLayersId[_i]);
          ThisLayer.selected = true;
        }
      } //toast result


      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Recovered");
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

//# sourceMappingURL=Temporary Unselect All Selections [tuas].js.map