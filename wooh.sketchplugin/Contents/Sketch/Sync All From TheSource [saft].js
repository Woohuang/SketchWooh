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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Sync All From TheSource [saft].js");
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

/***/ "./src/Sync All From TheSource [saft].js":
/*!***********************************************!*\
  !*** ./src/Sync All From TheSource [saft].js ***!
  \***********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/xscapeFunctions */ "./src/modules/xscapeFunctions.js");
 //thank ashung

var system = __webpack_require__(/*! ./modules/System */ "./src/modules/System.js");

var doc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.getSelectedDocument();

/* harmony default export */ __webpack_exports__["default"] = (function () {
  //选择 TheSource.sketch
  var chooseFile = system.chooseFile(["sketch"]);

  if (!chooseFile) {
    return;
  }

  var count = 0;
  var fileURL = NSURL.fileURLWithPath(chooseFile);
  var error = MOPointer.alloc().init();
  var newDocument = MSDocument.alloc().init();
  newDocument.readFromURL_ofType_error(fileURL, "com.bohemiancoding.sketch.drawing", error);
  var wrappedDoc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(newDocument); //Sync 开始

  var TS_doc, TC_doc, TS_pages, TC_pages, TS_StylesArtboards, TC_CuStylesArtboards;
  TC_doc = doc, TS_doc = wrappedDoc;
  TS_pages = TS_doc.pages, TC_pages = TC_doc.pages;
  var TS_TxtStyles = TS_doc.sharedTextStyles;
  var TS_LayerStyles = TS_doc.sharedLayerStyles;
  var TS_Colors = TS_doc.colors; //同步 TheSource 的字体样式至 TC

  var TC_CuTxtStyles = [];

  var _loop = function _loop(i, len) {
    var CurrentStyleId = TC_doc.sharedTextStyles[i].id;
    var Judge = TS_TxtStyles.findIndex(function (item) {
      return item.id === CurrentStyleId;
    });

    if (Judge === -1) {
      TC_CuTxtStyles.splice(TC_CuTxtStyles.length - 1, 0, TC_doc.sharedTextStyles[i]);
    }
  };

  for (var i = 0, len = TC_doc.sharedTextStyles.length; i < len; i++) {
    _loop(i, len);
  }

  TC_doc.sharedTextStyles = TS_TxtStyles.concat(TC_CuTxtStyles); //同步 TheSource 的图层样式至 TC

  var TC_CuLayerStyles = [];

  var _loop2 = function _loop2(_i, _len) {
    var CurrentStyleId = TC_doc.sharedLayerStyles[_i].id;
    var Judge = TS_LayerStyles.findIndex(function (item) {
      return item.id === CurrentStyleId;
    });

    if (Judge === -1) {
      TC_CuLayerStyles.splice(TC_CuLayerStyles.length - 1, 0, TC_doc.sharedLayerStyles[_i]);
    }
  };

  for (var _i = 0, _len = TC_doc.sharedLayerStyles.length; _i < _len; _i++) {
    _loop2(_i, _len);
  }

  TC_doc.sharedLayerStyles = TS_LayerStyles.concat(TC_CuLayerStyles); //同步 TheSource 的 Colors 至 TC

  TC_doc.colors = TS_Colors; //同步 TheSource 的 🔗Symbols 至 TC

  var TS_Symbols_Index = TS_pages.findIndex(function (item) {
    return item.name === '🔗Symbols';
  });
  var TC_Symbols_Index = TC_pages.findIndex(function (item) {
    return item.name === '🔗Symbols';
  });

  if (TS_Symbols_Index === -1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未在TheSource.sketch中找到🔗Symbols页面");
  }

  if (TC_Symbols_Index === -1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未在当前文档找到🔗Symbols页面");
  } // TC_pages.splice(TC_Symbols_Index, 1, TS_pages[TS_Symbols_Index])


  TC_pages[TC_Symbols_Index].layers = TS_pages[TS_Symbols_Index].layers; //同步 TheSource 的 🍭Styles 中的非 CustomSymnbols 至 TC

  var TS_StylesPage, TC_CuStylesPage, TC_StylesPage;
  var TS_Styles_Index = TS_doc.pages.findIndex(function (item) {
    return item.name === '🍭Styles';
  });
  var TC_Styles_Index = TC_doc.pages.findIndex(function (item) {
    return item.name === '🍭Styles';
  });
  var TC_CuStyles_Index = TC_doc.pages.findIndex(function (item) {
    return item.name === 'CustomStyles';
  });

  if (TS_Styles_Index === -1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未在TheSource.sketch中找到🍭Styles页面");
  }

  if (TS_Styles_Index === -1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未在当前文档找到🍭Styles页面");
  }

  if (TC_CuStyles_Index === -1) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("未在当前文档找到CustomStyles页面");
  }

  TS_StylesPage = TS_pages[TS_Styles_Index];
  TC_StylesPage = TC_pages[TC_Styles_Index];
  TC_CuStylesPage = TC_pages[TC_CuStyles_Index];
  TS_StylesArtboards = TS_StylesPage.layers;
  TC_CuStylesArtboards = TC_CuStylesPage.layers;
  var newTC_StyleLayers = [];

  var _loop3 = function _loop3(_i2, _len2) {
    var Artboard_id = TS_StylesArtboards[_i2].id;
    var SameSymbol_Index = TC_CuStylesArtboards.findIndex(function (item) {
      return item.id === Artboard_id;
    });

    if (SameSymbol_Index === -1) {
      newTC_StyleLayers.splice(0, 0, TS_StylesArtboards[_i2]);
    }
  };

  for (var _i2 = 0, _len2 = TS_StylesArtboards.length; _i2 < _len2; _i2++) {
    _loop3(_i2, _len2);
  }

  TC_StylesPage.layers = [].concat(newTC_StyleLayers);

  for (var _i3 = 0, _len3 = newTC_StyleLayers.length; _i3 < _len3; _i3++) {
    TC_StylesPage.layers.splice(_i3, 1, newTC_StyleLayers[_i3]);
  } //toast result


  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Done!"); //GA

  Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])(":-)");
});

