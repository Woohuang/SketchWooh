var globalThis=this,global=this;function __skpm_run(e,n){globalThis.context=n;try{var t=function(e){var n={};function t(r){if(n[r])return n[r].exports;var i=n[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,t),i.l=!0,i.exports}return t.m=e,t.c=n,t.d=function(e,n,r){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:r})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(t.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var i in e)t.d(r,i,function(n){return e[n]}.bind(null,i));return r},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=4)}([function(e,n){e.exports=require("sketch")},function(e,n){e.exports=require("sketch/settings")},function(e,n){e.exports=require("sketch/ui")},function(e,t,r){var i=r(1),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,u="Sketch "+("NONAPPSTORE"==a?"":a+" ")+i.version.sketch;e.exports=function(e,n,t,r){var i,a={v:1,tid:e,ds:u,cid:o,t:n};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),t&&Object.keys(t).forEach((function(e){a[e]=t[e]})),function(e,n){if(e){if(n&&n.makeRequest)return n.makeRequest(e);if(n&&n.debug){var t=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(t,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,t,r){"use strict";r.r(t);var i=r(0),o=r.n(i);var a=r(1),u=o.a.getSelectedDocument(),s=(u.selectedLayers.layers,r(1)),c=o.a.getSelectedDocument(),d=c.selectedLayers.layers,l=r(2);t.default=function(){var e,t,i,u,f=0,p=0,m=o.a.find("SymbolMaster").filter((function(e){return-1!==e.name.indexOf("Link")&&-1!==e.name.indexOf("Bridge")})),g=[];if(m.forEach((function(e){p+=1,g.push(e.name+" ["+p+"]")})),l.getInputFromUser("Choose The [Link/From-Bridge] Symbol Master",{type:l.INPUT_TYPE.selection,possibleValues:g},(function(n,t){n||(e=m[g.findIndex((function(e){return e===t}))])})),void 0!==e?p=1:o.a.UI.message("未找到正确的 [Link/From-Bridge] 组件 Master"),1===p){var h=[];d.forEach((function(e){"SymbolMaster"===e.type||"Artboard"===e.type?-1===h.findIndex((function(n){return n.id===e.id}))&&h.push(e):void 0!==e.getParentArtboard()&&-1!==h.findIndex((function(n){return n.id===e.getParentArtboard().id}))&&h.push(e.getParentArtboard())})),c.selectedLayers.clear(),h.forEach((function(n){var t=n.duplicate();t.name="⚙️LinkFrom: "+n.name,t.frame.x=n.frame.x+n.frame.width+2,t.selected=!0;var r=e.createNewInstance();r.parent=t,r.index=0,r.overrides[1].value=n.name,r.name="⚙️LinkFrom: "+n.name,r.frame.width=.1,r.frame.height=.1,r.frame.x=t.frame.width/2,r.frame.y=t.frame.height/2,r.locked=!0,r.hidden=!0,s.setLayerSettingForKey(r,"LinkOriginalMasterId",n.symbolId),f+=1})),0===f?o.a.UI.message("Fain In Duplicating"):f>0&&o.a.UI.message("Succeed In Duplicating "+f+" Artboard")}t=":-)",i=r(3),u=MSApplicationMetadata.metadata().variant,i("UA-169300937-3","event",{ec:n.plugin.url().path().split("/")[n.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==u?"":u+" ")+a.version.sketch+"-"+n.plugin.identifier()+" ["+n.plugin.version()+"]",ea:n.command.identifier(),el:t})}}]);if("default"===e&&"function"==typeof t)t(n);else{if("function"!=typeof t[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');t[e](n)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");