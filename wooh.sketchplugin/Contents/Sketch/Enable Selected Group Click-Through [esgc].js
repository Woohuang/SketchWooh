var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(o){if(t[o])return t[o].exports;var r=t[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,n),r.l=!0,r.exports}return n.m=e,n.c=t,n.d=function(e,t,o){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:o})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(n.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(o,r,function(t){return e[t]}.bind(null,r));return o},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=require("sketch")},function(e,t,n){var o=n(2),r=null;(r=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid"))||(r=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(r,"google.analytics.uuid"));var i=MSApplicationMetadata.metadata().variant,u="Sketch "+("NONAPPSTORE"==i?"":i+" ")+o.version.sketch;e.exports=function(e,t,n,o){var i,a={v:1,tid:e,ds:u,cid:r,t:t};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){a[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),o=MOPointer.alloc().init(),r=MOPointer.alloc().init(),i=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,o,r);return i?NSString.alloc().initWithData_encoding(i,NSUTF8StringEncoding):r.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(o&&o.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),o)}},function(e,t){e.exports=require("sketch/settings")},function(e,n,o){"use strict";o.r(n);var r=o(0),i=o.n(r),u=i.a.getSelectedDocument().selectedLayers.layers;n.default=function(){var e=0;u.forEach((function(t){"Group"===t.type&&(t.sketchObject.hasClickThrough=1,e+=1)})),0===e?i.a.UI.message("请至少选中1个Group"):i.a.UI.message("Succeed In Enabling "+e+" Group(s)"),function(e){var n=o(1),r=MSApplicationMetadata.metadata().variant;n("UA-169300937-2","event",{ec:"Sketch "+("NONAPPSTORE"==r?"":r+" ")+Settings.version.sketch,ea:t.plugin.identifier()+" [v"+t.plugin.version()+"] "+t.command.identifier(),el:e})}("NormalResult")}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(o){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw o;process.emit("uncaughtException",o,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");