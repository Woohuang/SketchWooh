var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var o=n[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,t),o.l=!0,o.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var o in e)t.d(r,o,function(n){return e[n]}.bind(null,o));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,n){e.exports=require("sketch/dom")},function(e,t,r){var o=r(1),i=null;(i=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(i=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(i,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,u="Sketch "+("NONAPPSTORE"==a?"":a+" ")+o.version.sketch;e.exports=function(e,n,t,r){var o,a={v:1,tid:e,ds:u,cid:i,t:n};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){a[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),o=MOPointer.alloc().init(),i=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,r,o);return i?NSString.alloc().initWithData_encoding(i,NSUTF8StringEncoding):o.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(o=a,Object.keys(o).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(o[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t,r){"use strict";r.r(t);var o=r(0),i=r.n(o),a=r(2).getLibraries(),u=i.a.getSelectedDocument(),l=r(1),s=r(1);t.default=function(){var e,t,o;!function(e){l.sessionVariable("ReadSymbolInfo")||l.setSessionVariable("ReadSymbolInfo",{JudgeSymbolId:null,ThisIndex:null});var n,t,r,o,s=l.sessionVariable("ReadSymbolInfo"),c=u.selectedLayers.layers.filter((function(e){return"SymbolInstance"===e.type})),d=c[0].symbolId;if(-1!==c.findIndex((function(e){return e.symbolId!==d})))i.a.UI.message("Please Select Symbol With Same Master");else if(c[0].master.getLibrary()){var f=a.find((function(e){return e.name===c[0].master.getLibrary().name})).getImportableSymbolReferencesForDocument(u);n=d===s.JudgeSymbolId?s.ThisIndex:f.findIndex((function(e){return e.import().symbolId===d})),e>0?(e>f.length&&(e-=f.length),n+e>=f.length&&(n-=f.length)):(-e>f.length&&(e=-(-e-f.length)),n+e<0&&(n=f.length-n)),t=f[n+e].import()}else{var g=i.a.find('[type="SymbolMaster"]');n=d===s.JudgeSymbolId?s.ThisIndex:g.findIndex((function(e){return e.symbolId===d})),e>0?(e>g.length&&(e-=g.length),n+e>=g.length&&(n-=g.length)):(-e>g.length&&(e=-(-e-g.length)),n+e<0&&(n=g.length-n)),t=g[n+e]}i.a.UI.message(t.name),c.forEach((function(e){return e.master=t})),r=t.symbolId,o=n+e,l.setSessionVariable("ReadSymbolInfo",{JudgeSymbolId:r,ThisIndex:o})}(10),e="NormalResult",t=r(3),o=MSApplicationMetadata.metadata().variant,t("UA-169300937-3","event",{ec:n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==o?"":o+" ")+s.version.sketch+"-"+n.plugin.identifier()+" ["+n.plugin.version()+"]",ea:n.command.identifier(),el:e})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");