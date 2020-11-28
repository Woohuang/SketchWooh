import sketch from "sketch";
let settings = require("sketch/settings"),
    doc = sketch.getSelectedDocument(),
    selections = doc.selectedLayers.layers;

//copy string to pasteboard
export const copyStringToPasteboard = (item) => {
    let pasteboard = NSPasteboard.generalPasteboard();
    pasteboard.clearContents();
    pasteboard.writeObjects([item]);
};

//generate date string
export const dateFormat = () => {
    Date.prototype.format = function(fmt) {
        var o = {
            "M+": this.getMonth() + 1, //月份
            "d+": this.getDate(), //日
            "h+": this.getHours(), //小时
            "m+": this.getMinutes(), //分
            "s+": this.getSeconds(), //秒
            "q+": Math.floor((this.getMonth() + 3) / 3), //季度
            S: this.getMilliseconds(), //毫秒
        };

        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(
                RegExp.$1,
                (this.getFullYear() + "").substr(4 - RegExp.$1.length)
            );
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(fmt)) {
                fmt = fmt.replace(
                    RegExp.$1,
                    RegExp.$1.length == 1 ?
                    o[k] :
                    ("00" + o[k]).substr(("" + o[k]).length)
                );
            }
        }
        return fmt;
    };
};

//shortcut to change last or netx symbol instance
export const symbolLooper = (counts) => {
    //function: WriteSymbolInfo
    let WriteSymbolInfo = function(item1, item2, item3) {
        settings.setSessionVariable("ReadSymbolInfo", {
            JudgeSymbolId: item1,
            ThisIndex: item2,
        });
    };

    //判断是否有 WriteSymbolInfo 避免报错
    if (!settings.sessionVariable("ReadSymbolInfo")) {
        settings.setSessionVariable("ReadSymbolInfo", {
            JudgeSymbolId: null,
            ThisIndex: null,
        });
    }
    let ReadSymbolInfo = settings.sessionVariable("ReadSymbolInfo");
    let ThisIndex, symbolMaster, ThisLibrary;

    //获取选中的 symbol
    let SelectedSymbols = selections.filter(
        (item) => item.type === "SymbolInstance"
    );

    //判断是否同类 symbol
    let JudgeSymbolId, JudgeSymbolResult;
    if (SelectedSymbols.length !== 1) {
        JudgeSymbolId = SelectedSymbols[0].symbolId;
        JudgeSymbolResult = SelectedSymbols.findIndex(
            (item) => item.symbolId !== JudgeSymbolId
        );
    }
    if (JudgeSymbolResult !== -1) {
        sketch.UI.message("Please Select Symbol With Same Master");
    }

    //开始主要功能
    else {
        //所选为 library symbol 时
        ThisLibrary = SelectedSymbols[0].master.getLibrary();
        if (ThisLibrary) {
            let symbolReferences = ThisLibrary.getImportableSymbolReferencesForDocument(
                doc
            );

            //判断是否需要重新获取 ThisIndex
            if (JudgeSymbolId === ReadSymbolInfo.JudgeSymbolId) {
                ThisIndex = ReadSymbolInfo.ThisIndex;
            } else {
                ThisIndex = symbolReferences.findIndex(
                    (item) => item.import().symbolId === JudgeSymbolId
                );
            }

            //ThisIndex + counts 超出正常范围时
            if (counts > 0) {
                if (counts > symbolReferences.length) {
                    counts = counts - symbolReferences.length;
                }
                if (ThisIndex + counts >= symbolReferences.length) {
                    ThisIndex = ThisIndex - symbolReferences.length;
                }
            } else {
                if (-counts > symbolReferences.length) {
                    counts = -(-counts - symbolReferences.length);
                }
                if (ThisIndex + counts < 0) {
                    ThisIndex = symbolReferences.length - ThisIndex;
                }
            }

            //获取待替换 symbolMaster
            symbolMaster = symbolReferences[ThisIndex + counts].import();
        }

        //所选为 local symbol 时
        else {
            //不能用 let DocSymbols =  doc.getSymbols(), 会取到引入的其它 library symbol
            let DocSymbols = sketch.find('[type="SymbolMaster"]');

            //判断是否需要重新获取 ThisIndex
            if (JudgeSymbolId === ReadSymbolInfo.JudgeSymbolId) {
                ThisIndex = ReadSymbolInfo.ThisIndex;
            } else {
                ThisIndex = DocSymbols.findIndex(
                    (item) => item.symbolId === JudgeSymbolId
                );
            }

            //ThisIndex + counts 超出正常范围时
            if (counts > 0) {
                if (counts > DocSymbols.length) {
                    counts = counts - DocSymbols.length;
                }
                if (ThisIndex + counts >= DocSymbols.length) {
                    ThisIndex = ThisIndex - DocSymbols.length;
                }
            } else {
                if (-counts > DocSymbols.length) {
                    counts = -(-counts - DocSymbols.length);
                }
                if (ThisIndex + counts < 0) {
                    ThisIndex = DocSymbols.length - ThisIndex;
                }
            }

            //获取待替换 symbolMaster
            symbolMaster = DocSymbols[ThisIndex + counts];
        }
    }

    sketch.UI.message(symbolMaster.name);
    SelectedSymbols.forEach((item) => (item.master = symbolMaster));

    //储存 symbol 临时信息
    WriteSymbolInfo(symbolMaster.symbolId, ThisIndex + counts);
};

