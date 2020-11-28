import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let settings = require('sketch/settings')
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeF"

export default function() {

    //function: WriteSelectedInfo
    let WriteSelectedInfo = function(item1, item2, item3, item4) {
        settings.setSessionVariable('ReadSelectedInfo', { SelectedLayersId: item1, Selected: item2, DocId: item3, PageId: item4 })
    }

    //判断一系列需要初始值的情况 即 WriteSelectedInfo([], 1, null)
    let SelectedLayersId, Selected, DocId, PageId

    //判断 WriteSelectedInfo 为空时
    if (!settings.sessionVariable('ReadSelectedInfo')) {
        SelectedLayersId = [], Selected = 1, DocId = null, PageId = null
    }

    //WriteSelectedInfo 不为空时 
    else {
        SelectedLayersId = settings.sessionVariable('ReadSelectedInfo').SelectedLayersId
        Selected = settings.sessionVariable('ReadSelectedInfo').Selected
        DocId = settings.sessionVariable('ReadSelectedInfo').DocId
        PageId = settings.sessionVariable('ReadSelectedInfo').PageId

        //储存的选中图层数量为 0 时
        if (settings.sessionVariable('ReadSelectedInfo').SelectedLayersId.length === 0) {
            SelectedLayersId = [], Selected = 1, DocId = null, PageId = null
        }

        //选中图层数量不为 0 时，判断文档是否切换
        else {
            Selected = 0
                // SelectedLayersId = settings.sessionVariable('ReadSelectedInfo').SelectedLayersId
                //DocId = settings.sessionVariable('ReadSelectedInfo').DocId

            //文档切换时
            if (settings.sessionVariable('ReadSelectedInfo').DocId !== doc.id) {
                SelectedLayersId = [], Selected = 1, DocId = null, PageId = null
            }
            //文档未切换，页面切换时 
            else if (settings.sessionVariable('ReadSelectedInfo').PageId !== doc.selectedPage.id) {
                SelectedLayersId = [], Selected = 1, DocId = null, PageId = null
            }
        }
    }
    WriteSelectedInfo(SelectedLayersId, Selected, DocId, PageId)

    //main function begins    //Selected 为 1 时 (执行完切换为 0 )
    if (settings.sessionVariable('ReadSelectedInfo').Selected === 1) {
        WriteSelectedInfo([], 0, doc.id, doc.selectedPage.id)

        if (Selection.length > 0) {
            for (let i = 0, len = Selection.length; i < len; i++) {
                SelectedLayersId.splice(0, 0, Selection[i].id)
            }
            Selection.forEach(item => { item.selected = false })
            WriteSelectedInfo(SelectedLayersId, 0, doc.id, doc.selectedPage.id)

            //toast result
            sketch.UI.message("Succeed In Unselecting")
        } else {

            //toast result
            sketch.UI.message("No Layer Selected")
        }
    }

    //Selected 为 0 时 (执行完切换为 1 ) 
    else if (settings.sessionVariable('ReadSelectedInfo').Selected === 0) {

        doc.selectedLayers.clear()
        WriteSelectedInfo(SelectedLayersId, 1, null, null)

        for (let i = 0, len = settings.sessionVariable('ReadSelectedInfo').SelectedLayersId.length; i < len; i++) {
            if (doc.getLayerWithID(settings.sessionVariable('ReadSelectedInfo').SelectedLayersId[i])) {
                let ThisLayer = doc.getLayerWithID(settings.sessionVariable('ReadSelectedInfo').SelectedLayersId[i])
                ThisLayer.selected = true
            }
        }

        //toast result
        sketch.UI.message("Recovered")
    }
    //GA
    GA(":-)")
}