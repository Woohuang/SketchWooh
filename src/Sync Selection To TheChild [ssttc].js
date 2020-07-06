import sketch from 'sketch'
let Document = require('sketch/dom').Document
let alldocuments = Document.getDocuments()
let path = require('path')
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {

    //通过文件名判断是否打开 TheSource.sketch
    let TS_doc, TC_Array
    TS_doc = alldocuments.find(item => path.basename(item.path).replace('.sketch', '') === 'TheSource')
    TC_Array = alldocuments.filter(item => path.basename(item.path).replace('.sketch', '').indexOf("TS_") !== -1)
    let SyncResult = 0

    if (TS_doc === undefined) {
        sketch.UI.message("请先打开TheSource.sketch")
    } else if (path.basename(doc.path).replace(".sketch", "") !== "TheSource") {
        sketch.UI.message("请切换到TheSource.sketch")
    } else {

        TS_doc = doc

        if (TC_Array.length <= 0) {
            sketch.UI.message("请先打开1个同步的TS_子组件库")
        } else if (TC_Array.length > 1) {
            sketch.UI.message("只能打开1个同步的TS_子组件库")
        }

        //正确打开 TS、TC 后
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

                let TC_doc = TC_Array[0]
                let TS_CurPage = TS_doc.selectedPage
                let TC_SamePage = TC_doc.pages.find(item => item.name === TS_CurPage.name)
                if (TC_SamePage !== undefined) {
                    for (let i = 0, len = SelectedMaster.length; i < len; i++) {
                        const TC_SyncIndex = TC_SamePage.layers.findIndex(item => item.symbolId === SelectedMaster[i].symbolId)
                        if (TC_SyncIndex === -1) {
                            TC_SamePage.layers.splice(TC_SyncIndex, 0, SelectedMaster[i])
                            SyncResult = SyncResult + 1
                        } else {
                            TC_SamePage.layers.splice(TC_SyncIndex, 1, SelectedMaster[i])
                            SyncResult = SyncResult + 1
                        }
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
}