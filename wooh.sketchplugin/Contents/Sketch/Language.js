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
/* harmony import */ var _modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/Google Analytics Method */ "./src/modules/Google Analytics Method.js");
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


  Object(_modules_Google_Analytics_Method__WEBPACK_IMPORTED_MODULE_1__["default"])("NormalResult");
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
  }) + 1] + '-' + "Skth" + (variant == "NONAPPSTORE" ? "" : variant + " ") + Settings.version.sketch + "-" + context.plugin.identifier() + " [" + context.plugin.version() + "] ";
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