var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t){e.exports=require("sketch")},function(e,t,n){"use strict";n.r(t);var r=n(0),o=n.n(r),i=o.a.getSelectedDocument(),a=n(2);t.default=function(){var e=o.a.find("Image").filter((function(e){return-1!==e.name.indexOf("Link_")})),t=[];i.pages.forEach((function(e){t=t.concat(e.layers)}));for(var n=[],r=function(t,r){-1===n.findIndex((function(n){return n===a.layerSettingForKey(e[t],"ArtboardId")}))&&n.splice(n.length,0,a.layerSettingForKey(e[t],"ArtboardId"))},u=0,c=e.length;u<c;u++)r(u);var f,l={formats:"jpg",output:!1,scales:1},s=0;n.forEach((function(n){if(-1!==(f=t.findIndex((function(e){return e.id===n})))){var r=t[f],i=o.a.export(r,l),u=o.a.createLayerFromData(i,"bitmap");e.filter((function(e){return a.layerSettingForKey(e,"ArtboardId")===n})).forEach((function(e){e.image=u.image,e.frame.width=r.frame.width,e.frame.height=r.frame.height,e.name="🧶Link_"+r.name,e.locked=!0,s+=1}))}else e.filter((function(e){return a.layerSettingForKey(e,"ArtboardId")===n})).forEach((function(e){-1===e.name.indexOf("💀Lose")&&(e.name="💀Lose"+e.name,e.locked=!0)}))})),0===s?o.a.UI.message("Fail In Syncing"):o.a.UI.message("Succeed In Syncing "+s+" layer(s)")}},function(e,t){e.exports=require("sketch/settings")}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");