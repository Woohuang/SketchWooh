import sketch from 'sketch'
let Document = require('sketch/dom').Document
let alldocuments = Document.getDocuments()
let path = require('path')
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {

    //通过文件名判断是否打开 TheSource.sketch
    let TS_doc, TC_doc
    TS_doc = alldocuments.find(item => path.basename(item.path).replace('.sketch', '') === 'TheSource')
    TC_doc = doc
    let SyncResult = 0

    if (TS_doc === undefined) {
        sketch.UI.message("请先打开TheSource.sketch")
    } else if (path.basename(doc.path).replace(".sketch", "") === "TheSource") {
        sketch.UI.message("请切换到TS_子组件库并选中待同步Symbol")
    }

    //正确打开 TheSource.sketch 后
    else {

        //获取 Selected Symbol Masters
        let SelectedMaster = []
        for (let i = 0, len = Selection.length; i < len; i++) {
            if (Selection[i].type === "SymbolMaster") {
                SelectedMaster.splice(SelectedMaster.length - 1, 0, Selection[i])
            }
        }
        if (SelectedMaster.length === 0) {
            sketch.UI.message("Please Select The Symbol Need To Be Synchronized")
        } else {
            let TC_CurPage = TC_doc.selectedPage
            let TS_SamePage = TS_doc.pages.find(item => item.name === TC_CurPage.name)
            if (TS_SamePage === undefined) {
                sketch.UI.message("未在TheSource.sketch中找到相同页面")
            } else {
                for (let i = 0, len = SelectedMaster.length; i < len; i++) {
                    const TS_SyncIndex = TS_SamePage.layers.findIndex(item => item.symbolId === SelectedMaster[i].symbolId)
                    if (TS_SyncIndex === -1) {
                        TS_SamePage.layers.splice(TS_SyncIndex, 0, SelectedMaster[i])
                        SyncResult = SyncResult + 1
                    } else {
                        TS_SamePage.layers.splice(TS_SyncIndex, 1, SelectedMaster[i])
                        SyncResult = SyncResult + 1
                    }
                }
                if (SyncResult > 0) {
                    sketch.UI.message("Succeed In Syncing " + SyncResult + " Symbol Master(s)")
                } else {
                    sketch.UI.message("Fail In Syncing")
                }
            }
        }
    }

    //GA
    GA("NormalResult")
}