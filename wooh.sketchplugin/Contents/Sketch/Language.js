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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/Language.js");
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

/***/ "./src/Language.js":
/*!*************************!*\
  !*** ./src/Language.js ***!
  \*************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! sketch */ "sketch");
/* harmony import */ var sketch__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(sketch__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/xscapeFunctions */ "./src/modules/xscapeFunctions.js");
 //thank ashung

var Dialog = __webpack_require__(/*! ./modules/Dialog */ "./src/modules/Dialog.js").dialog;

var ui = __webpack_require__(/*! ./modules/Dialog */ "./src/modules/Dialog.js").ui;


/* harmony default export */ __webpack_exports__["default"] = (function () {
  var manifestFilePath = context.plugin.url().path() + "/Contents/Sketch/manifest.json";
  var supportLanguages = {
    "zh": "中文",
    "en": "English"
  };
  var supportLanguagesKeys = Object.keys(supportLanguages);
  var supportLanguagesValues = [];

  for (var key in supportLanguages) {
    supportLanguagesValues.push(supportLanguages["" + key + ""]);
  } // Dialog


  var dialog = new Dialog("Switch Plugin Language");
  var languagesView = ui.popupButton(supportLanguagesValues);
  dialog.addView(languagesView); // Click OK button

  var responseCode = dialog.run();

  if (responseCode == 1000) {
    var languageIndex = languagesView.indexOfSelectedItem();
    var languageFileURL = context.plugin.urlForResourceNamed("manifest_" + supportLanguagesKeys[languageIndex] + ".json");

    if (languageFileURL) {
      var languageFilePath = languageFileURL.path(); // Remove manifest.json

      NSFileManager.defaultManager().removeItemAtPath_error_(manifestFilePath, nil); // Replace manifest.json

      NSFileManager.defaultManager().copyItemAtPath_toPath_error_(languageFilePath, manifestFilePath, nil); // Reload Plugin

      AppController.sharedInstance().pluginManager().reloadPlugins();
      sketch__WEBPACK_IMPORTED_MODULE_0___default.a.UI.message("Succeed In Switching Language");
    } else {
      var alert = __webpack_require__(/*! sketch/ui */ "sketch/ui").alert;

      alert("Language file not found.", "Language file \"" + context.plugin.url().path() + "/Contents/Resources/manifest_" + supportLanguagesKeys[languageIndex] + ".json\" does not existed.");
    }
  } //GA


  Object(_modules_xscapeFunctions__WEBPACK_IMPORTED_MODULE_1__["GA"])(":-)");
});

/***/ }),

/***/ "./src/modules/Dialog.js":
/*!*******************************!*\
  !*** ./src/modules/Dialog.js ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

var ui = {};
ui.width = 300;
/**
 * @param  {Array|Number} size Array [w], [w, h], [y, w, h], [x, y, w, h]
 * @return  {NSRect}
 */

ui.rect = function (size) {
  if (Array.isArray(size)) {
    if (size.length < 2) {
      return NSMakeRect(0, 0, size[0], 24);
    }

    if (size.length == 2) {
      return NSMakeRect(0, 0, size[0], size[1]);
    }

    if (size.length == 3) {
      return NSMakeRect(0, size[0], size[1], size[2]);
    }

    if (size.length > 3) {
      return NSMakeRect(size[0], size[1], size[2], size[3]);
    }
  } else if (parseInt(size)) {
    return NSMakeRect(0, 0, size, 24);
  } else {
    return NSMakeRect(0, 0, ui.width, 24);
  }
};
/**
 * @param  {String} text
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.groupLabel = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 16]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  view.setStringValue(text.toUpperCase());
  view.setFont(NSFont.boldSystemFontOfSize(12));
  view.setTextColor(NSColor.blackColor());
  view.setBezeled(false);
  view.setDrawsBackground(false);
  view.setEditable(false);
  view.setSelectable(false);
  return view;
};
/**
 * @param  {String} text
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.textLabel = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 16]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  view.setStringValue(text);
  view.setBezeled(false);
  view.setDrawsBackground(false);
  view.setEditable(false);
  view.setSelectable(false);
  return view;
};
/**
 * @param  {String} text
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.textField = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  view.setStringValue(text);
  return view;
};
/**
 * @param  {Number} defaultNumber
 * @param  {Array|Number} size Optional
 * @return  {NSTextField}
 */


