var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,n,t){var r=t(1),i=null;(i=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid"))||(i=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(i,"google.analytics.uuid"));var o=MSApplicationMetadata.metadata().variant,a="Sketch "+("NONAPPSTORE"==o?"":o+" ")+r.version.sketch;e.exports=function(e,n,t,r){var o,u={v:1,tid:e,ds:a,cid:i,t:n};return"undefined"!=typeof __command&&(u.an=__command.pluginBundle().name(),u.aid=__command.pluginBundle().identifier(),u.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){u[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(o=u,Object.keys(o).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(o[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t,r){"use strict";r.r(t);var i=r(0),o=r.n(i),a=o.a.getSelectedDocument(),u=r(1);t.default=function(){var e=o.a.find("Image").filter((function(e){return-1!==e.name.indexOf("Link_")})),t=[];a.pages.forEach((function(e){t=t.concat(e.layers)}));for(var i=[],c=function(n,t){-1===i.findIndex((function(t){return t===u.layerSettingForKey(e[n],"ArtboardId")}))&&i.splice(i.length,0,u.layerSettingForKey(e[n],"ArtboardId"))},s=0,l=e.length;s<l;s++)c(s);var f,d,g,p,m={formats:"jpg",output:!1,scales:1},h=0;i.forEach((function(n){if(-1!==(f=t.findIndex((function(e){return e.id===n})))){var r=t[f],i=o.a.export(r,m),a=o.a.createLayerFromData(i,"bitmap");e.filter((function(e){return u.layerSettingForKey(e,"ArtboardId")===n})).forEach((function(e){e.image=a.image,e.frame.width=r.frame.width,e.frame.height=r.frame.height,e.name="🧶Link_"+r.name,e.locked=!0,h+=1}))}else e.filter((function(e){return u.layerSettingForKey(e,"ArtboardId")===n})).forEach((function(e){-1===e.name.indexOf("💀Lose")&&(e.name="💀Lose"+e.name,e.locked=!0)}))})),0===h?o.a.UI.message("Fail In Syncing"):o.a.UI.message("Succeed In Syncing "+h+" layer(s)"),d="NormalResult",g=r(2),p=MSApplicationMetadata.metadata().variant,g("UA-169300937-2","event",{ec:"Sketch "+("NONAPPSTORE"==p?"":p+" ")+Settings.version.sketch,ea:n.plugin.identifier()+" [v"+n.plugin.version()+"] "+n.command.identifier(),el:d})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");