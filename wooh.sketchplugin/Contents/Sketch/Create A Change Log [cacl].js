var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=5)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/dom")},function(e,t){e.exports=require("sketch/settings")},function(e,t){e.exports=require("sketch/ui")},function(e,t,n){var r=n(2),i=null;(i=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid"))||(i=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(i,"google.analytics.uuid"));var o=MSApplicationMetadata.metadata().variant,a="Sketch "+("NONAPPSTORE"==o?"":o+" ")+r.version.sketch;e.exports=function(e,t,n,r){var o,s={v:1,tid:e,ds:a,cid:i,t:t};return"undefined"!=typeof __command&&(s.an=__command.pluginBundle().name(),s.aid=__command.pluginBundle().identifier(),s.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){s[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(o=s,Object.keys(o).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(o[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,n,r){"use strict";r.r(n);var i=r(0),o=r.n(i),a=r(1).Page,s=r(1).Group,u=r(3),c=o.a.Text,l=o.a.getSelectedDocument(),d=l.selectedLayers.layers,f=r(2);Date.prototype.format=function(e){var t={"M+":this.getMonth()+1,"d+":this.getDate(),"h+":this.getHours(),"m+":this.getMinutes(),"s+":this.getSeconds(),"q+":Math.floor((this.getMonth()+3)/3),S:this.getMilliseconds()};for(var n in/(y+)/.test(e)&&(e=e.replace(RegExp.$1,(this.getFullYear()+"").substr(4-RegExp.$1.length))),t)new RegExp("("+n+")").test(e)&&(e=e.replace(RegExp.$1,1==RegExp.$1.length?t[n]:("00"+t[n]).substr((""+t[n]).length)));return e};var g=(new Date).format("yyyy-MM-dd"),p=(new Date).format("yyyy-MM-dd hh:mm:ss");n.default=function(){var e,n,i,m,h;-1===l.pages.findIndex((function(e){return"🗞️ChangeLog"===e.name}))&&((e=new a({name:"🗞️ChangeLog"})).parent=l),-1===(e=l.pages.find((function(e){return"🗞️ChangeLog"===e.name}))).layers.findIndex((function(e){return e.name===g}))&&(n=new s({name:g}),i=0===e.layers.length?0:e.layers[0].frame.y+e.layers[0].frame.height+50,n.parent=e,n.index=0,n.frame.x=0,n.frame.y=i,n.frame.width=0,n.frame.height=0),n=e.layers[0];for(var y,S,b,v=new String,x=new String,U=0,_=0,R=d.length;_<R;_++)"Artboard"===d[_].type?(m=d[_].name,h=d[_].id):"Artboard"===d[_].getParentArtboard().type?(m=d[_].getParentArtboard().name,h=d[_].getParentArtboard().id):(m=void 0,h=void 0),-1===v.indexOf(m)&&(v=v+"\n"+(U+=1)+"."+m,x=x+"_next_"+h);U>0?u.getInputFromUser("已选中"+U+"个画板:"+v,{initialValue:"Enter Change Log",numberOfLines:3},(function(e,t){if(!e){var r=new c({text:"⌨️ 更新说明：\n"+t+"\n🖱️ 关联页面:"+v,parent:n});r.name=p,r.frame.x=0,r.frame.y=n.frame.height+20,r.index=0,r=n.layers[0],f.setLayerSettingForKey(r,"ArtboardIds",x),n.adjustToFit(),o.a.UI.message("Succeed In Logging")}})):o.a.UI.message("请至少选中1个画板");y="NormalResult",S=r(4),b=MSApplicationMetadata.metadata().variant,S("UA-169300937-2","event",{ec:"Sketch "+("NONAPPSTORE"==b?"":b+" ")+Settings.version.sketch,ea:t.plugin.identifier()+" [v"+t.plugin.version()+"] "+t.command.identifier(),el:y})}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");