var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var a=n[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,t),a.l=!0,a.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var a in e)t.d(r,a,function(n){return e[n]}.bind(null,a));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=3)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,t,r){var a=r(1),i=null;(i=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(i=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(i,"google.analytics.uuid"));var s=MSApplicationMetadata.metadata().variant,o="Sketch "+("NONAPPSTORE"==s?"":s+" ")+a.version.sketch;e.exports=function(e,n,t,r){var a,s={v:1,tid:e,ds:o,cid:i,t:n};return"undefined"!=typeof __command&&(s.an=__command.pluginBundle().name(),s.aid=__command.pluginBundle().identifier(),s.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){s[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),a=MOPointer.alloc().init(),i=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,r,a);return i?NSString.alloc().initWithData_encoding(i,NSUTF8StringEncoding):a.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(a=s,Object.keys(a).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(a[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t,r){"use strict";r.r(t);var a=r(0),i=r.n(a),s=r(1),o=i.a.getSelectedDocument().selectedLayers.layers;t.default=function(){var e=0,t=0,a=0,l=0,u=0,f=o.filter((function(e){return"SymbolMaster"===e.type}));0===f.length&&(f=i.a.find("SymbolMaster").filter((function(e){return-1!==e.name.indexOf("lobal")&&-1!==e.name.indexOf("⚙️")}))),i.a.find("SymbolMaster").filter((function(e){return-1!==e.name.indexOf("lobal")&&-1!==e.name.indexOf("⚙️")})).forEach((function(e){e.getAllInstances().forEach((function(e){"SymbolMaster"===e.parent.type&&1===e.parent.layers.length&&f.splice(0,0,e.parent)}))})),f.length>0&&(e=1);var c,d,y,p=f.filter((function(e){return"ShapePath"===e.layers[0].type?-1!==e.layers[0].name.indexOf("adius")||-1!==e.layers[0].name.indexOf("圆角"):"SymbolInstance"===e.layers[0].type?-1!==e.layers[0].master.layers[0].name.indexOf("adius")||-1!==e.layers[0].master.layers[0].name.indexOf("圆角"):void 0})),m=f.filter((function(e){return"ShapePath"===e.layers[0].type?-1!==e.layers[0].name.indexOf("hadow")||-1!==e.layers[0].name.indexOf("投影")||-1!==e.layers[0].name.indexOf("阴影"):"SymbolInstance"===e.layers[0].type?-1!==e.layers[0].master.layers[0].name.indexOf("hadow")||-1!==e.layers[0].master.layers[0].name.indexOf("投影")||-1!==e.layers[0].master.layers[0].name.indexOf("阴影"):void 0}));p.forEach((function(n){e=1;var r=null;n.layers.length>0&&("SymbolInstance"===n.layers[0].type?void 0!==n.layers[0].master.layers[0]&&void 0!==n.layers[0].master.layers[0].points&&(r=n.layers[0].master.layers[0].points[0].cornerRadius,t=1):"ShapePath"===n.layers[0].type&&(r=n.layers[0].points[0].cornerRadius,t=1),0===r&&(r=1e-5)),n.getAllInstances().forEach((function(e){var n=e;if("SymbolMaster"===e.parent.type&&1===e.parent.layers.length)n=e.master;else if("Group"===e.parent.type&&1===e.parent.layers.length&&1===e.getParentArtboard().layers.length);else{n.style.opacity=0,n.frame.width=.1,n.frame.height=.1,n.frame.x=n.parent.frame.width/2,n.frame.y=n.parent.frame.height/2,n.locked=!0,n.hidden=!0;var i,s=n.parent;if(s.layers.find((function(e){return-1!==e.name.indexOf("AutoStyle")}))&&"points"in(i=s.layers.find((function(e){return-1!==e.name.indexOf("AutoStyle")})))){if(1===t)if(i.points.find((function(e){return e.cornerRadius>0}))){i.points.forEach((function(e){0!==e.cornerRadius&&(e.cornerRadius=r)}));var o=i.points.findIndex((function(e){return e.cornerRadius>0}));i.points[o].cornerRadius=r+1e-5,l++}else i.points.forEach((function(e){e.cornerRadius=r})),i.points[0].cornerRadius=r+1e-5,l++;a=1}}}))})),m.forEach((function(e){var n=null;(e.layers.length>0&&("SymbolInstance"===e.layers[0].type?void 0!==e.layers[0].master.layers[0]&&(n=e.layers[0].master.layers[0].style.shadows):"ShapePath"===e.layers[0].type&&(n=e.layers[0].style.shadows,t=1)),n.length>0)&&e.getAllInstances().forEach((function(r){var i=r;if("SymbolMaster"===r.parent.type&&1===r.parent.layers.length)i=r.master;else if("Group"===r.parent.type&&1===r.parent.layers.length&&1===r.getParentArtboard().layers.length);else{e.getAllInstances().forEach((function(e){e.style.opacity=0,e.frame.width=.1,e.frame.height=.1,e.frame.x=e.parent.frame.width/2,e.frame.y=e.parent.frame.height/2,e.locked=!0,i.hidden=!0;var r,s=e.parent;s.layers.find((function(e){return-1!==e.name.indexOf("AutoStyle")}))&&(r=s.layers.find((function(e){return-1!==e.name.indexOf("AutoStyle")})),1===t&&(r.style.shadows=n,u+=1),a=1)}))}}))})),0===e?i.a.UI.message("Find No Global Radius or Shadow Artboard"):0===t?i.a.UI.message("未在 Global Artboard 内找到记录属性的形状图层"):0===a?i.a.UI.message("未找到需要同步的 AutoStyle 图层"):l+u===0?i.a.UI.message("同步 AutoStyle 图层属性时失败"):i.a.UI.message("Succeed In Syncing "+l+" Radius Layer(s) And "+u+" Shadows Layer(s)"),c=":-)",d=r(2),y=MSApplicationMetadata.metadata().variant,d("UA-169300937-3","event",{ec:n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==y?"":y+" ")+s.version.sketch+"-"+n.plugin.identifier()+" ["+n.plugin.version()+"]",ea:n.command.identifier(),el:c})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");