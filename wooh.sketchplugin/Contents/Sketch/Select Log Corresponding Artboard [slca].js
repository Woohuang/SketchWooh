var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/settings")},function(e,n,r){var i=r(1),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,u="Sketch "+("NONAPPSTORE"==a?"":a+" ")+i.version.sketch;e.exports=function(e,t,n,r){var i,a={v:1,tid:e,ds:u,cid:o,t:t};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){a[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,n,r){"use strict";r.r(n);var i=r(0),o=r.n(i);var a=r(1),u=o.a.getSelectedDocument(),s=(u.selectedLayers.layers,o.a.getSelectedDocument()),c=s.selectedLayers.layers,l=r(1);n.default=function(){var e,n,i,u=c.filter((function(e){return void 0!==l.layerSettingForKey(e,"ArtboardIds")}));if(u.length>0){var d=[];s.pages.forEach((function(e){d=d.concat(e.layers.filter((function(e){return"Artboard"===e.type})))}));var f=new String,p=[],g=0;u.forEach((function(e){f+=l.layerSettingForKey(e,"ArtboardIds")})),f.split("_next_").forEach((function(e){-1===p.findIndex((function(t){return t===e}))&&p.splice(0,0,e)})),p.forEach((function(e){var t=d.findIndex((function(t){return t.id===e}));-1!==t&&(d[t].selected=!0,g+=1)})),o.a.UI.message("Succeed In Selecting "+g+" Artboards")}else o.a.UI.message("Please Select At Least 1 Log Text Layer");e=":-)",n=r(2),i=MSApplicationMetadata.metadata().variant,n("UA-169300937-3","event",{ec:t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==i?"":i+" ")+a.version.sketch+"-"+t.plugin.identifier()+" ["+t.plugin.version()+"]",ea:t.command.identifier(),el:e})}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");