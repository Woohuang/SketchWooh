var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/dom")},function(e,t){e.exports=require("path")},function(e,t,n){var r=n(4),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid"))||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var i=MSApplicationMetadata.metadata().variant,a="Sketch "+("NONAPPSTORE"==i?"":i+" ")+r.version.sketch;e.exports=function(e,t,n,r){var i,s={v:1,tid:e,ds:a,cid:o,t:t};return"undefined"!=typeof __command&&(s.an=__command.pluginBundle().name(),s.aid=__command.pluginBundle().identifier(),s.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){s[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),o=MOPointer.alloc().init(),i=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,o);return i?NSString.alloc().initWithData_encoding(i,NSUTF8StringEncoding):o.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=s,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t){e.exports=require("sketch/settings")},function(e,n,r){"use strict";r.r(n);var o=r(0),i=r.n(o),a=r(1).Document,s=i.a.getSelectedDocument(),u=r(2);Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e};var c=(new Date).format("yyyy-MM-dd hh:mm:ss");n.default=function(){if(void 0!==s.path){var e=s.path.replace(),n=u.basename(e),o="Backup_"+n.replace(".sketch","【"+c+"】.sketch"),l=decodeURI(e.replace(n,o));s.save(l,{saveMode:a.SaveMode.SaveTo}),i.a.UI.message("Succeed In Backup  At "+c)}else i.a.UI.message("请先保存文档"),s.save();var d,f,p;d="NormalResult",f=r(3),p=MSApplicationMetadata.metadata().variant,f("UA-169300937-2","event",{ec:"Sketch "+("NONAPPSTORE"==p?"":p+" ")+Settings.version.sketch,ea:t.plugin.identifier()+" [v"+t.plugin.version()+"] "+t.command.identifier(),el:d})}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");