ui.numberField = function (defaultNumber, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSTextField.alloc().initWithFrame(frame);
  var formatter = NSNumberFormatter.alloc().init().autorelease();
  view.setFormatter(formatter);
  view.setStringValue(String(defaultNumber));
  return view;
};
/**
 * @param  {Number} defaultNumber
 * @param  {Number} min Optional default is 0.
 * @param  {Number} max Optional default is 100.
 * @param  {Array|Number} size Optional
 * @return  {Object} { view: NSTextField, stepper: NSStepper}
 */


ui.numberStepper = function (defaultNumber, min, max, size) {
  min = min || 0;
  max = max || 100;
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  var input = NSTextField.alloc().initWithFrame(this.rect([0, 0, 50, 24]));
  var formatter = NSNumberFormatter.alloc().init().autorelease();
  input.setStringValue(String(defaultNumber));
  input.setFormatter(formatter);
  var stepper = NSStepper.alloc().initWithFrame(NSMakeRect(52, 0, 16, 24));
  stepper.setMaxValue(max);
  stepper.setMinValue(min);
  stepper.setValueWraps(false);
  stepper.setAutorepeat(true);
  stepper.setIntegerValue(defaultNumber);
  stepper.setCOSJSTargetFunction(function (sender) {
    var value = sender.integerValue();
    input.setStringValue(String(value));
  });
  view.addSubview(input);
  view.addSubview(stepper);
  return {
    view: view,
    stepper: stepper
  };
};
/**
 * @param  {NSTextField} view
 * @param  {Boolean} bool
 */


ui.disableTextField = function (view, bool) {
  if (bool == false) {
    view.setEditable(true);
    view.setTextColor(NSColor.blackColor());
  } else {
    view.setEditable(false);
    view.setTextColor(NSColor.grayColor());
  }
};
/**
 * @param  {Boolean} status
 * @param  {String} title
 * @param  {Array|Number} size Optional
 * @return  {NSButton}
 */


ui.checkBox = function (status, title, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSButton.alloc().initWithFrame(frame);
  view.setButtonType(NSSwitchButton);
  view.setTitle(title);

  if (status == true) {
    view.setState(NSOnState);
  } else {
    view.setState(NSOffState);
  }

  return view;
};
/**
 * @param  {Array} items [String]
 * @param  {Array|Number} size Optional
 * @return  {NSPopUpButton}
 */


ui.popupButton = function (items, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 24]);
  }

  var view = NSPopUpButton.alloc().initWithFrame(frame);
  items.forEach(function (item) {
    view.addItemWithTitle("");
    view.lastItem().setTitle(item);
  });
  return view;
};
/**
 * @param  {Array} items [String]
 * @param  {NSView} view NSPopUpButton
 */


ui.setItems_forPopupButton = function (items, view) {
  view.removeAllItems();
  items.forEach(function (item) {
    view.addItemWithTitle("");
    view.lastItem().setTitle(item);
  });
};
/**
 * @param  {Array} title [String]
 * @param  {NSView} view NSPopUpButton
 */


ui.selectItemWithTitle_forPopupButton = function (title, view) {
  view.selectItemWithTitle(title);
};
/**
 * @param  {Array} index [Number]
 * @param  {NSView} view NSPopUpButton
 */


ui.selectItemAtIndex_forPopupButton = function (index, view) {
  view.selectItemAtIndex(index);
};
/**
 * @param  {Array} items [String]
 * @param  {Array|Number} size Optional
 * @return  {NSComboBox}
 */


ui.select = function (items, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 30]);
  }

  var view = NSComboBox.alloc().initWithFrame(frame);
  view.addItemsWithObjectValues(items);
  return view;
};
/**
 * @param  {Array|Number} size Optional
 * @return  {NSView}
 */


ui.divider = function (size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || ui.width, 1]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  view.setWantsLayer(true);
  view.layer().setBackgroundColor(CGColorCreateGenericRGB(0, 0, 0, 0.1));
  return view;
};
/**
 * @param  {Number} length Optional
 * @return  {NSView}
 */


