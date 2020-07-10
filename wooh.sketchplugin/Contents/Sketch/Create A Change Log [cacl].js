var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/settings")},function(e,t){e.exports=require("sketch/dom")},function(e,t){e.exports=require("sketch/ui")},function(e,n,r){var i=r(1),a=null;(a=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(a=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(a,"google.analytics.uuid"));var o=MSApplicationMetadata.metadata().variant,s="Sketch "+("NONAPPSTORE"==o?"":o+" ")+i.version.sketch;e.exports=function(e,t,n,r){var i,o={v:1,tid:e,ds:s,cid:a,t:t};return"undefined"!=typeof __command&&(o.an=__command.pluginBundle().name(),o.aid=__command.pluginBundle().identifier(),o.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){o[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),a=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,i);return a?NSString.alloc().initWithData_encoding(a,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=o,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,n,r){"use strict";r.r(n);var i=r(0),a=r.n(i),o=r(1),s=r(2).Page,u=r(2).Group,l=r(3),c=a.a.Text,d=a.a.getSelectedDocument(),f=d.selectedLayers.layers,g=r(1);Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e};var p=(new Date).format("yyyy-MM-dd"),h=(new Date).format("yyyy-MM-dd hh:mm:ss");n.default=function(){var e,n,i,m,y;-1===d.pages.findIndex((function(e){return"🗞️ChangeLog"===e.name}))&&((e=new s({name:"🗞️ChangeLog"})).parent=d),-1===(e=d.pages.find((function(e){return"🗞️ChangeLog"===e.name}))).layers.findIndex((function(e){return e.name===p}))&&(n=new u({name:p}),i=0===e.layers.length?0:e.layers[0].frame.y+e.layers[0].frame.height+50,n.parent=e,n.index=0,n.frame.x=0,n.frame.y=i,n.frame.width=0,n.frame.height=0),n=e.layers[0];for(var S,b,v,x=new String,U=new String,_=0,R=0,M=f.length;R<M;R++)"Artboard"===f[R].type?(m=f[R].name,y=f[R].id):"Artboard"===f[R].getParentArtboard().type?(m=f[R].getParentArtboard().name,y=f[R].getParentArtboard().id):(m=void 0,y=void 0),-1===x.indexOf(m)&&(x=x+"\n"+(_+=1)+"."+m,U=U+"_next_"+y);_>0?l.getInputFromUser("Selected "+_+" Artboard(s):"+x,{initialValue:"Enter Change Log",numberOfLines:3},(function(e,t){if(!e){var r=new c({text:"⌨️ Log:\n"+t+"\n🖱️ Pages:"+x,parent:n});r.name=h,r.frame.x=0,r.frame.y=n.frame.height+20,r.index=0,r=n.layers[0],g.setLayerSettingForKey(r,"ArtboardIds",U),n.adjustToFit(),a.a.UI.message("Succeed In Logging")}})):a.a.UI.message("Please Select At Least 1 Artboard");S="NormalResult",b=r(4),v=MSApplicationMetadata.metadata().variant,b("UA-169300937-3","event",{ec:t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"Skth"+("NONAPPSTORE"==v?"":v+" ")+o.version.sketch+"-"+t.plugin.identifier()+" ["+t.plugin.version()+"]",ea:t.command.identifier(),el:S})}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");