/***/ }),

/***/ "./src/modules/System.js":
/*!*******************************!*\
  !*** ./src/modules/System.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var System = {};

System.chooseFile = function (types) {
  var panel = NSOpenPanel.openPanel();
  panel.setCanChooseDirectories(false);
  panel.setCanChooseFiles(true);
  panel.setCanCreateDirectories(false);
  panel.setAllowedFileTypes(types);

  if (panel.runModal() == NSModalResponseOK) {
    return panel.URL().path();
  }
};

System.chooseFolder = function () {
  var panel = NSOpenPanel.openPanel();
  panel.setCanChooseDirectories(true);
  panel.setCanChooseFiles(false);
  panel.setCanCreateDirectories(true);

  if (panel.runModal() == NSModalResponseOK) {
    return panel.URL().path();
  }
};

System.savePanel = function (defaultName) {
  var panel = NSSavePanel.savePanel();

  if (defaultName) {
    panel.setNameFieldStringValue(defaultName);
  }

  panel.setCanCreateDirectories(true);

  if (panel.runModal() == NSModalResponseOK) {
    return panel.URL().path();
  }
};

System.textsFromFile = function (path) {
  var contents = NSString.stringWithContentsOfFile_encoding_error(path, NSUTF8StringEncoding, nil);
  var data = contents.componentsSeparatedByCharactersInSet(NSCharacterSet.newlineCharacterSet());
  var texts = [];
  var loopData = data.objectEnumerator();
  var item;

  while (item = loopData.nextObject()) {
    if (item.length() > 0) {
      texts.push(String(item));
    }
  }

  return texts;
};

System.imagesFromFolder = function (path) {
  var images = [];
  var supportFormats = ["png", "jpg", "jpeg", "tif", "tiff", "gif", "webp", "bmp"];
  var fileManager = NSFileManager.defaultManager();
  var fileList = fileManager.contentsOfDirectoryAtPath_error(path, nil);
  fileList = fileList.sortedArrayUsingSelector("localizedStandardCompare:");
  fileList.forEach(function (file) {
    if (supportFormats.indexOf(String(file.pathExtension().lowercaseString())) != -1) {
      images.push(path + "/" + file);
    }
  });
  return images;
};

System.textsFromChooseFile = function () {
  var textFile = System.chooseFile(["text", "txt"]);

  if (textFile == nil) {
    return [];
  } else {
    return System.textsFromFile(textFile);
  }
};

System.imagesFromChooseFolder = function () {
  var imageFolder = System.chooseFolder();

  if (imageFolder == nil) {
    return [];
  } else {
    return System.imagesFromFolder(imageFolder);
  }
};

System.readStringFromFile = function (filePath) {
  var error = MOPointer.alloc().init();
  var content = NSString.stringWithContentsOfFile_encoding_error(filePath, NSUTF8StringEncoding, error);

  if (error.value() != null) {
    return;
  }

  return String(content);
};

System.writeStringToFile = function (content, filePath) {
  var error = MOPointer.alloc().init();
  var string = NSString.stringWithString(content);
  string.writeToFile_atomically_encoding_error(filePath, true, NSUTF8StringEncoding, error);
  return error.value();
};

System.showInFinder = function (filePath) {
  var err = MOPointer.alloc().init();
  var fileManager = NSFileManager.defaultManager();
  var result = fileManager.attributesOfItemAtPath_error(filePath, err);

  if (result.isDirectory()) {
    NSWorkspace.sharedWorkspace().openFile_withApplication(filePath, "Finder");
  } else {
    NSWorkspace.sharedWorkspace().selectFile_inFileViewerRootedAtPath(filePath, nil);
  }
};

System.mkdir = function (filePath) {
  return NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error_(filePath, true, nil, nil);
};

System.getSubFolders = function (path) {
  var fileManager = NSFileManager.defaultManager();
  var paths = fileManager.contentsOfDirectoryAtPath_error(path, nil);
  var result = [];

  for (var i = 0; i < paths.count(); i++) {
    result.push(String(paths.objectAtIndex(i)));
  }

  return result;
};

System.getAppPath = function () {
  return String(NSBundle.mainBundle().bundlePath());
};

System.fileExists = function (path) {
  return NSFileManager.defaultManager().fileExistsAtPath(path);
};

module.exports = System;

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

//# sourceMappingURL=Sync All From TheSource [saft].js.map