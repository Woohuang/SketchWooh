var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/dom")},function(e,n,t){var r=t(3),i=null;(i=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid"))||(i=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(i,"google.analytics.uuid"));var o=MSApplicationMetadata.metadata().variant,a="Sketch "+("NONAPPSTORE"==o?"":o+" ")+r.version.sketch;e.exports=function(e,n,t,r){var o,u={v:1,tid:e,ds:a,cid:i,t:n};return"undefined"!=typeof __command&&(u.an=__command.pluginBundle().name(),u.aid=__command.pluginBundle().identifier(),u.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){u[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(o=u,Object.keys(o).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(o[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,n){e.exports=require("sketch/settings")},function(e,t,r){"use strict";r.r(t);var i=r(0),o=r.n(i),a=o.a.getSelectedDocument(),u=r(1).Page;t.default=function(){var e,t,i,c=0,s=0,l=0,d=a.selectedPage;if(-1!==a.pages.findIndex((function(e){return"Sync: 将新的同名画板复制到这里"===e.name||"Sync: 剩余画板不存在或存在多个同名匹配项"===e.name||"Sync: done!"===e.name}))){var f=a.pages.find((function(e){return"Sync: 将新的同名画板复制到这里"===e.name||"Sync: 剩余画板不存在或存在多个同名匹配项"===e.name||"Sync: done!"===e.name})),m=f.layers;d.id!==f.id?(m.forEach((function(e){var n=d.layers.filter((function(n){return n.name===e.name})).length,t=d.layers.findIndex((function(n){return n.name===e.name}));1===n?(d.layers[t].layers=e.layers,d.layers[t].selected=!0,d.layers[t].frame.height=e.frame.height,d.layers[t].frame.width=e.frame.width,e.remove(),c+=1):n>1?l=1:s=1})),0===c?o.a.UI.message("Fail In Syncing"):c>=1&&o.a.UI.message("Succeed In Syncing "+c+" Artboards"),f.name=1===l||1===s?"Sync: 剩余画板不存在或存在多个同名匹配项":"Sync: done!"):o.a.UI.message("请切换到待同步页面")}else{new u({name:"Sync: 将新的同名画板复制到这里"}).parent=a,o.a.UI.message("请将新的同名画板复制到Sync页")}e="NormalResult",t=r(2),i=MSApplicationMetadata.metadata().variant,t("UA-169300937-2","event",{ec:"Sketch "+("NONAPPSTORE"==i?"":i+" ")+Settings.version.sketch,ea:n.plugin.identifier()+" [v"+n.plugin.version()+"] "+n.command.identifier(),el:e})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");