var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/ui")},function(e,t,n){var r=n(3),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid"))||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var i=MSApplicationMetadata.metadata().variant,a="Sketch "+("NONAPPSTORE"==i?"":i+" ")+r.version.sketch;e.exports=function(e,t,n,r){var i,u={v:1,tid:e,ds:a,cid:o,t:t};return"undefined"!=typeof __command&&(u.an=__command.pluginBundle().name(),u.aid=__command.pluginBundle().identifier(),u.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){u[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),o=MOPointer.alloc().init(),i=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,o);return i?NSString.alloc().initWithData_encoding(i,NSUTF8StringEncoding):o.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=u,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t){e.exports=require("sketch/settings")},function(e,n,r){"use strict";r.r(n);var o=r(0),i=r.n(o),a=i.a.getSelectedDocument(),u=r(1),s=a.selectedLayers.layers;n.default=function(){var e=NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString);null===e&&(e="");var n,o,a,c=0;u.getInputFromUser("Input Key Text",{initialValue:e},(function(t,n){t||(e=n,s.filter((function(t){return-1===t.name.indexOf(e)})).forEach((function(e){e.selected=!1,c+=1})),c>0?i.a.UI.message("Succeed In Unselecting "+c+" Layers That Name Contains ["+e+"]"):i.a.UI.message("No Object Fits"))})),n="NormalResult",o=r(2),a=MSApplicationMetadata.metadata().variant,o("UA-169300937-2","event",{ec:"Sketch "+("NONAPPSTORE"==a?"":a+" ")+Settings.version.sketch,ea:t.plugin.identifier()+" [v"+t.plugin.version()+"] "+t.command.identifier(),el:n})}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");