ui.gap = function (length) {
  length = length || 1;
  var view = NSView.alloc().initWithFrame(NSMakeRect(0, 0, ui.width, length * 8));
  return view;
};
/**
 * @param  {Array} subviews [NSView]
 * @param  {Array|Number} size Optional
 * @return  {NSScrollView}
 */


ui.scrollView = function (subviews, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, ui.width, size]);
  }

  var view = NSScrollView.alloc().initWithFrame(frame);
  view.setHasVerticalScroller(true);
  view.setBorderType(NSBezelBorder);
  var contentView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, frame.size.width, 100));
  contentView.setFlipped(true);
  var height = 0;
  subviews.forEach(function (subview) {
    subview.setFlipped(true);
    var currentFrame = subview.bounds();
    currentFrame.origin.y = height;
    height += currentFrame.size.height + 1;
    subview.setFrame(currentFrame);
    var divider = ui.divider([0, currentFrame.size.height - 1, frame.size.width, 1]);
    subview.addSubview(divider);
    contentView.setFrame(NSMakeRect(0, 0, frame.size.width, height));
    contentView.addSubview(subview);
  });
  view.setDocumentView(contentView);
  return view;
};
/**
 * @param  {NSScrollView} scrollView
 * @param  {Array} subviews [NSView]
 */


ui.scrollViewSetContent = function (scrollView, subviews) {
  var width = scrollView.bounds().size.width;
  var contentView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, width, 100));
  contentView.setFlipped(true);
  var height = 0;
  subviews.forEach(function (subview) {
    var currentFrame = subview.bounds();
    currentFrame.origin.y = height;
    height += currentFrame.size.height + 1;
    subview.setFrame(currentFrame);
    contentView.setFrame(NSMakeRect(0, 0, width, height));
    contentView.addSubview(subview);
    var divider = ui.divider([0, height - 1, width, 1]);
    contentView.addSubview(divider);
  });
  scrollView.setDocumentView(contentView);
};
/**
 * @param  {Array|Number} size Optional
 * @param  {String} hexColor Optional default is #000000.
 * @return  {NSColorWell}
 */


ui.colorPicker = function (size, hexColor) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 40, 24]);
  }

  var view = NSColorWell.alloc().initWithFrame(frame);
  var color;

  if (hexColor) {
    var r = parseInt(hexColor.substr(1, 2), 16) / 255;
    var g = parseInt(hexColor.substr(3, 2), 16) / 255;
    var b = parseInt(hexColor.substr(5, 2), 16) / 255;
    color = NSColor.colorWithRed_green_blue_alpha(r, g, b, 1);
  } else {
    color = NSColor.blackColor();
  }

  view.setColor(color);
  return view;
};
/**
 * @param  {NSImage} nsImage
 * @param  {Array|Number} size Optional
 * @return  {NSImageView}
 */


ui.image = function (nsImage, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 100, size || 100]);
  }

  var view = NSImageView.alloc().initWithFrame(frame);
  view.setImage(nsImage);
  view.setImageAlignment(NSImageAlignLeft);
  return view;
};
/**
 * @param  {NSImage} nsImage
 * @param  {Array|Number} size Optional
 * @return  {NSButton}
 */


ui.imageButton = function (nsImage, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 100, size || 100]);
  }

  var view = NSButton.alloc().initWithFrame(frame);
  view.setTitle("");
  view.setImage(nsImage);
  view.setAlternateImage(nsImage);
  view.setBordered(false);
  view.setButtonType(NSMomentaryChangeButton);
  view.setBezelStyle(nil);
  view.setImagePosition(NSImageLeft);
  view.setImageScaling(NSImageScaleProportionallyDown);
  return view;
};
/**
 * @param  {NSImage} text
 * @param  {Array|Number} size Optional
 * @return  {NSButton}
 */


ui.button = function (text, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 100, 24]);
  }

  var view = NSButton.alloc().initWithFrame(frame);
  view.setBezelStyle(NSRoundedBezelStyle);
  view.setTitle(text);
  return view;
};
/**
 * @param  {Array|Number} size Optional
 * @return  {NSView}
 */


