import sketch from 'sketch'
var Document = require('sketch/dom').Document
var alldocuments = Document.getDocuments()
let doc = sketch.getSelectedDocument()
    //var SharedStyle = require('sketch/dom').SharedStyle
var Artboard = require('sketch/dom').Artboard
var path = require('path')
var SymbolMaster = require('sketch/dom').SymbolMaster
var Selection = doc.selectedLayers.layers

export default function() {

    //通过文件名判断是否打开 TheSource.sketch
    var TS_doc, TC_doc
    TS_doc = alldocuments.find(item => path.basename(item.path).replace('.sketch', '') === 'TheSource'),
        TC_doc = doc
    if (TS_doc === undefined) {
        sketch.UI.message("请先打开TheSource.sketch")
    } else if (path.basename(TC_doc.path).replace(".sketch", "") === "TheSource") {
        sketch.UI.message("请切换到待同步Symbols所在的子组件库")
    }

    //正确打开 TheSource.sketch 后
    else {
        const newDoc = {}
            //获取 Selected Symbol Masters
        let SelectedMaster = []
        for (let i = 0, len = Selection.length; i < len; i++) {
            if (Selection[i].type === "SymbolMaster") {
                SelectedMaster.splice(SelectedMaster.length - 1, 0, Selection[i])
            }
        }
        if (SelectedMaster.length === 0) {
            sketch.UI.message("Please Select The Symbol Need To Be Synchronized画板")
        } else {
            let TC_CurPage = TC_doc.pages.find(item => item.selected === true)
            let TS_TcSamePage = TS_doc.pages.find(item => item.name === TC_CurPage.name)
            for (let i = 0, len = SelectedMaster.length; i < len; i++) {
                const TS_SyncIndex = TS_TcSamePage.layers.findIndex(item => item.symbolId === SelectedMaster[i].symbolId)
                if (TS_TcSamePage === undefined) {
                    sketch.UI.message("未在TheSource.sketch中找到相同页面")
                } else {
                    if (TS_SyncIndex === -1) {
                        TS_TcSamePage.layers.splice(TS_SyncIndex, 0, SelectedMaster[i])
                    } else {
                        TS_TcSamePage.layers.splice(TS_SyncIndex, 1, SelectedMaster[i])
                    }
                }
            }
        }
    }
}