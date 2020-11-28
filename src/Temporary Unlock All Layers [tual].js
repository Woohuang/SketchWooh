import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let settings = require('sketch/settings')
import { GA } from "./modules/xscapeFunctions"

export default function() {

    //function: WriteLockedInfo
    let WriteLockedInfo = function(item1, item2, item3, item4) {
        settings.setSessionVariable('ReadLockedInfo', { LockedLayersId: item1, Locked: item2, DocId: item3, PageId: item4 })
    }

    //判断一系列需要初始值的情况 即 WriteLockedInfo([], 1, null)
    let LockedLayersId, Locked, DocId, PageId, LockedLayers
        // LockedLayers = sketch.find('[locked=true]', doc.selectedPage)

    //判断 WriteLockedInfo 为空时
    if (!settings.sessionVariable('ReadLockedInfo')) {
        LockedLayersId = [], Locked = 1, DocId = null, PageId = null
    }

    //WriteLockedInfo 不为空时 
    else {
        LockedLayersId = settings.sessionVariable('ReadLockedInfo').LockedLayersId
        Locked = settings.sessionVariable('ReadLockedInfo').Locked
        DocId = settings.sessionVariable('ReadLockedInfo').DocId
        PageId = settings.sessionVariable('ReadLockedInfo').PageId

        //储存的锁定图层数量为 0 时
        if (settings.sessionVariable('ReadLockedInfo').LockedLayersId.length === 0) {
            LockedLayersId = [], Locked = 1, DocId = null, PageId = null
        }

        //锁定图层数量不为 0 时，判断文档是否切换
        else {
            Locked = 0
                // LockedLayersId = settings.sessionVariable('ReadLockedInfo').LockedLayersId
                //DocId = settings.sessionVariable('ReadLockedInfo').DocId

            //文档切换时
            if (settings.sessionVariable('ReadLockedInfo').DocId !== doc.id) {
                LockedLayersId = [], Locked = 1, DocId = null, PageId = null
            }
            //文档未切换，页面切换时 
            else if (settings.sessionVariable('ReadLockedInfo').PageId !== doc.selectedPage.id) {
                LockedLayersId = [], Locked = 1, DocId = null, PageId = null
            }
        }
    }
    WriteLockedInfo(LockedLayersId, Locked, DocId, PageId)

    //main function begins    //Locked 为 1 时 (执行完切换为 0 )
    if (settings.sessionVariable('ReadLockedInfo').Locked === 1) {
        WriteLockedInfo([], 0, doc.id, doc.selectedPage.id)
        LockedLayers = sketch.find('[locked=true]', doc.selectedPage)
        for (let i = 0, len = LockedLayers.length; i < len; i++) {
            LockedLayersId.splice(0, 0, LockedLayers[i].id)
        }
        LockedLayers.forEach(item => { item.locked = false })
        WriteLockedInfo(LockedLayersId, 0, doc.id, doc.selectedPage.id)
        sketch.UI.message("Succeed In Unlocking")
    }

    //Locked 为 0 时 (执行完切换为 1 ) 
    else if (settings.sessionVariable('ReadLockedInfo').Locked === 0) {
        WriteLockedInfo(LockedLayersId, 1, null, null)

        /*
        LockedLayers = sketch.find('[locked=false]', doc.selectedPage)
        LockedLayers.forEach(item => {
            if (LockedLayersId.indexOf(item.id) !== -1) {
                item.locked = true
            }
        })
        */

        for (let i = 0, len = settings.sessionVariable('ReadLockedInfo').LockedLayersId.length; i < len; i++) {
            if (doc.getLayerWithID(settings.sessionVariable('ReadLockedInfo').LockedLayersId[i])) {
                let ThisLayer = doc.getLayerWithID(settings.sessionVariable('ReadLockedInfo').LockedLayersId[i])
                ThisLayer.locked = true
            }
        }

        sketch.UI.message("Recovered")
    }
    //GA
    GA(":-)")
}