//google analytics
export const GA = (CommandResult) => {
    let track = require("./sketch-module-google-analytics"),
        variant = MSApplicationMetadata.metadata().variant,
        Appinfo =
        context.plugin.url().path().split("/")[
            context.plugin
            .url()
            .path()
            .split("/")
            .findIndex((item) => item === "Users") + 1
        ] +
        "-Skth" +
        (variant == "NONAPPSTORE" ? "" : variant + " ") +
        settings.version.sketch +
        "-" +
        context.plugin.identifier().toLowerCase() +
        " [" +
        context.plugin.version().toLowerCase() +
        "]",
        CommandInfo = context.command.identifier().toLowerCase();

    track("UA-169300937-3", "event", {
        ec: Appinfo, // the event category
        ea: CommandInfo, // the event action
        el: CommandResult, // the event label
    });
};

//write user info
export const userInfo = {
    set: function(methodOrObject, key, value) {
        let methodOrObjectType = methodOrObject.type ?
            methodOrObject.type :
            methodOrObject;
        switch (methodOrObjectType) {
            case "t":
                /*temporaryInfo*/
                settings.setSessionVariable(key, value);
                break;
            case "p":
                /*pluginInfo*/
                settings.setSettingForKey(key, value);
                break;
            case "s":
                /*sketchInfo*/
                settings.setGlobalSettingForKey(key, value);
                break;
            case "d":
                /*documentInfo*/
                settings.setDocumentSettingForKey(methodOrObject, key, value);
                break;
            default:
                /*layerInfo*/
                if (
                    methodOrObject.frame /*judge if it's a layer type by a frame parameter*/
                ) {
                    settings.setLayerSettingForKey(methodOrObject, key, value);
                }
                break;
        }
    },
    get: function(methodOrObject, key) {
        let methodOrObjectType = methodOrObject.type ?
            methodOrObject.type :
            methodOrObject;
        switch (methodOrObjectType) {
            case "t":
                return settings.sessionVariable(key);
            case "p":
                return settings.settingForKey(key);
            case "s":
                return settings.globalSettingForKey(key);
            case "d":
                return settings.documentSettingForKey(methodOrObject, key);
            default:
                let keyValue;
                //judge if it's a layer type by a frame parameter
                if (methodOrObject.frame) {
                    keyValue = settings.layerSettingForKey(methodOrObject, key);
                }
                return keyValue;
        }
    },
};

//plugin runs webview function
export const runWebviewFunction = (functionName, functionPara) =>
    browserWindow.webContents
    .executeJavaScript(
        `${functionName}(${
        typeof functionPara === "object"
          ? JSON.stringify(functionPara)
          : functionPara
      })`
    )
    .then((res) => res);

//plugin sends webview info
export const sendToWebview = (valueObject) =>
    callWebviewFunction("getFromPlugin", valueObject);

//webview gets plugin info
export const getFromPlugin = (infoStoredObject, valueObject) => {
    anObject;
};

//webview sends plugin info
export const sendToPlugin = (infoKey, infoValue) =>
    window.postMessage(infoKey, infoValue).then((res) => res);

//plugin gets webview info
export const getFromWebview = (infoKey) =>
    browserWindow.webContents.on(infoKey, (infoValue) => infoValue);