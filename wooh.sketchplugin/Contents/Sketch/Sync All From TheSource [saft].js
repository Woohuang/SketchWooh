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
  var wrappedDoc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(newDocument); //需要补充一系列检验文件正确性的功能
  //Sync 开始

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
  }

  TS_doc.close();
  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Done!");
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

//# sourceMappingURL=Sync All From TheSource [saft].js.map