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
/* harmony import */ var _modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/xscapeFunctions */ "./src/modules/xscapeFunctions.js");

 //thank gaddafirusli

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument(),
    Settings = __webpack_require__(/*! sketch/settings */ "sketch/settings"),
    autoRefreshKey = Settings.sessionVariable("autoRefreshKey"),
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
  if (autoRefreshKey === "Auto refresh @2x" || autoRefreshKey === "Refresh when saving document @2x") {
    artboardBrowse(artboard, "AutoRefreshing", false, 2);
  } else if (autoRefreshKey === "Auto refresh @1x" || autoRefreshKey === "Refresh when saving document @1x") {
    artboardBrowse(artboard, "AutoRefreshing", false, 1);
  } else {
    artboardBrowse(artboard, artboard.name, true, 2);
  } //GA


  Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])(":-)");
});
function autoRefreshHandler() {
  if (autoRefreshKey === "Auto refresh @2x") {
    refreshImg(2);
    Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])("autoRefresh@2x");
    console.log(autoRefreshKey);
    console.log('auto2');
  } else if (autoRefreshKey === "Auto refresh @1x") {
    refreshImg(1);
    Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])("autoRefresh@1x");
    console.log(autoRefreshKey);
    console.log('auto1');
  }
}
function autoRefreshHandlerSave() {
  if (autoRefreshKey === "Refresh when saving document @2x") {
    refreshImg(2);
    Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])("saveRefresh@2x");
    console.log(autoRefreshKey);
    console.log('save2');
  } else if (autoRefreshKey === "Refresh when saving document @1x") {
    refreshImg(1);
    Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])("saveRefresh@1x");
    console.log(autoRefreshKey);
    console.log('save1');
  }
} //functions

