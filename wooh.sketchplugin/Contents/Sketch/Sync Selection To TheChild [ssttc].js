var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=5)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,n){e.exports=require("sketch/dom")},function(e,n){e.exports=require("path")},function(e,t,r){var i=r(1),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,s="Sketch "+("NONAPPSTORE"==a?"":a+" ")+i.version.sketch;e.exports=function(e,n,t,r){var i,a={v:1,tid:e,ds:s,cid:o,t:n};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){a[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t,r){"use strict";r.r(t);var i=r(0),o=r.n(i),a=r(1),s=r(2).Document.getDocuments(),u=r(3),c=o.a.getSelectedDocument(),l=c.selectedLayers.layers;t.default=function(){var e,t;e=s.find((function(e){return"TheSource"===u.basename(e.path).replace(".sketch","")})),t=s.filter((function(e){return-1!==u.basename(e.path).replace(".sketch","").indexOf("TS_")}));var i,d,f,p=0;void 0===e?o.a.UI.message("请先打开TheSource.sketch"):"TheSource"!==u.basename(c.path).replace(".sketch","")?o.a.UI.message("请切换到TheSource.sketch"):(e=c,t.length<=0?o.a.UI.message("请先打开1个同步的TS_子组件库"):t.length>1?o.a.UI.message("只能打开1个同步的TS_子组件库"):function(){for(var n=[],r=0,i=l.length;r<i;r++)"SymbolMaster"===l[r].type&&n.splice(n.length-1,0,l[r]);if(0===n.length)o.a.UI.message("Please Select The Symbol Need To Be Synchronized");else{var a=t[0],s=e.selectedPage,u=a.pages.find((function(e){return e.name===s.name}));if(void 0!==u)for(var c=function(e,t){var r=u.layers.findIndex((function(t){return t.symbolId===n[e].symbolId}));-1===r?(u.layers.splice(r,0,n[e]),p+=1):(u.layers.splice(r,1,n[e]),p+=1)},d=0,f=n.length;d<f;d++)c(d);p>0?o.a.UI.message("Succeed In Syncing "+p+" Symbol Master(s)"):o.a.UI.message("Fail In Syncing")}}()),i="",d=r(4),f=MSApplicationMetadata.metadata().variant,d("UA-169300937-3","event",{ec:n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==f?"":f+" ")+a.version.sketch+"-"+n.plugin.identifier()+" ["+n.plugin.version()+"]",ea:n.command.identifier(),el:i})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");