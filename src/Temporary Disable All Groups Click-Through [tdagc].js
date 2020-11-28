import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let settings = require('sketch/settings')
import { GA } from "./modules/xscapeFunctions"

export default function() {

    //function: WriteThroughInfo
    let WriteThroughInfo = function(item1, item2, item3, item4) {
        settings.setSessionVariable('ReadThroughInfo', { ThroughGroupsId: item1, Temporary: item2, DocId: item3, PageId: item4 })
    }

    //判断一系列需要初始值的情况 即 WriteThroughInfo([], 0, null)
    let ThroughGroupsId, Temporary, DocId, PageId, PageGroups, ThroughGroups
    PageGroups = sketch.find('Group', doc.selectedPage)

    //判断 WriteThroughInfo 为空时
    if (!settings.sessionVariable('ReadThroughInfo')) {
        ThroughGroupsId = [], Temporary = 0, DocId = null, PageId = null
    }

    //WriteThroughInfo 不为空时 
    else {
        ThroughGroupsId = settings.sessionVariable('ReadThroughInfo').ThroughGroupsId
        Temporary = settings.sessionVariable('ReadThroughInfo').Temporary
        DocId = settings.sessionVariable('ReadThroughInfo').DocId
        PageId = settings.sessionVariable('ReadThroughInfo').PageId

        //操作过的编组数量为 0 时
        if (settings.sessionVariable('ReadThroughInfo').ThroughGroupsId.length === 0) {
            ThroughGroupsId = [], Temporary = 0, DocId = null, PageId = null
        }

        //操作过的编组数量不为 0 时，判断文档是否切换
        else {
            Temporary = 1

            //文档切换时
            if (settings.sessionVariable('ReadThroughInfo').DocId !== doc.id) {
                ThroughGroupsId = [], Temporary = 0, DocId = null, PageId = null
            }

            //文档未切换，页面切换时 
            else if (settings.sessionVariable('ReadThroughInfo').PageId !== doc.selectedPage.id) {
                ThroughGroupsId = [], Temporary = 0, DocId = null, PageId = null
            }
        }
    }

    WriteThroughInfo(ThroughGroupsId, Temporary, DocId, PageId)

    //main function begins    //Temporary 为 0 时 (执行完切换为 1 )
    if (settings.sessionVariable('ReadThroughInfo').Temporary === 0) {
        WriteThroughInfo([], 1, doc.id, doc.selectedPage.id)
        ThroughGroups = PageGroups.filter(item => item.sketchObject.hasClickThrough() === 1)
        for (let i = 0, len = ThroughGroups.length; i < len; i++) {
            ThroughGroupsId.splice(0, 0, ThroughGroups[i].id)
        }
        ThroughGroups.forEach(item => { item.sketchObject.hasClickThrough = 0 })
        WriteThroughInfo(ThroughGroupsId, 1, doc.id, doc.selectedPage.id)
        sketch.UI.message("Succeed In Disabling Group Click-Through")
    }

    //Temporary 为 1 时 (执行完切换为 0 ) 
    else if (settings.sessionVariable('ReadThroughInfo').Temporary === 1) {
        WriteThroughInfo(ThroughGroupsId, 0, null, null)
        PageGroups.forEach(item => {
            if (ThroughGroupsId.indexOf(item.id) !== -1) {
                item.sketchObject.hasClickThrough = 1 - item.sketchObject.hasClickThrough()
            }
        })
        sketch.UI.message("Recovered")
    }
    //GA
    GA(":-)")
}