ui.view = function (size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, this.width, size || 100]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  view.setFlipped(true);
  return view;
};
/**
 * @param  {String} color #[0-9A-F]{3,8}
 * @param  {Array|Number} size Optional
 * @return  {NSView}
 */


ui.circle = function (color, size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 10, size || 10]);
  }

  var view = NSView.alloc().initWithFrame(frame);
  view.setWantsLayer(true);
  var nsColor = color ? MSImmutableColor.colorWithSVGString(color).NSColorWithColorSpace(nil) : NSColor.blackColor();
  view.setBackgroundColor(nsColor);
  view.layer().setCornerRadius(Math.min(frame.size.width, frame.size.height) / 2);
  return view;
};
/**
 * @param  {Array|Number} size Optional
 * @return  {NSDatePicker}
 */


ui.datePicker = function (size) {
  var frame;

  if (size && Array.isArray(size)) {
    frame = this.rect(size);
  } else {
    frame = this.rect([0, 0, size || 120, size || 24]);
  }

  var datePicker = NSDatePicker.alloc().initWithFrame(frame);
  datePicker.setDatePickerStyle(NSTextFieldAndStepperDatePickerStyle);
  datePicker.setDatePickerElements(NSYearMonthDayDatePickerElementFlag | NSYearMonthDatePickerElementFlag);
  datePicker.setDateValue(NSDate.date());
  return datePicker;
};
/**
 * @param  {String} message
 * @param  {String} info
 * @param  {Number} width Optional default is 300.
 * @param  {Array} buttons Optional, array with 1..3 strings, default is ["OK", "Cancel"].
 */


function dialog(message, info, width, buttons) {
  this.views = [];
  this.message = message || "Message Text";
  this.info = info;
  this.width = width || 300;

  if (buttons instanceof Array && buttons.length > 0) {
    this.buttons = buttons;
  } else {
    this.buttons = ["OK", "Cancel"];
  }

  var alert = NSAlert.alloc().init();
  alert.setMessageText(this.message);

  if (this.info) {
    alert.setInformativeText(this.info);
  } // Icon


  var icon = NSImage.imageNamed("plugins");

  if (__command.pluginBundle() && __command.pluginBundle().alertIcon()) {
    icon = __command.pluginBundle().alertIcon();
  }

  alert.setIcon(icon);
  this.buttons.forEach(function (button) {
    alert.addButtonWithTitle(button);
  });
  this.self = alert;
}
/**
 * @param  {NSView} view
 */


dialog.prototype.addView = function (view) {
  this.views.push(view);
};
/**
 * @param  {String} text
 */


dialog.prototype.addLabel = function (text) {
  var view = ui.textLabel(text, this.width);
  this.views.push(view);
};

dialog.prototype.addDivider = function () {
  var view = ui.divider(this.width);
  this.views.push(view);
};
/**
 * @return  {Object} { responseCode: 1000 | 1001 | 1002, self: NSAlert }
 */


dialog.prototype.run = function () {
  var height = 0;
  var supView = NSView.alloc().initWithFrame(NSMakeRect(0, 0, this.width, 1));
  supView.setFlipped(true);
  this.views.forEach(function (view) {
    var currentFrame = view.bounds();
    currentFrame.origin.y = height;
    height += currentFrame.size.height + 8;
    view.setFrame(currentFrame);
    supView.addSubview(view);
  });
  var viewFrame = supView.frame();
  viewFrame.size.height = height;
  supView.setFrame(viewFrame);
  this.self.setAccessoryView(supView);
  return this.self.runModal();
};

dialog.prototype.close = function () {
  NSApp.stopModal();
};

dialog.prototype.setKeyOrder = function (views) {
  for (var i = 0; i < views.length; i++) {
    var current = views[i];
    var next = views[i + 1] || views[0];

    if (next) {
      current.setNextKeyView(next);
    }
  }

  this.self.window().setInitialFirstResponder(views[0]);
};

dialog.prototype.focus = function (view) {
  this.self.window().setInitialFirstResponder(view);
};

module.exports.dialog = dialog;
module.exports.ui = ui;

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

//# sourceMappingURL=Language.js.map