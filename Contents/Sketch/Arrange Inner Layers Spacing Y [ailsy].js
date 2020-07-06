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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Arrange Inner Layers Spacing Y [ailsy].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Arrange Inner Layers Spacing Y [ailsy].js":
/*!*******************************************************!*\
  !*** ./src/Arrange Inner Layers Spacing Y [ailsy].js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var Selection = doc.selectedLayers.layers;
/* harmony default export */ __webpack_exports__["default"] = (function () {
  //角度转换弧度 function
  function toRadians(angle) {
    return angle * (Math.PI / 180);
  } //数字大小排序 function


  function sortNumber(a, b) {
    return a - b;
  } //主要功能开始


  var string = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString);
  var CopyNumber = (string - 0) * 1;
  var SetSpacing;
  var CopiedNumberResult = 1;
  var ArrangeResult = 0;

  if (CopyNumber >= 0 || CopyNumber < 0) {
    SetSpacing = CopyNumber;
  } else {
    SetSpacing = 0;
    CopiedNumberResult = 0;
  }

  Selection.forEach(function (item) {
    if (item.type === "Group" && item.layers.length > 1) {
      (function () {
        var PositionArray = [];

        for (var i = 0, len = item.layers.length; i < len; i++) {
          PositionArray.splice(0, 0, item.layers[i].frame.y);
        }

        PositionArray = PositionArray.sort(sortNumber);
        var MinPosition = PositionArray[0];
        var ArrangedIndex = [];

        var _loop = function _loop(_i, _len) {
          var MinPositionIndex = item.layers.findIndex(function (item2) {
            return item2.frame.y === PositionArray[_i];
          });
          item.layers[MinPositionIndex].frame.y = item.layers[MinPositionIndex].frame.y + 0.00000000001;
          ArrangedIndex.splice(ArrangedIndex.length, 0, MinPositionIndex);
        };

        for (var _i = 0, _len = PositionArray.length; _i < _len; _i++) {
          _loop(_i, _len);
        }

        for (var _i2 = 0, _len2 = ArrangedIndex.length; _i2 < _len2; _i2++) {
          item.layers[ArrangedIndex[_i2]].frame.y = MinPosition;
          var RotationPI = toRadians(item.layers[ArrangedIndex[_i2]].transform.rotation);
          var Width = item.layers[ArrangedIndex[_i2]].frame.width;
          var Height = item.layers[ArrangedIndex[_i2]].frame.height;
          MinPosition = MinPosition + Math.abs(Width * Math.sin(RotationPI)) + Math.abs(Height * Math.cos(RotationPI)) + SetSpacing;
        }

        item.adjustToFit();
        ArrangeResult = 1;
      })();
    }
  });

  if (CopiedNumberResult === 0 && ArrangeResult === 1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Try copying a Number~");
  } //清空剪贴板


  NSPasteboard.generalPasteboard().clearContents();
});

/***/ }),

/***/ "sketch":
/*!*************************!*\
  !*** external "sketch" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch");

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

//# sourceMappingURL=Arrange Inner Layers Spacing Y [ailsy].js.map