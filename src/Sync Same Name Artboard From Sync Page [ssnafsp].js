import sketch from "sketch";
import { GA } from "./modules/xscapeFunctions";
let doc = sketch.getSelectedDocument(),
    Page = require("sketch/dom").Page;

export default function() {
    let SyncResult = 0,
        NullResult = 0,
        SameNameResult = 0,
        SelectedPage = doc.selectedPage;

    if (
        doc.pages.findIndex(
            (item) =>
            item.name === "Sync: 将新的同名画板复制到这里" ||
            item.name === "Sync: 剩余画板不存在或存在多个同名匹配项" ||
            item.name === "Sync: done!"
        ) !== -1
    ) {
        let SyncPage = doc.pages.find(
            (item) =>
            item.name === "Sync: 将新的同名画板复制到这里" ||
            item.name === "Sync: 剩余画板不存在或存在多个同名匹配项" ||
            item.name === "Sync: done!"
        );
        let SyncPageArtboard = SyncPage.layers;

        //check if that select page is syncpage
        if (SelectedPage.id !== SyncPage.id) {
            SyncPageArtboard.forEach((item) => {
                //check for same name artboard
                let SameNameArtboardsLen = SelectedPage.layers.filter(
                    (item2) => item2.name === item.name
                ).length;

                /*
                        if (SameNameArtboardsLen < SyncPageArtboard.filter(item2 => item2.name === item.name).length) {
                            SameNameArtboardsLen = SyncPageArtboard.filter(item2 => item2.name === item.name).length
                        }
                        */

                //main function start
                let ToSyncIndex = SelectedPage.layers.findIndex(
                    (item2) => item2.name === item.name
                );

                if (SameNameArtboardsLen === 1) {
                    SelectedPage.layers[ToSyncIndex].layers = item.layers;
                    SelectedPage.layers[ToSyncIndex].selected = true;
                    SelectedPage.layers[ToSyncIndex].frame.height = item.frame.height;
                    SelectedPage.layers[ToSyncIndex].frame.width = item.frame.width;
                    item.remove();
                    SyncResult = SyncResult + 1;
                } else if (SameNameArtboardsLen > 1) {
                    SameNameResult = 1;
                } else {
                    NullResult = 1;
                }
            });

            //return sync result
            if (SyncResult === 0) {
                sketch.UI.message("Fail In Syncing");
            } else if (SyncResult >= 1) {
                sketch.UI.message("Succeed In Syncing " + SyncResult + " Artboards");
            }
            if (SameNameResult === 1 || NullResult === 1) {
                SyncPage.name = "Sync: 剩余画板不存在或存在多个同名匹配项";
            } else {
                SyncPage.name = "Sync: done!";
            }
        } else {
            sketch.UI.message("请切换到待同步页面");
        }
    } else {
        let NewSyncPage = new Page({
            name: "Sync: 将新的同名画板复制到这里",
        });
        NewSyncPage.parent = doc;
        sketch.UI.message("请将新的同名画板复制到Sync页");
    }
    //GA
    GA(":-)");
}