var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,n){e.exports=require("sketch/dom")},function(e,t,r){var i=r(1),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,u="Sketch "+("NONAPPSTORE"==a?"":a+" ")+i.version.sketch;e.exports=function(e,n,t,r){var i,a={v:1,tid:e,ds:u,cid:o,t:n};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){a[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t,r){"use strict";r.r(t);var i=r(0),o=r.n(i),a=r(2).getLibraries(),u=o.a.getSelectedDocument(),l=r(1),s=r(1);t.default=function(){var e,t,i;!function(e){l.sessionVariable("ReadSymbolInfo")||l.setSessionVariable("ReadSymbolInfo",{JudgeSymbolId:null,ThisIndex:null});var n,t,r,i,s=l.sessionVariable("ReadSymbolInfo"),c=u.selectedLayers.layers.filter((function(e){return"SymbolInstance"===e.type})),d=c[0].symbolId;if(-1!==c.findIndex((function(e){return e.symbolId!==d})))o.a.UI.message("Please Select Symbol With Same Master");else if(c[0].master.getLibrary()){var f=a.find((function(e){return e.name===c[0].master.getLibrary().name})).getImportableSymbolReferencesForDocument(u);n=d===s.JudgeSymbolId?s.ThisIndex:f.findIndex((function(e){return e.import().symbolId===d})),e>0?(e>f.length&&(e-=f.length),n+e>=f.length&&(n-=f.length)):(-e>f.length&&(e=-(-e-f.length)),n+e<0&&(n=f.length-n)),t=f[n+e].import()}else{var g=o.a.find('[type="SymbolMaster"]');n=d===s.JudgeSymbolId?s.ThisIndex:g.findIndex((function(e){return e.symbolId===d})),e>0?(e>g.length&&(e-=g.length),n+e>=g.length&&(n-=g.length)):(-e>g.length&&(e=-(-e-g.length)),n+e<0&&(n=g.length-n)),t=g[n+e]}o.a.UI.message(t.name),c.forEach((function(e){return e.master=t})),r=t.symbolId,i=n+e,l.setSessionVariable("ReadSymbolInfo",{JudgeSymbolId:r,ThisIndex:i})}(1),e="",t=r(3),i=MSApplicationMetadata.metadata().variant,t("UA-169300937-3","event",{ec:n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==i?"":i+" ")+s.version.sketch+"-"+n.plugin.identifier()+" ["+n.plugin.version()+"]",ea:n.command.identifier(),el:e})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");