var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=3)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/settings")},function(e,n,r){var o=r(1),i=null;(i=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(i=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(i,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,s="Sketch "+("NONAPPSTORE"==a?"":a+" ")+o.version.sketch;e.exports=function(e,t,n,r){var o,a={v:1,tid:e,ds:s,cid:i,t:t};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){a[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),o=MOPointer.alloc().init(),i=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,o);return i?NSString.alloc().initWithData_encoding(i,NSUTF8StringEncoding):o.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(o=a,Object.keys(o).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(o[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,n,r){"use strict";r.r(n),r.d(n,"autoRefreshHandler",(function(){return p})),r.d(n,"autoRefreshHandlerSave",(function(){return g})),r.d(n,"artboardBrowse",(function(){return m}));var o=r(0),i=r.n(o);var a=r(1),s=i.a.getSelectedDocument(),l=(s.selectedLayers.layers,function(e){var n=r(2),o=MSApplicationMetadata.metadata().variant;n("UA-169300937-3","event",{ec:t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==o?"":o+" ")+a.version.sketch+"-"+t.plugin.identifier()+" ["+t.plugin.version()+"]",ea:t.command.identifier(),el:e})}),u=i.a.getSelectedDocument(),c=r(1).sessionVariable("autoRefreshKey"),d=u.selectedLayers.layers,f=0;if(d.length>0)for(var h=0;0==f&&h<d.length;h++)"Artboard"!==(f=d[h].getParentArtboard()||d[h]).type&&(f=0);n.default=function(){"Auto refresh @2x"===c||"Refresh when saving document @2x"===c?m(f,"AutoRefreshing",!1,2):"Auto refresh @1x"===c||"Refresh when saving document @1x"===c?m(f,"AutoRefreshing",!1,1):m(f,f.name,!0,2),l(":-)")};function p(){"Auto refresh @2x"===c?(b(2),l("autoRefresh@2x"),console.log(c),console.log("auto2")):"Auto refresh @1x"===c&&(b(1),l("autoRefresh@1x"),console.log(c),console.log("auto1"))}function g(){"Refresh when saving document @2x"===c?(b(2),l("saveRefresh@2x"),console.log(c),console.log("save2")):"Refresh when saving document @1x"===c&&(b(1),l("saveRefresh@1x"),console.log(c),console.log("save1"))}function m(e,t,n,r){if(0===e)i.a.UI.message("Please Select 1 Artboard");else{var o=t;o=o.replace(/['|'|/|#|.|\\|"|"]/g,"");var a=NSTemporaryDirectory()+o+".png";u.sketchObject.saveArtboardOrSlice_toFile(y(e,r),a);var s=NSString.stringWithString_("<html>            <head><meta charset='UTF-8'></head><body id='"+n+"'>            <img id='mainImg' width="+e.sketchObject.frame().width()+" src='./"+o+".png' center top no-repeat;'>            <div id='refreshBlock' onClick='refreshBlock()'>Stop Refreshing</div>            </body>            <style type='text/css'>            body {                text-align: center;                margin: 0;                padding: 0;                background:"+("rgba("+(255*(d=e.sketchObject.backgroundColor()).red()).toFixed(0)+","+(255*d.green()).toFixed(0)+","+(255*d.blue()).toFixed(0)+","+d.alpha().toFixed(2)+");}            body::-webkit-scrollbar {                display: none;}            #refreshBlock {                opacity: .3;                position: fixed;                right: 20px;                bottom: 10px;                background: rgba(0, 0, 0, .8);                border-radius: 100px;                font-family: sans - serif;                font-size: 12px;                padding: 1px 8px;                color: white;                cursor: pointer;                user-select: none;}            #refreshBlock:hover {opacity: .9;                transition: .25s;}            </style>            <script>            let stopRefreshKey = JSON.parse(document.getElementsByTagName('body')[0].id);            if (stopRefreshKey == true) {document.getElementById('refreshBlock').remove();};            function workLoop(deadline) {                if (stopRefreshKey == false && deadline.timeRemaining() > 1 && document.visibilityState == 'visible') {                    document.getElementById('mainImg').src=document.getElementById('mainImg').src+'?t='+Math.random();                };                setTimeout('window.requestIdleCallback(workLoop)',1000);            };            window.requestIdleCallback(workLoop);            let refreshBlock = function() {                if (stopRefreshKey == false) { stopRefreshKey = true; document.getElementById('refreshBlock').innerHTML='Continue To Refresh';}                else { location.reload()                    /*stopRefreshKey = false; window.requestIdleCallback(workLoop); document.getElementById('refreshBlock').innerHTML='Stop Refreshing';*/};            };            <\/script>            </html>")),l=NSTemporaryDirectory()+o+".html";s.dataUsingEncoding_(NSUTF8StringEncoding).writeToFile_atomically_(l,!0);var c=NSURL.fileURLWithPath(l);NSWorkspace.sharedWorkspace().openFile(c.path())}var d}function b(e){if(0!==f){var t="AutoRefreshing";t=t.replace(/['|'|/|#|.|\\|"|"]/g,"");var n=NSTemporaryDirectory()+t+".png";u.sketchObject.saveArtboardOrSlice_toFile(y(f,e),n),i.a.UI.message("Browser Preview Refreshing")}}function y(e,t){var n=e.sketchObject.absoluteInfluenceRect(),r=MSExportRequest.new();return r.rect=n,r.scale=t,r}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default"),globalThis.autoRefreshHandlerSave=__skpm_run.bind(this,"autoRefreshHandlerSave"),globalThis.autoRefreshHandler=__skpm_run.bind(this,"autoRefreshHandler"),globalThis.autoRefreshHandler=__skpm_run.bind(this,"autoRefreshHandler"),globalThis.autoRefreshHandler=__skpm_run.bind(this,"autoRefreshHandler"),globalThis.autoRefreshHandler=__skpm_run.bind(this,"autoRefreshHandler"),globalThis.autoRefreshHandler=__skpm_run.bind(this,"autoRefreshHandler"),globalThis.autoRefreshHandler=__skpm_run.bind(this,"autoRefreshHandler");