var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/settings")},function(e,t){e.exports=require("sketch/ui")},function(e,n,r){var i=r(1),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,u="Sketch "+("NONAPPSTORE"==a?"":a+" ")+i.version.sketch;e.exports=function(e,t,n,r){var i,a={v:1,tid:e,ds:u,cid:o,t:t};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){a[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,n,r){"use strict";r.r(n);var i=r(0),o=r.n(i),a=r(1),u=r(2),s=r(1),l=o.a.getSelectedDocument();n.default=function(){var e,n,i,c,d=0,f=0,p=o.a.find("SymbolMaster"),m=p.filter((function(e){return-1!==e.name.indexOf("Link")&&-1!==e.name.indexOf("Bridge")})),g=[];m.forEach((function(e){f+=1,g.push(e.name+" ["+f+"]")})),u.getInputFromUser("Choose [Link/From-Bridge] Symbol Master",{type:u.INPUT_TYPE.selection,possibleValues:g},(function(t,n){t||(e=m[g.findIndex((function(e){return e===n}))])})),void 0!==e&&e.getAllInstances().forEach((function(t){var n;if(t.overrides[0].value!==e.layers[0].symbolId?(n=t.overrides[0].value,s.setLayerSettingForKey(t,"LinkOriginalMasterId",n)):void 0!==s.layerSettingForKey(t,"LinkOriginalMasterId")?n=s.layerSettingForKey(t,"LinkOriginalMasterId"):(n=p.find((function(e){return e.name===t.overrides[1].value})).symbolId,s.setLayerSettingForKey(t,"LinkOriginalMasterId",n)),void 0!==n){var r=l.getSymbolMasterWithID(n);if(t.parent.layers.filter((function(e){return e.id!==t.id})).forEach((function(e){return e.remove()})),"Artboard"!==t.parent.type&&"SymbolMaster"!==t.parent.type||(t.parent.frame.width=r.frame.width,t.parent.frame.height=r.frame.height),r.layers.forEach((function(e){e.duplicate().parent=t.parent})),"Group"===t.parent.type){t.parent.frame.x=0,t.parent.frame.y=0;for(var i=o.a.find("Group",t.getParentArtboard()),a=0;a<i.length;a++)i.forEach((function(e){return e.adjustToFit()}))}t.index=0,t.overrides[0].value=e.overrides[0].value,t.overrides[1].value=r.name,t.name="⚙️LinkFrom: "+r.name,t.frame.width=.1,t.frame.height=.1,t.frame.x=t.parent.frame.width/2,t.frame.y=t.parent.frame.height/2,t.locked=!0,t.hidden=!0}d+=1})),o.a.UI.message("Succeed In Linking "+d+" Symbol(s)"),n="NormalResult",i=r(3),c=MSApplicationMetadata.metadata().variant,i("UA-169300937-3","event",{ec:t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==c?"":c+" ")+a.version.sketch+"-"+t.plugin.identifier()+" ["+t.plugin.version()+"] ",ea:t.command.identifier(),el:n})}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");