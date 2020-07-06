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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Sync Selection To TheSource [sstts].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Sync Selection To TheSource [sstts].js":
/*!****************************************************!*\
  !*** ./src/Sync Selection To TheSource [sstts].js ***!
  \****************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var Document = __webpack_require__(/*! sketch/dom */ "sketch/dom").Document;

var alldocuments = Document.getDocuments();

var path = __webpack_require__(/*! path */ "path");

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var Selection = doc.selectedLayers.layers;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  //通过文件名判断是否打开 TheSource.sketch
  var TS_doc, TC_doc;
  TS_doc = alldocuments.find(function (item) {
    return path.basename(item.path).replace('.sketch', '') === 'TheSource';
  });
  TC_doc = doc;
  var SyncResult = 0;

  if (TS_doc === undefined) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("请先打开TheSource.sketch");
  } else if (path.basename(doc.path).replace(".sketch", "") === "TheSource") {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("请切换到TS_子组件库并选中待同步Symbol");
  } //正确打开 TheSource.sketch 后
  else {
      (function () {
        //获取 Selected Symbol Masters
        var SelectedMaster = [];

        for (var i = 0, len = Selection.length; i < len; i++) {
          if (Selection[i].type === "SymbolMaster") {
            SelectedMaster.splice(SelectedMaster.length - 1, 0, Selection[i]);
          }
        }

        if (SelectedMaster.length === 0) {
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please Select The Symbol Need To Be Synchronized");
        } else {
          var TC_CurPage = TC_doc.selectedPage;
          var TS_SamePage = TS_doc.pages.find(function (item) {
            return item.name === TC_CurPage.name;
          });

          if (TS_SamePage === undefined) {
            sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未在TheSource.sketch中找到相同页面");
          } else {
            var _loop = function _loop(_i, _len) {
              var TS_SyncIndex = TS_SamePage.layers.findIndex(function (item) {
                return item.symbolId === SelectedMaster[_i].symbolId;
              });

              if (TS_SyncIndex === -1) {
                TS_SamePage.layers.splice(TS_SyncIndex, 0, SelectedMaster[_i]);
                SyncResult = SyncResult + 1;
              } else {
                TS_SamePage.layers.splice(TS_SyncIndex, 1, SelectedMaster[_i]);
                SyncResult = SyncResult + 1;
              }
            };

            for (var _i = 0, _len = SelectedMaster.length; _i < _len; _i++) {
              _loop(_i, _len);
            }

            if (SyncResult > 0) {
              sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Syncing " + SyncResult + " Symbol Master(s)");
            } else {
              sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Fail In Syncing");
            }
          }
        }
      })();
    }
});

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

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

//# sourceMappingURL=Sync Selection To TheSource [sstts].js.map