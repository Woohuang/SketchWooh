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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Create A Child Library From TheSource [caclft].js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/Create A Child Library From TheSource [caclft].js":
/*!***************************************************************!*\
  !*** ./src/Create A Child Library From TheSource [caclft].js ***!
  \***************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);


var system = __webpack_require__(/*! ./modules/System */ "./src/modules/System.js");

var Page = __webpack_require__(/*! sketch/dom */ "sketch/dom").Page;

var Document = __webpack_require__(/*! sketch/dom */ "sketch/dom").Document;

var UI = __webpack_require__(/*! sketch/ui */ "sketch/ui");

var SymbolMaster = __webpack_require__(/*! sketch/dom */ "sketch/dom").SymbolMaster;

/* harmony default export */ __webpack_exports__["default"] = (function () {
  var CreateResult = 0; //choose TheSource.sketch

  sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert("First Step", "Choose TheSource.sketch");
  var chooseFile = system.chooseFile(["sketch"]);

  if (!chooseFile) {
    return;
  } else {
    var fileURL = NSURL.fileURLWithPath(chooseFile);
    var error = MOPointer.alloc().init();
    var newDocument = MSDocument.alloc().init();
    newDocument.readFromURL_ofType_error(fileURL, "com.bohemiancoding.sketch.drawing", error);
    var wrappedDoc = sketch__WEBPACK_IMPORTED_MODULE_0___default.a.fromNative(newDocument); //main function begins

    var TC_library = new Document(); //sync shared styles and colors

    TC_library.sharedTextStyles = wrappedDoc.sharedTextStyles;
    TC_library.sharedLayerStyles = wrappedDoc.sharedLayerStyles;
    TC_library.colors = wrappedDoc.colors; //create symbols page

    var SymbolsPage = Page.createSymbolsPage();
    SymbolsPage.parent = TC_library;
    var CustomMasterInfo = new SymbolMaster({
      name: 'Custom/👇Creat Your Own Symbols In This Page'
    });
    CustomMasterInfo.parent = Page.getSymbolsPage(TC_library);
    CustomMasterInfo.frame.width = 20;
    CustomMasterInfo.frame.height = 20;
    TC_library.pages.splice(0, 1); //sync pages and symbols

    for (var i = 0, len = wrappedDoc.pages.length; i < len; i++) {
      //because sketch will remove the layer object from the original doc array after been spliced to another, so in this loop everytime it need be pages[0] instead of pages[i]
      TC_library.pages.push(wrappedDoc.pages[0]);
    }

    TC_library.pages = TC_library.pages.push(new Page({
      name: "CustomStyles"
    }), new Page({
      name: "IrregularTxtStyles"
    })); //rename symbols page's name

    Page.getSymbolsPage(TC_library).name = "Custom"; //set path and save

    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.alert("Second Step", "Choose a folder to save it");
    var SavePath;
    var chooseFolder = system.chooseFolder(["sketch"]);

    if (!chooseFolder) {
      return;
    } else {
      UI.getInputFromUser("Enter New Library Name", {
        initialValue: "ChildLibrary"
      }, function (err, value) {
        if (err) {
          return;
        } else {
          SavePath = chooseFolder + "/TS_" + value + ".sketch";
          TC_library.save(SavePath, {
            saveMode: Document.SaveMode.SaveAs
          });
          sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Creating");
          CreateResult = 1;
        }
      });
    }
  } //toast result


  if (CreateResult === 0) {
    sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Fail In Creating");
  }
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

/***/ }),

/***/ "sketch/dom":
/*!*****************************!*\
  !*** external "sketch/dom" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/dom");

/***/ }),

/***/ "sketch/ui":
/*!****************************!*\
  !*** external "sketch/ui" ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("sketch/ui");

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

//# sourceMappingURL=Create A Child Library From TheSource [caclft].js.map