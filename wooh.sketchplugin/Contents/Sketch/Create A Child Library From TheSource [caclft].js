var globalThis=this,global=this;function __skpm_run(e,t){globalThis.context=t;try{var n=function(e){var t={};function n(r){if(t[r])return t[r].exports;var i=t[r]={i:r,l:!1,exports:{}};return e[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var i in e)n.d(r,i,function(t){return e[t]}.bind(null,i));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=6)}([function(e,t){e.exports=require("sketch")},function(e,t){e.exports=require("sketch/dom")},function(e,t){e.exports=require("sketch/settings")},function(e,t){var n={chooseFile:function(e){var t=NSOpenPanel.openPanel();if(t.setCanChooseDirectories(!1),t.setCanChooseFiles(!0),t.setCanCreateDirectories(!1),t.setAllowedFileTypes(e),t.runModal()==NSModalResponseOK)return t.URL().path()},chooseFolder:function(){var e=NSOpenPanel.openPanel();if(e.setCanChooseDirectories(!0),e.setCanChooseFiles(!1),e.setCanCreateDirectories(!0),e.runModal()==NSModalResponseOK)return e.URL().path()},savePanel:function(e){var t=NSSavePanel.savePanel();if(e&&t.setNameFieldStringValue(e),t.setCanCreateDirectories(!0),t.runModal()==NSModalResponseOK)return t.URL().path()},textsFromFile:function(e){for(var t,n=[],r=NSString.stringWithContentsOfFile_encoding_error(e,NSUTF8StringEncoding,nil).componentsSeparatedByCharactersInSet(NSCharacterSet.newlineCharacterSet()).objectEnumerator();t=r.nextObject();)t.length()>0&&n.push(String(t));return n},imagesFromFolder:function(e){var t=[],n=["png","jpg","jpeg","tif","tiff","gif","webp","bmp"],r=NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(e,nil);return(r=r.sortedArrayUsingSelector("localizedStandardCompare:")).forEach((function(r){-1!=n.indexOf(String(r.pathExtension().lowercaseString()))&&t.push(e+"/"+r)})),t},textsFromChooseFile:function(){var e=n.chooseFile(["text","txt"]);return e==nil?[]:n.textsFromFile(e)},imagesFromChooseFolder:function(){var e=n.chooseFolder();return e==nil?[]:n.imagesFromFolder(e)},readStringFromFile:function(e){var t=MOPointer.alloc().init(),n=NSString.stringWithContentsOfFile_encoding_error(e,NSUTF8StringEncoding,t);if(null==t.value())return String(n)},writeStringToFile:function(e,t){var n=MOPointer.alloc().init();return NSString.stringWithString(e).writeToFile_atomically_encoding_error(t,!0,NSUTF8StringEncoding,n),n.value()},showInFinder:function(e){var t=MOPointer.alloc().init();NSFileManager.defaultManager().attributesOfItemAtPath_error(e,t).isDirectory()?NSWorkspace.sharedWorkspace().openFile_withApplication(e,"Finder"):NSWorkspace.sharedWorkspace().selectFile_inFileViewerRootedAtPath(e,nil)},mkdir:function(e){return NSFileManager.defaultManager().createDirectoryAtPath_withIntermediateDirectories_attributes_error_(e,!0,nil,nil)},getSubFolders:function(e){for(var t=NSFileManager.defaultManager().contentsOfDirectoryAtPath_error(e,nil),n=[],r=0;r<t.count();r++)n.push(String(t.objectAtIndex(r)));return n},getAppPath:function(){return String(NSBundle.mainBundle().bundlePath())},fileExists:function(e){return NSFileManager.defaultManager().fileExistsAtPath(e)}};e.exports=n},function(e,t){e.exports=require("sketch/ui")},function(e,n,r){var i=r(2),o=null;(o=NSUserDefaults.standardUserDefaults().objectForKey("google.analytics.uuid")+"-"+t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex(e=>"Users"===e)+1])||(o=NSUUID.UUID().UUIDString(),NSUserDefaults.standardUserDefaults().setObject_forKey(o,"google.analytics.uuid"));var a=MSApplicationMetadata.metadata().variant,s="Sketch "+("NONAPPSTORE"==a?"":a+" ")+i.version.sketch;e.exports=function(e,t,n,r){var i,a={v:1,tid:e,ds:s,cid:o,t:t};return"undefined"!=typeof __command&&(a.an=__command.pluginBundle().name(),a.aid=__command.pluginBundle().identifier(),a.av=__command.pluginBundle().version()),n&&Object.keys(n).forEach((function(e){a[e]=n[e]})),function(e,t){if(e){if(t&&t.makeRequest)return t.makeRequest(e);if(t&&t.debug){var n=NSURLRequest.requestWithURL(e),r=MOPointer.alloc().init(),i=MOPointer.alloc().init(),o=NSURLConnection.sendSynchronousRequest_returningResponse_error(n,r,i);return o?NSString.alloc().initWithData_encoding(o,NSUTF8StringEncoding):i.value()}NSURLSession.sharedSession().dataTaskWithURL(e).resume()}}(NSURL.URLWithString("https://www.google-analytics.com/"+(r&&r.debug?"debug/":"")+"collect?"+(i=a,Object.keys(i).map((function(e){return encodeURIComponent(e)+"="+encodeURIComponent(i[e])})).join("&")+"&z=")+NSUUID.UUID().UUIDString()),r)}},function(e,n,r){"use strict";r.r(n);var i=r(0),o=r.n(i),a=r(2),s=r(3),l=r(1).Page,u=r(1).Document,c=r(4),d=r(1).SymbolMaster;n.default=function(){var e=0;o.a.UI.alert("First Step","Choose TheSource.sketch");var n=s.chooseFile(["sketch"]);if(n){var i=NSURL.fileURLWithPath(n),f=MOPointer.alloc().init(),g=MSDocument.alloc().init();g.readFromURL_ofType_error(i,"com.bohemiancoding.sketch.drawing",f);var p=o.a.fromNative(g),h=new u;h.sharedTextStyles=p.sharedTextStyles,h.sharedLayerStyles=p.sharedLayerStyles,h.colors=p.colors,l.createSymbolsPage().parent=h;var S,m=new d({name:"Custom/👇Creat Your Own Symbols In This Page"});m.parent=l.getSymbolsPage(h),m.frame.width=20,m.frame.height=20,h.pages.splice(0,1);for(var v=0,y=p.pages.length;v<y;v++)h.pages.push(p.pages[0]);h.pages=h.pages.push(new l({name:"CustomStyles"}),new l({name:"IrregularTxtStyles"})),l.getSymbolsPage(h).name="Custom",o.a.UI.alert("Second Step","Choose a folder to save it");var F,U,_,b=s.chooseFolder(["sketch"]);if(b)c.getInputFromUser("Enter New Library Name",{initialValue:"ChildLibrary"},(function(t,n){t||(S=b+"/TS_"+n+".sketch",h.save(S,{saveMode:u.SaveMode.SaveAs}),o.a.UI.message("Succeed In Creating"),e=1)})),0===e&&o.a.UI.message("Fail In Creating"),F="NormalResult",U=r(5),_=MSApplicationMetadata.metadata().variant,U("UA-169300937-3","event",{ec:t.plugin.url().path().split("/")[t.plugin.url().path().split("/").findIndex((function(e){return"Users"===e}))+1]+"-Skth"+("NONAPPSTORE"==_?"":_+" ")+a.version.sketch+"-"+t.plugin.identifier()+" ["+t.plugin.version()+"] ",ea:t.command.identifier(),el:F})}}}]);if("default"===e&&"function"==typeof n)n(t);else{if("function"!=typeof n[e])throw new Error('Missing export named "'+e+'". Your command should contain something like `export function " + key +"() {}`.');n[e](t)}}catch(r){if("undefined"==typeof process||!process.listenerCount||!process.listenerCount("uncaughtException"))throw r;process.emit("uncaughtException",r,"uncaughtException")}}globalThis.onRun=__skpm_run.bind(this,"default");