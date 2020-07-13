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
/* harmony import */ var _modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Google Analytics Method */ "./src/modules/Google Analytics Method.js");

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
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Syncing " + SyncRadiusResult + " Radius Layer(s) And " + SyncShadowsResult + " Shadows Layer(s)");
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

//# sourceMappingURL=Sync Global Radius And Shadows [sgras].js.map