function artboardBrowse(artboard, pageTitle, customBlockKey, scaleValue) {
  if (artboard === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please Select 1 Artboard");
  } else {
    var artboardname = pageTitle;
    artboardname = artboardname.replace(/['|'|/|#|.|\\|"|"]/g, "");
    var filename = NSTemporaryDirectory() + artboardname + ".png";
    doc.sketchObject.saveArtboardOrSlice_toFile(scaleArtboard(artboard, scaleValue), filename); //htmlContent

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
                if (stopRefreshKey == false && deadline.timeRemaining() > 1 && document.visibilityState == 'visible') {\
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

function refreshImg(scaleValue) {
  if (artboard !== 0) {
    var artboardname = "AutoRefreshing";
    artboardname = artboardname.replace(/['|'|/|#|.|\\|"|"]/g, "");
    var filename = NSTemporaryDirectory() + artboardname + ".png";
    doc.sketchObject.saveArtboardOrSlice_toFile(scaleArtboard(artboard, scaleValue), filename);
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

/***/ "./src/modules/xscapeFunctions.js":
/*!****************************************!*\
  !*** ./src/modules/xscapeFunctions.js ***!
  \****************************************/
/*! exports provided: copyStringToPasteboard, dateFormat, symbolLooper, GA, userInfo, runWebviewFunction, sendToWebview, getFromPlugin, sendToPlugin, getFromWebview */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "copyStringToPasteboard", function() { return copyStringToPasteboard; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dateFormat", function() { return dateFormat; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "symbolLooper", function() { return symbolLooper; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GA", function() { return GA; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "userInfo", function() { return userInfo; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "runWebviewFunction", function() { return runWebviewFunction; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToWebview", function() { return sendToWebview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFromPlugin", function() { return getFromPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToPlugin", function() { return sendToPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFromWebview", function() { return getFromWebview; });
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }



var settings = __webpack_require__(/*! sketch/settings */ "sketch/settings"),
    doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument(),
    selections = doc.selectedLayers.layers; //copy string to pasteboard


var copyStringToPasteboard = function copyStringToPasteboard(item) {
  var pasteboard = NSPasteboard.generalPasteboard();
  pasteboard.clearContents();
  pasteboard.writeObjects([item]);
}; //generate date string

var dateFormat = function dateFormat() {
  Date.prototype.format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1,
      //月份
      "d+": this.getDate(),
      //日
      "h+": this.getHours(),
      //小时
      "m+": this.getMinutes(),
      //分
      "s+": this.getSeconds(),
      //秒
      "q+": Math.floor((this.getMonth() + 3) / 3),
      //季度
      S: this.getMilliseconds() //毫秒

    };

    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(fmt)) {
        fmt = fmt.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
      }
    }

    return fmt;
  };
}; //shortcut to change last or netx symbol instance

var symbolLooper = function symbolLooper(counts) {
  //function: WriteSymbolInfo
  var WriteSymbolInfo = function WriteSymbolInfo(item1, item2, item3) {
    settings.setSessionVariable("ReadSymbolInfo", {
      JudgeSymbolId: item1,
      ThisIndex: item2
    });
  }; //判断是否有 WriteSymbolInfo 避免报错


  if (!settings.sessionVariable("ReadSymbolInfo")) {
    settings.setSessionVariable("ReadSymbolInfo", {
      JudgeSymbolId: null,
      ThisIndex: null
    });
  }

  var ReadSymbolInfo = settings.sessionVariable("ReadSymbolInfo");
  var ThisIndex, symbolMaster, ThisLibrary; //获取选中的 symbol

  var SelectedSymbols = selections.filter(function (item) {
    return item.type === "SymbolInstance";
  }); //判断是否同类 symbol

  var JudgeSymbolId, JudgeSymbolResult;

  if (SelectedSymbols.length !== 1) {
    JudgeSymbolId = SelectedSymbols[0].symbolId;
    JudgeSymbolResult = SelectedSymbols.findIndex(function (item) {
      return item.symbolId !== JudgeSymbolId;
    });
  }

  if (JudgeSymbolResult !== -1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Please Select Symbol With Same Master");
  } //开始主要功能
  else {
      //所选为 library symbol 时
      ThisLibrary = SelectedSymbols[0].master.getLibrary();

      if (ThisLibrary) {
        var symbolReferences = ThisLibrary.getImportableSymbolReferencesForDocument(doc); //判断是否需要重新获取 ThisIndex

        if (JudgeSymbolId === ReadSymbolInfo.JudgeSymbolId) {
          ThisIndex = ReadSymbolInfo.ThisIndex;
        } else {
          ThisIndex = symbolReferences.findIndex(function (item) {
            return item.import().symbolId === JudgeSymbolId;
          });
        } //ThisIndex + counts 超出正常范围时


        if (counts > 0) {
          if (counts > symbolReferences.length) {
            counts = counts - symbolReferences.length;
          }

          if (ThisIndex + counts >= symbolReferences.length) {
            ThisIndex = ThisIndex - symbolReferences.length;
          }
        } else {
          if (-counts > symbolReferences.length) {
            counts = -(-counts - symbolReferences.length);
          }

          if (ThisIndex + counts < 0) {
            ThisIndex = symbolReferences.length - ThisIndex;
          }
        } //获取待替换 symbolMaster


        symbolMaster = symbolReferences[ThisIndex + counts].import();
      } //所选为 local symbol 时
      else {
          //不能用 let DocSymbols =  doc.getSymbols(), 会取到引入的其它 library symbol
          var DocSymbols = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.find('[type="SymbolMaster"]'); //判断是否需要重新获取 ThisIndex

          if (JudgeSymbolId === ReadSymbolInfo.JudgeSymbolId) {
            ThisIndex = ReadSymbolInfo.ThisIndex;
          } else {
            ThisIndex = DocSymbols.findIndex(function (item) {
              return item.symbolId === JudgeSymbolId;
            });
          } //ThisIndex + counts 超出正常范围时


          if (counts > 0) {
            if (counts > DocSymbols.length) {
              counts = counts - DocSymbols.length;
            }

            if (ThisIndex + counts >= DocSymbols.length) {
              ThisIndex = ThisIndex - DocSymbols.length;
            }
          } else {
            if (-counts > DocSymbols.length) {
              counts = -(-counts - DocSymbols.length);
            }

            if (ThisIndex + counts < 0) {
              ThisIndex = DocSymbols.length - ThisIndex;
            }
          } //获取待替换 symbolMaster


          symbolMaster = DocSymbols[ThisIndex + counts];
        }
    }

  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message(symbolMaster.name);
  SelectedSymbols.forEach(function (item) {
    return item.master = symbolMaster;
  }); //储存 symbol 临时信息

  WriteSymbolInfo(symbolMaster.symbolId, ThisIndex + counts);
}; //google analytics

var GA = function GA(CommandResult) {
  var track = __webpack_require__(/*! sketch-module-google-analytics */ "./node_modules/sketch-module-google-analytics/index.js"),
      variant = MSApplicationMetadata.metadata().variant,
      Appinfo = context.plugin.url().path().split("/")[context.plugin.url().path().split("/").findIndex(function (item) {
    return item === "Users";
  }) + 1] + "-Skth" + (variant == "NONAPPSTORE" ? "" : variant + " ") + settings.version.sketch + "-" + context.plugin.identifier() + " [" + context.plugin.version() + "]",
      CommandInfo = context.command.identifier();

  track("UA-169300937-3", "event", {
    ec: Appinfo,
    // the event category
    ea: CommandInfo,
    // the event action
    el: CommandResult // the event label

  });
}; //write user info

var userInfo = {
  set: function set(methodOrObject, key, value) {
    var methodOrObjectType = methodOrObject.type ? methodOrObject.type : methodOrObject;

    switch (methodOrObjectType) {
      case "ss":
        settings.sessionVariable(key, value);
        break;

      case "p":
        settings.setSettingForKey(key, value);
        break;

      case "s":
        settings.setGlobalSettingForKey(key, value);
        break;

      case "d":
        settings.setDocumentSettingForKey(methodOrObject, key, value);
        break;

      default:
        //judge if it's a layer type by a frame parameter
        if (methodOrObject.frame) {
          settings.setLayerSettingForKey(methodOrObject, key, value);
        }

        break;
    }
  },
  get: function get(methodOrObject, key) {
    var methodOrObjectType = methodOrObject.type ? methodOrObject.type : methodOrObject;

    switch (methodOrObjectType) {
      case "ss":
        return settings.sessionVariable(key);

      case "p":
        return settings.settingForKey(key);

      case "s":
        return settings.globalSettingForKey(key);

      case "d":
        return settings.documentSettingForKey(methodOrObject, key);

      default:
        var keyValue; //judge if it's a layer type by a frame parameter

        if (methodOrObject.frame) {
          keyValue = settings.layerSettingForKey(methodOrObject, key);
        }

        return keyValue;
    }
  }
}; //plugin runs webview function

var runWebviewFunction = function runWebviewFunction(functionName, functionPara) {
  return browserWindow.webContents.executeJavaScript("".concat(functionName, "(").concat(_typeof(functionPara) === "object" ? JSON.stringify(functionPara) : functionPara, ")")).then(function (res) {
    return res;
  });
}; //plugin sends webview info

var sendToWebview = function sendToWebview(valueObject) {
  return callWebviewFunction("getFromPlugin", valueObject);
}; //webview gets plugin info

var getFromPlugin = function getFromPlugin(infoStoredObject, valueObject) {
  anObject;
}; //webview sends plugin info

var sendToPlugin = function sendToPlugin(infoKey, infoValue) {
  return window.postMessage(infoKey, infoValue).then(function (res) {
    return res;
  });
}; //plugin gets webview info

var getFromWebview = function getFromWebview(infoKey) {
  return browserWindow.webContents.on(infoKey, function (infoValue) {
    return infoValue;
  });
};

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
globalThis['autoRefreshHandler'] = __skpm_run.bind(this, 'autoRefreshHandler')

//# sourceMappingURL=Preview In Browser [pib].js.map