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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Sync Global Radius And Shadows [sgras].js");
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

/***/ "./src/Sync Global Radius And Shadows [sgras].js":
/*!*******************************************************!*\
  !*** ./src/Sync Global Radius And Shadows [sgras].js ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/xscapeFunctions */ "./src/modules/xscapeFunctions.js");

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();
var Selection = doc.selectedLayers.layers;

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var SelectionResult = 0;
  var GlobalParameterResult = 0;
  var AutoStyleLayerResult = 0;
  var SyncRadiusResult = 0;
  var SyncShadowsResult = 0; //收集对应 Radius 与 Shadows 的 masters

  var CollectMasters = Selection.filter(function (item) {
    return item.type === "SymbolMaster";
  }); //if no selected global symbol masters then get all global symbol masters automately

  if (CollectMasters.length === 0) {
    CollectMasters = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.find('SymbolMaster').filter(function (item) {
      return item.name.indexOf("lobal") !== -1 && item.name.indexOf("⚙️") !== -1;
    });
  } //get global symbol masters' instance control layer


  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.find('SymbolMaster').filter(function (item) {
    return item.name.indexOf("lobal") !== -1 && item.name.indexOf("⚙️") !== -1;
  }).forEach(function (item) {
    item.getAllInstances().forEach(function (item2) {
      if (item2.parent.type === "SymbolMaster") {
        if (item2.parent.layers.length === 1) {
          CollectMasters.splice(0, 0, item2.parent);
        }
      }
    });
  });

  if (CollectMasters.length > 0) {
    SelectionResult = 1;
  }

  var CollectRadiusMasters = CollectMasters.filter(function (item) {
    if (item.layers[0].type === "ShapePath") {
      return item.layers[0].name.indexOf("adius") !== -1 || item.layers[0].name.indexOf("圆角") !== -1;
    } else if (item.layers[0].type === "SymbolInstance") {
      return item.layers[0].master.layers[0].name.indexOf("adius") !== -1 || item.layers[0].master.layers[0].name.indexOf("圆角") !== -1;
    }
  });
  var CollectShadowMasters = CollectMasters.filter(function (item) {
    if (item.layers[0].type === "ShapePath") {
      return item.layers[0].name.indexOf("hadow") !== -1 || item.layers[0].name.indexOf("投影") !== -1 || item.layers[0].name.indexOf("阴影") !== -1;
    } else if (item.layers[0].type === "SymbolInstance") {
      return item.layers[0].master.layers[0].name.indexOf("hadow") !== -1 || item.layers[0].master.layers[0].name.indexOf("投影") !== -1 || item.layers[0].master.layers[0].name.indexOf("阴影") !== -1;
    }
  }); //Radius function begins 

  CollectRadiusMasters.forEach(function (item) {
    SelectionResult = 1;
    var GlobalRadius = null; //获取 Global Parameter
    //判断所选 Artboard 内是否有图层

    if (item.layers.length > 0) {
      //判断所选 Artboard 内图层为正确的 SymbolInstance 时
      if (item.layers[0].type === "SymbolInstance") {
        if (typeof item.layers[0].master.layers[0] !== "undefined") {
          if (typeof item.layers[0].master.layers[0].points !== "undefined") {
            GlobalRadius = item.layers[0].master.layers[0].points[0].cornerRadius;
            GlobalParameterResult = 1;
          }
        }
      } //判断所选 Artboard 内图层为正确的 Shape 时
      else if (item.layers[0].type === "ShapePath") {
          GlobalRadius = item.layers[0].points[0].cornerRadius;
          GlobalParameterResult = 1;
        }

      if (GlobalRadius === 0) {
        GlobalRadius = 0.00001;
      }
    } //对包含选中 symbol 的每一个 symbol 的相关图层进行设置


    var AllInstances = item.getAllInstances();
    AllInstances.forEach(function (item2) {
      var ThisInstance = item2; //check if instance is the right instance

      if (item2.parent.type === "SymbolMaster" && item2.parent.layers.length === 1) {
        ThisInstance = item2.master;
      } else if (item2.parent.type === "Group" && item2.parent.layers.length === 1 && item2.getParentArtboard().layers.length === 1) {} else {
        //锁定并隐藏 Global symbol instance 图层
        ThisInstance.style.opacity = 0;
        ThisInstance.frame.width = 0.1;
        ThisInstance.frame.height = 0.1;
        ThisInstance.frame.x = ThisInstance.parent.frame.width / 2;
        ThisInstance.frame.y = ThisInstance.parent.frame.height / 2;
        ThisInstance.locked = true;
        ThisInstance.hidden = true;
        var ThisParent = ThisInstance.parent;
        var AutoStyleLayer;

        if (ThisParent.layers.find(function (item3) {
          return item3.name.indexOf("AutoStyle") !== -1;
        })) {
          AutoStyleLayer = ThisParent.layers.find(function (item4) {
            return item4.name.indexOf("AutoStyle") !== -1;
          });

          if ('points' in AutoStyleLayer) {
            if (GlobalParameterResult === 1) {
              //形状已设置过圆角时，对 Radius 非0的 point 赋值新的 Radius
              if (AutoStyleLayer.points.find(function (item5) {
                return item5.cornerRadius > 0;
              })) {
                AutoStyleLayer.points.forEach(function (item6) {
                  if (item6.cornerRadius !== 0) {
                    item6.cornerRadius = GlobalRadius;
                  }
                }); //刷新 layer css

                var NewIndex = AutoStyleLayer.points.findIndex(function (item) {
                  return item.cornerRadius > 0;
                });
                AutoStyleLayer.points[NewIndex].cornerRadius = GlobalRadius + 0.00001;
                SyncRadiusResult++;
              } //形状未设置过圆角时，对所有 point 赋值新的 Radius
              else {
                  AutoStyleLayer.points.forEach(function (item7) {
                    item7.cornerRadius = GlobalRadius;
                  }); //刷新 layer css

                  AutoStyleLayer.points[0].cornerRadius = GlobalRadius + 0.00001;
                  SyncRadiusResult++;
                }
            }

            AutoStyleLayerResult = 1;
          }
        }
      }
    });
  }); //Shadows function begins 

  CollectShadowMasters.forEach(function (item) {
    var GlobalShadows = null; //获取 Global Parameter
    //判断所选 Artboard 内是否有图层

    if (item.layers.length > 0) {
      //判断所选 Artboard 内图层为正确的 SymbolInstance 时
      if (item.layers[0].type === "SymbolInstance") {
        if (typeof item.layers[0].master.layers[0] !== "undefined") {
          GlobalShadows = item.layers[0].master.layers[0].style.shadows;
        }
      } //判断所选 Artboard 内图层为正确的 Shape 时
      else if (item.layers[0].type === "ShapePath") {
          GlobalShadows = item.layers[0].style.shadows;
          GlobalParameterResult = 1;
        }
    } //对包含选中 symbol 的每一个 symbol 的相关图层进行设置


    if (GlobalShadows.length > 0) {
      var AllInstances = item.getAllInstances();
      AllInstances.forEach(function (item2) {
        var ThisInstance = item2; //check if instance is the right instance

        if (item2.parent.type === "SymbolMaster" && item2.parent.layers.length === 1) {
          ThisInstance = item2.master;
        } else if (item2.parent.type === "Group" && item2.parent.layers.length === 1 && item2.getParentArtboard().layers.length === 1) {} else {
          //对包含选中 symbol 的每一个 symbol 的相关图层进行设置
          var _AllInstances = item.getAllInstances();

          _AllInstances.forEach(function (item2) {
            //锁定并隐藏 Global symbol instance 图层
            item2.style.opacity = 0;
            item2.frame.width = 0.1;
            item2.frame.height = 0.1;
            item2.frame.x = item2.parent.frame.width / 2;
            item2.frame.y = item2.parent.frame.height / 2;
            item2.locked = true;
            ThisInstance.hidden = true;
            var ThisParent = item2.parent;
            var AutoStyleLayer;

            if (ThisParent.layers.find(function (item3) {
              return item3.name.indexOf("AutoStyle") !== -1;
            })) {
              AutoStyleLayer = ThisParent.layers.find(function (item4) {
                return item4.name.indexOf("AutoStyle") !== -1;
              });

              if (GlobalParameterResult === 1) {
                AutoStyleLayer.style.shadows = GlobalShadows;
                SyncShadowsResult = SyncShadowsResult + 1;
              }

              AutoStyleLayerResult = 1;
            }
          });
        }
      });
    }
  }); //判断 sync 结果并提示

  if (SelectionResult === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Find No Global Radius or Shadow Artboard");
  } else if (GlobalParameterResult === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未在 Global Artboard 内找到记录属性的形状图层");
  } else if (AutoStyleLayerResult === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未找到需要同步的 AutoStyle 图层");
  } else if (SyncRadiusResult + SyncShadowsResult === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("同步 AutoStyle 图层属性时失败");
  } else {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Syncing " + SyncRadiusResult + " Radius Layer And " + SyncShadowsResult + " Shadows Layer");
  } //GA


  Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])(":-)");
});

/***/ }),

/***/ "./src/modules/xscapeFunctions.js":
/*!****************************************!*\
  !*** ./src/modules/xscapeFunctions.js ***!
  \****************************************/
/*! exports provided: copyStringToPasteboard, dateFormat, symbolLooper, GA, userInfo, runWebviewFunction, sendToWebview, getFromWebview, sendToPlugin, getFromPlugin */
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
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFromWebview", function() { return getFromWebview; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sendToPlugin", function() { return sendToPlugin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getFromPlugin", function() { return getFromPlugin; });
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
}; //plugin gets webview info

var getFromWebview = function getFromWebview(infoKey) {
  return browserWindow.webContents.on(infoKey, function (infoValue) {
    return infoValue;
  });
}; //webview sends plugin info

var sendToPlugin = function sendToPlugin(infoKey, infoValue) {
  return window.postMessage(infoKey, infoValue).then(function (res) {
    return res;
  });
}; //webview gets plugin info

var getFromPlugin = function getFromPlugin(key, valueObject) {
  return anObject;
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
globalThis['onRun'] = __skpm_run.bind(this, 'default')

//# sourceMappingURL=Sync Global Radius And Shadows [sgras].js.map