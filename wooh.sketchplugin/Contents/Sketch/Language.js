var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var r=function(e){var t={};function r(i){if(t[i])return t[i].exports;var n=t[i]={i:i,l:!1,exports:{}};return e[i].call(n.exports,n,n.exports,r),n.l=!0,n.exports}return r.m=e,r.c=t,r.d=function(e,t,i){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:i})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var i=Object.create(null);if(r.r(i),Object.defineProperty(i,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)r.d(i,n,function(t){return e[t]}.bind(null,n));return i},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=5)}([function(e,t){var r={};function i(e,t,r,i){this.views=[],this.message=e||"Message Text",this.info=t,this.width=r||300,i instanceof Array&&i.length>0?this.buttons=i:this.buttons=["OK","Cancel"];var n=NSAlert.alloc().init();n.setMessageText(this.message),this.info&&n.setInformativeText(this.info);var a=NSImage.imageNamed("plugins");__command.pluginBundle()&&__command.pluginBundle().alertIcon()&&(a=__command.pluginBundle().alertIcon()),n.setIcon(a),this.buttons.forEach((function(e){n.addButtonWithTitle(e)})),this.self=n}r.width=300,r.rect=function(e){return Array.isArray(e)?e.length<2?NSMakeRect(0,0,e[0],24):2==e.length?NSMakeRect(0,0,e[0],e[1]):3==e.length?NSMakeRect(0,e[0],e[1],e[2]):e.length>3?NSMakeRect(e[0],e[1],e[2],e[3]):void 0:parseInt(e)?NSMakeRect(0,0,e,24):NSMakeRect(0,0,r.width,24)},r.groupLabel=function(e,t){var i;i=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||r.width,16]);var n=NSTextField.alloc().initWithFrame(i);return n.setStringValue(e.toUpperCase()),n.setFont(NSFont.boldSystemFontOfSize(12)),n.setTextColor(NSColor.blackColor()),n.setBezeled(!1),n.setDrawsBackground(!1),n.setEditable(!1),n.setSelectable(!1),n},r.textLabel=function(e,t){var i;i=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||r.width,16]);var n=NSTextField.alloc().initWithFrame(i);return n.setStringValue(e),n.setBezeled(!1),n.setDrawsBackground(!1),n.setEditable(!1),n.setSelectable(!1),n},r.textField=function(e,t){var i;i=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||r.width,24]);var n=NSTextField.alloc().initWithFrame(i);return n.setStringValue(e),n},r.numberField=function(e,t){var i;i=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||r.width,24]);var n=NSTextField.alloc().initWithFrame(i),a=NSNumberFormatter.alloc().init().autorelease();return n.setFormatter(a),n.setStringValue(String(e)),n},r.numberStepper=function(e,t,i,n){var a;t=t||0,i=i||100,a=n&&Array.isArray(n)?this.rect(n):this.rect([0,0,n||r.width,24]);var o=NSView.alloc().initWithFrame(a),s=NSTextField.alloc().initWithFrame(this.rect([0,0,50,24])),l=NSNumberFormatter.alloc().init().autorelease();s.setStringValue(String(e)),s.setFormatter(l);var u=NSStepper.alloc().initWithFrame(NSMakeRect(52,0,16,24));return u.setMaxValue(i),u.setMinValue(t),u.setValueWraps(!1),u.setAutorepeat(!0),u.setIntegerValue(e),u.setCOSJSTargetFunction((function(e){var t=e.integerValue();s.setStringValue(String(t))})),o.addSubview(s),o.addSubview(u),{view:o,stepper:u}},r.disableTextField=function(e,t){0==t?(e.setEditable(!0),e.setTextColor(NSColor.blackColor())):(e.setEditable(!1),e.setTextColor(NSColor.grayColor()))},r.checkBox=function(e,t,i){var n;n=i&&Array.isArray(i)?this.rect(i):this.rect([0,0,i||r.width,24]);var a=NSButton.alloc().initWithFrame(n);return a.setButtonType(NSSwitchButton),a.setTitle(t),1==e?a.setState(NSOnState):a.setState(NSOffState),a},r.popupButton=function(e,t){var i;i=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||r.width,24]);var n=NSPopUpButton.alloc().initWithFrame(i);return e.forEach((function(e){n.addItemWithTitle(""),n.lastItem().setTitle(e)})),n},r.setItems_forPopupButton=function(e,t){t.removeAllItems(),e.forEach((function(e){t.addItemWithTitle(""),t.lastItem().setTitle(e)}))},r.selectItemWithTitle_forPopupButton=function(e,t){t.selectItemWithTitle(e)},r.selectItemAtIndex_forPopupButton=function(e,t){t.selectItemAtIndex(e)},r.select=function(e,t){var i;i=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||r.width,30]);var n=NSComboBox.alloc().initWithFrame(i);return n.addItemsWithObjectValues(e),n},r.divider=function(e){var t;t=e&&Array.isArray(e)?this.rect(e):this.rect([0,0,e||r.width,1]);var i=NSView.alloc().initWithFrame(t);return i.setWantsLayer(!0),i.layer().setBackgroundColor(CGColorCreateGenericRGB(0,0,0,.1)),i},r.gap=function(e){return e=e||1,NSView.alloc().initWithFrame(NSMakeRect(0,0,r.width,8*e))},r.scrollView=function(e,t){var i;i=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,r.width,t]);var n=NSScrollView.alloc().initWithFrame(i);n.setHasVerticalScroller(!0),n.setBorderType(NSBezelBorder);var a=NSView.alloc().initWithFrame(NSMakeRect(0,0,i.size.width,100));a.setFlipped(!0);var o=0;return e.forEach((function(e){e.setFlipped(!0);var t=e.bounds();t.origin.y=o,o+=t.size.height+1,e.setFrame(t);var n=r.divider([0,t.size.height-1,i.size.width,1]);e.addSubview(n),a.setFrame(NSMakeRect(0,0,i.size.width,o)),a.addSubview(e)})),n.setDocumentView(a),n},r.scrollViewSetContent=function(e,t){var i=e.bounds().size.width,n=NSView.alloc().initWithFrame(NSMakeRect(0,0,i,100));n.setFlipped(!0);var a=0;t.forEach((function(e){var t=e.bounds();t.origin.y=a,a+=t.size.height+1,e.setFrame(t),n.setFrame(NSMakeRect(0,0,i,a)),n.addSubview(e);var o=r.divider([0,a-1,i,1]);n.addSubview(o)})),e.setDocumentView(n)},r.colorPicker=function(e,t){var r;r=e&&Array.isArray(e)?this.rect(e):this.rect([0,0,e||40,24]);var i,n=NSColorWell.alloc().initWithFrame(r);if(t){var a=parseInt(t.substr(1,2),16)/255,o=parseInt(t.substr(3,2),16)/255,s=parseInt(t.substr(5,2),16)/255;i=NSColor.colorWithRed_green_blue_alpha(a,o,s,1)}else i=NSColor.blackColor();return n.setColor(i),n},r.image=function(e,t){var r;r=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||100,t||100]);var i=NSImageView.alloc().initWithFrame(r);return i.setImage(e),i.setImageAlignment(NSImageAlignLeft),i},r.imageButton=function(e,t){var r;r=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||100,t||100]);var i=NSButton.alloc().initWithFrame(r);return i.setTitle(""),i.setImage(e),i.setAlternateImage(e),i.setBordered(!1),i.setButtonType(NSMomentaryChangeButton),i.setBezelStyle(nil),i.setImagePosition(NSImageLeft),i.setImageScaling(NSImageScaleProportionallyDown),i},r.button=function(e,t){var r;r=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||100,24]);var i=NSButton.alloc().initWithFrame(r);return i.setBezelStyle(NSRoundedBezelStyle),i.setTitle(e),i},r.view=function(e){var t;t=e&&Array.isArray(e)?this.rect(e):this.rect([0,0,this.width,e||100]);var r=NSView.alloc().initWithFrame(t);return r.setFlipped(!0),r},r.circle=function(e,t){var r;r=t&&Array.isArray(t)?this.rect(t):this.rect([0,0,t||10,t||10]);var i=NSView.alloc().initWithFrame(r);i.setWantsLayer(!0);var n=e?MSImmutableColor.colorWithSVGString(e).NSColorWithColorSpace(nil):NSColor.blackColor();return i.setBackgroundColor(n),i.layer().setCornerRadius(Math.min(r.size.width,r.size.height)/2),i},r.datePicker=function(e){var t;t=e&&Array.isArray(e)?this.rect(e):this.rect([0,0,e||120,e||24]);var r=NSDatePicker.alloc().initWithFrame(t);return r.setDatePickerStyle(NSTextFieldAndStepperDatePickerStyle),r.setDatePickerElements(NSYearMonthDayDatePickerElementFlag|NSYearMonthDatePickerElementFlag),r.setDateValue(NSDate.date()),r},i.prototype.addView=function(e){this.views.push(e)},i.prototype.addLabel=function(e){var t=r.textLabel(e,this.width);this.views.push(t)},i.prototype.addDivider=function(){var e=r.divider(this.width);this.views.push(e)},i.prototype.run=function(){var e=0,t=NSView.alloc().initWithFrame(NSMakeRect(0,0,this.width,1));t.setFlipped(!0),this.views.forEach((function(r){var i=r.bounds();i.origin.y=e,e+=i.size.height+8,r.setFrame(i),t.addSubview(r)}));var r=t.frame();return r.size.height=e,t.setFrame(r),this.self.setAccessoryView(t),this.self.runModal()},i.prototype.close=function(){NSApp.stopModal()},i.prototype.setKeyOrder=function(e){for(var t=0;t<e.length;t++){var r=e[t],i=e[t+1]||e[0];i&&r.setNextKeyView(i)}this.self.window().setInitialFirstResponder(e[0])},i.prototype.focus=function(e){this.self.window().setInitialFirstResponder(e)},e.exports.dialog=i,e.exports.ui=r},function(e,t){e.exports=require("sketch/settings")},function(e,t){e.exports=require("sketch")},function(e,r,i){var n=i(1),a=null;(a=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(a=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(a,"google.analytics.uuid"));var o=MSApplicationMetadata.metadata().variant,s="Sketch "+("NONAPPSTORE"==o?"":o+" ")+n.version.sketch;e.exports=function(e,t,r,i){var n,o={v:1,tid:e,ds:s,cid:a,t:t};return"undefined"!=typeof __command&&(o.an=__command.pluginBundle().name(),o.aid=__command.pluginBundle().identifier(),o.av=__command.pluginBundle().version()),r&&Object.keys(r).forEach((function(e){o[e]=r[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var r=NSURLRequest.requestWithURL(e),i=MOPointer.alloc().init(),n=MOPointer.alloc().init(),a=NSURLConnection.sendSynchronousRequest_returningResponse_error(r,i,n);return a?NSString.alloc().initWithData_encoding(a,NSUTF8StringEncoding):n.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(i&&i.debug?"debug/":"")+"collect?"+(n=o,Object.keys(n).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(n[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),i)}},function(e,t){e.exports=require("sketch/ui")},function(e,r,i){"use strict";i.r(r);var n=i(2),a=i.n(n),o=i(1),s=i(0).dialog,l=i(0).ui;r.default=function(){var e=t.plugin.url().path()+"/Contents/Sketch/manifest.json",r={zh:"中文",en:"English"},n=Object.keys(r),u=[];for(var c in r)u.push(r[""+c]);var d,h,p,f=new s("Switch Plugin Language"),S=l.popupButton(u);if(f.addView(S),1e3==f.run()){var g=S.indexOfSelectedItem(),m=t.plugin.urlForResourceNamed("manifest_"+n[g]+".json");if(m){var v=m.path();NSFileManager.defaultManager().removeItemAtPath_error_(e,nil),NSFileManager.defaultManager().copyItemAtPath_toPath_error_(v,e,nil),AppController.sharedInstance().pluginManager().reloadPlugins(),a.a.UI.message("Succeed In Switching Language")}else{(0,i(4).alert)("Language file not found.",'Language file "'+t.plugin.url().path()+"/Contents/Resources/manifest_"+n[g]+'.json" does not existed.')}}d="",h=i(3),p=MSApplicationMetadata.metadata().variant,h("UA-169300937-3","event",{ec:t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==p?"":p+" ")+o.version.sketch+"-"+t.plugin.identifier()+" ["+t.plugin.version()+"]",ea:t.command.identifier(),el:d})}}]);if("default"===e&&"function"==typeof r)r(t);else{if("function"!=typeof r[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');r[e](t)}}catch(i){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw i;process.emit("uncaughtException",i,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");