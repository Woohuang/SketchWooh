var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(o){if(n[o])return n[o].exports;var r=n[o]={i:o,l:!1,exports:{}};return e[o].call(r.exports,r,r.exports,t),r.l=!0,r.exports}return t.m=e,t.c=n,t.d=function(e,n,o){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:o})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var o=Object.create(null);if(t.r(o),Object.defineProperty(o,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var r in e)t.d(o,r,function(n){return e[n]}.bind(null,r));return o},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,n){e.exports=require("sketch/dom")},function(e,n,t){var o=t(1),r=null;(r=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid"))||(r=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(r,"google.analytics.uuid"));var i=MSApplicationMetadata.metadata().variant,a="Sketch "+("NONAPPSTORE"==i?"":i+" ")+o.version.sketch;e.exports=function(e,n,t,o){var i,u={v:1,tid:e,ds:a,cid:r,t:n};return"undefined"!=typeof __command&&(u.an=__command.pluginBundle().name(),u.aid=__command.pluginBundle().identifier(),u.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){u[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),o=MOPointer.alloc().init(),r=MOPointer.alloc().init(),i=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,o,r);return i?NSString.alloc().initWithData_encoding(i,NSUTF8StringEncoding):r.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(o&&o.debug?"debug/":"")+"collect?"+(i=u,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),o)}},function(e,t,o){"use strict";o.r(t);var r=o(0),i=o.n(r),a=o(2).getLibraries(),u=i.a.getSelectedDocument(),s=o(1),l=o(1);t.default=function(){var e,t,r;!function(e){s.sessionVariable("ReadSymbolInfo")||s.setSessionVariable("ReadSymbolInfo",{JudgeSymbolId:null,ThisIndex:null});var n,t,o,r,l=s.sessionVariable("ReadSymbolInfo"),c=u.selectedLayers.layers.filter((function(e){return"SymbolInstance"===e.type})),d=c[0].symbolId;if(-1!==c.findIndex((function(e){return e.symbolId!==d})))i.a.UI.message("Please Select Symbol With Same Master");else if(c[0].master.getLibrary()){var f=a.find((function(e){return e.name===c[0].master.getLibrary().name})).getImportableSymbolReferencesForDocument(u);n=d===l.JudgeSymbolId?l.ThisIndex:f.findIndex((function(e){return e.import().symbolId===d})),e>0?(e>f.length&&(e-=f.length),n+e>=f.length&&(n-=f.length)):(-e>f.length&&(e=-(-e-f.length)),n+e<0&&(n=f.length-n)),t=f[n+e].import()}else{var m=i.a.find('[type="SymbolMaster"]');n=d===l.JudgeSymbolId?l.ThisIndex:m.findIndex((function(e){return e.symbolId===d})),e>0?(e>m.length&&(e-=m.length),n+e>=m.length&&(n-=m.length)):(-e>m.length&&(e=-(-e-m.length)),n+e<0&&(n=m.length-n)),t=m[n+e]}i.a.UI.message(t.name),c.forEach((function(e){return e.master=t})),o=t.symbolId,r=n+e,s.setSessionVariable("ReadSymbolInfo",{JudgeSymbolId:o,ThisIndex:r})}(10),e="NormalResult",t=o(3),r=MSApplicationMetadata.metadata().variant,t("UA-169300937-3","event",{ec:"Sketch "+("NONAPPSTORE"==r?"":r+" ")+l.version.sketch+"-"+n.plugin.identifier()+" [v"+n.plugin.version()+"] ",ea:n.command.identifier(),el:e})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(o){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw o;process.emit("uncaughtException",o,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");