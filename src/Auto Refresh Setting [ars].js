import sketch from "sketch";
import * as xs from "./modules/xscapeFunctions";
let doc = sketch.getSelectedDocument(),
    selection = doc.selectedLayers.layers,
    UI = require("sketch/ui"),
    artboard = 0;
import { artboardBrowse } from "./Preview In Browser [pib]";

export default function() {
    let autoRefreshKey;

    UI.getInputFromUser(
        "Choose Auto Refresh Mode", {
            type: UI.INPUT_TYPE.selection,
            possibleValues: [
                "No auto refresh",
                "Auto refresh @1x",
                "Auto refresh @2x",
                "Refresh when saving document @1x",
                "Refresh when saving document @2x",
            ],
        },
        (err, value) => {
            if (err) {
                return;
            } else {
                //必须设置为session userinfo，不能设置为global userinfo
                //如果sketch重启，但是用户并未打开预览窗口，如果之前的自动刷新设置开启，这时用户没有预览页面的必要但一直在自动刷新浪费系统资源
                xs.userInfo.set("t", "autoRefreshKey", value);
                //let settings = require("sketch/settings")
                //settings.sessionVariable("autoRefreshKey", value);
                //console.log(settings.sessionVariable("autoRefreshKey"))
                autoRefreshKey = value;
            }
        }
    );

    //setDefaultSelectedArtboard
    if (selection.length > 0) {
        for (let i = 0; artboard == 0 && i < selection.length; i++) {
            artboard = selection[i].getParentArtboard() || selection[i];
            if (artboard.type !== "Artboard") {
                artboard = 0;
            }
        }
    }

    if (
        artboard == 0 &&
        doc.selectedPage.layers.find((item) => item.type === "Artboard")
    ) {
        artboard = doc.selectedPage.layers.find((item) => item.type === "Artboard");
    }

    //toastMessage
    if (autoRefreshKey === "Auto refresh @2x") {
        sketch.UI.message("Auto Refresh In Browser: On");
        artboardBrowse(artboard, "AutoRefreshing", false, 2);
    } else if (autoRefreshKey === "Auto refresh @1x") {
        sketch.UI.message("Auto Refresh In Browser: On");
        artboardBrowse(artboard, "AutoRefreshing", false, 1);
    } else if (autoRefreshKey === "Refresh when saving document @2x") {
        sketch.UI.message(
            "It Will Refresh When You Save Document Pressing Command + S"
        );
        artboardBrowse(artboard, "AutoRefreshing", false, 2);
    } else if (autoRefreshKey === "Refresh when saving document @1x") {
        sketch.UI.message(
            "It Will Refresh When You Save Document Pressing Command + S"
        );
        artboardBrowse(artboard, "AutoRefreshing", false, 1);
    } else {
        sketch.UI.message("Auto Refresh In Browser: Off");
        //artboardBrowse(artboard, artboard.name, true)
    }

    //GA
    xs.GA(autoRefreshKey);
}