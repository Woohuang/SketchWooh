var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var r=function(e){var t={};function r(n){if(t[n])return t[n].exports;var i=t[n]={i:n,l:!1,exports:{}};return e[n].call(i.exports,i,i.exports,r),i.l=!0,i.exports}return r.m=e,r.c=t,r.d=function(e,t,n){r.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},r.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},r.t=function(e,t){if(1&t&&(e=r(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(r.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)r.d(n,i,function(t){return e[t]}.bind(null,i));return n},r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return r.d(t,"a",t),t},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r.p="",r(r.s=6)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/dom")},function(e,t){e.exports=require("sketch/settings")},function(e,t){var r={chooseFile:function(e){var t=NSOpenPanel.openPanel();if(t.setCanChooseDirectories(!1),t.setCanChooseFiles(!0),t.setCanCreateDirectories(!1),t.setAllowedFileTypes(e),t.runModal()==NSModalResponseOK)return t.URL().path()},chooseFolder:function(){var e=NSOpenPanel.openPanel();if(e.setCanChooseDirectories(!0),e.setCanChooseFiles(!1),e.setCanCreateDirectories(!0),e.runModal()==NSModalResponseOK)return e.URL().path()},savePanel:function(e){var t=NSSavePanel.savePanel();if(e&&t.setNameFieldStringValue(e),t.setCanCreateDirectories(!0),t.runModal()==NSModalResponseOK)return t.URL().path()},textsFromFile:function(e){for(var t,r=[],n=NSString.stringWithContentsOfFile_encoding_error(e,NSUTF8StringEncoding,nil).componentsSeparatedByCharactersInSet(NSCharacterSet.newlineCharacterSet()).objectEnumerator();t=n.nextObject();)t.length()>0&&r.push(String(t));return r},imagesFromFolder:function(e){var t=[],r=["png","jpg","jpeg","tif","tiff","gif","webp","bmp"],n=NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(e,nil);return(n=n.sortedArrayUsingSelector("localizedStandardCompare:")).forEach((function(n){-1!=r.indexOf(String(n.pathExtension().lowercaseString()))&&t.push(e+"/"+n)})),t},textsFromChooseFile:function(){var e=r.chooseFile(["text","txt"]);return e==nil?[]:r.textsFromFile(e)},imagesFromChooseFolder:function(){var e=r.chooseFolder();return e==nil?[]:r.imagesFromFolder(e)},readStringFromFile:function(e){var t=MOPointer.alloc().init(),r=NSString.stringWithContentsOfFile_encoding_error(e,NSUTF8StringEncoding,t);if(null==t.value())return String(r)},writeStringToFile:function(e,t){var r=MOPointer.alloc().init();return NSString.stringWithString(e).writeToFile_atomically_encoding_error(t,!0,NSUTF8StringEncoding,r),r.value()},showInFinder:function(e){var t=MOPointer.alloc().init();NSFileManager.defaultManager().attributesOfItemAtPath_error(e,t).isDirectory()?NSWorkspace.sharedWorkspace().openFile_withApplication(e,"Finder"):NSWorkspace.sharedWorkspace().selectFile_inFileViewerRootedAtPath(e,nil)},mkdir:function(e){return NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error_(e,!0,nil,nil)},getSubFolders:function(e){for(var t=NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(e,nil),r=[],n=0;n<t.count();n++)r.push(String(t.objectAtIndex(n)));return r},getAppPath:function(){return String(NSBundle.mainBundle().bundlePath())},fileExists:function(e){return NSFileManager.defaultManager().fileExistsAtPath(e)}};e.exports=r},function(e,t){e.exports=require("sketch/ui")},function(e,r,n){var i=n(2),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,s="Sketch "+("NONAPPSTORE"==a?"":a+" ")+i.version.sketch;e.exports=function(e,t,r,n){var i,a={v:1,tid:e,ds:s,cid:o,t:t};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),r&&Object.keys(r).forEach((function(e){a[e]=r[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var r=NSURLRequest.requestWithURL(e),n=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(r,n,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(n&&n.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),n)}},function(e,r,n){"use strict";n.r(r);var i=n(0),o=n.n(i),a=n(2),s=n(3),l=n(1).Page,u=n(1).Document,c=n(4),d=n(1).SymbolMaster;r.default=function(){var e=0;o.a.UI.alert("First Step","Choose TheSource.sketch");var r=s.chooseFile(["sketch"]);if(r){var i=NSURL.fileURLWithPath(r),f=MOPointer.alloc().init(),g=MSDocument.alloc().init();g.readFromURL_ofType_error(i,"com.bohemiancoding.sketch.drawing",f);var p=o.a.fromNative(g);TC_library.sharedTextStyles=p.sharedTextStyles,TC_library.sharedLayerStyles=p.sharedLayerStyles,TC_library.colors=p.colors,l.createSymbolsPage().parent=TC_library;var h,S=new d({name:"Custom/👇Creat Your Own Symbols In This Page"});S.parent=l.getSymbolsPage(TC_library),S.frame.width=20,S.frame.height=20,TC_library.pages.splice(0,1);for(var m=0,y=p.pages.length;m<y;m++)TC_library.pages.push(p.pages[0]);TC_library.pages=TC_library.pages.push(new l({name:"CustomStyles"}),new l({name:"IrregularTxtStyles"})),l.getSymbolsPage(TC_library).name="Custom",o.a.UI.alert("Second Step","Choose a folder to save it");var v,_,b,F=s.chooseFolder(["sketch"]);if(F)c.getInputFromUser("Enter New Library Name",{initialValue:"ChildLibrary"},(function(t,r){t||(h=F+"/TS_"+r+".sketch",TC_library.save(h,{saveMode:u.SaveMode.SaveAs}),o.a.UI.message("Succeed In Creating"),e=1)})),0===e&&o.a.UI.message("Fail In Creating"),v="NormalResult",_=n(5),b=MSApplicationMetadata.metadata().variant,_("UA-169300937-3","event",{ec:t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"Skth"+("NONAPPSTORE"==b?"":b+" ")+a.version.sketch+"-"+t.plugin.identifier()+" ["+t.plugin.version()+"]",ea:t.command.identifier(),el:v})}}}]);if("default"===e&&"function"==typeof r)r(t);else{if("function"!=typeof r[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');r[e](t)}}catch(n){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw n;process.emit("uncaughtException",n,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");