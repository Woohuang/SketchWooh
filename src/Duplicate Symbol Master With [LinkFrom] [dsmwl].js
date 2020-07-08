import sketch from 'sketch'
let Settings = require('sketch/settings')
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
let UI = require('sketch/ui')

import GA from "./modules/Google Analytics Method"

export default function() {

    let DuplicateResult = 0
    let ChooseLinkFromMasterResult = 0
    let LinkFromSymbolLikelyList = sketch.find('SymbolMaster').filter(item => item.name.indexOf("Link") !== -1 && item.name.indexOf("Bridge") !== -1)
    let LinkFromSymbolLikelyNames = []
    let LinkFromMaster
    LinkFromSymbolLikelyList.forEach(item => {
        ChooseLinkFromMasterResult = ChooseLinkFromMasterResult + 1
        LinkFromSymbolLikelyNames.push(item.name + " [" + ChooseLinkFromMasterResult + "]")
    })

    //acquire LinkFrom master
    UI.getInputFromUser(
        "确认 [Link/From] 组件 Master", {
            type: UI.INPUT_TYPE.selection,
            possibleValues: LinkFromSymbolLikelyNames,
        },
        (err, value) => {
            if (err) {
                return
            } else {
                LinkFromMaster = LinkFromSymbolLikelyList[LinkFromSymbolLikelyNames.findIndex(item => item === value)]
            }
        }
    )

    if (LinkFromMaster !== undefined) {
        ChooseLinkFromMasterResult = 1
    } else {
        sketch.UI.message('未找到正确的 [Link/From] 组件 Master')
    }

    //if LinkFrom master is right
    //acquire Artboards to Link
    if (ChooseLinkFromMasterResult === 1) {
        let ToDuplicateArtboards = []
        Selection.forEach(item => {
            if (item.type === 'SymbolMaster' || item.type === 'Artboard') {
                if (ToDuplicateArtboards.findIndex(item2 => item2.id === item.id) === -1) {
                    ToDuplicateArtboards.push(item)
                }
            } else if (item.getParentArtboard() !== undefined) {
                if (ToDuplicateArtboards.findIndex(item2 => item2.id === item.getParentArtboard().id) !== -1) {
                    ToDuplicateArtboards.push(item.getParentArtboard())
                }
            }
        })

        //clear selection
        doc.selectedLayers.clear()

        //duplicate ToDuplicateArtboards
        ToDuplicateArtboards.forEach(item => {

            //set duplicate SymbolMaster Artboard
            let DuplicateArtboard = item.duplicate()
            DuplicateArtboard.name = "⚙️LinkFrom: " + item.name
            DuplicateArtboard.frame.x = item.frame.x + item.frame.width + 2
            DuplicateArtboard.selected = true

            //set duplicate SymbolMaster layers
            let LinkFromInstance = LinkFromMaster.createNewInstance()
            LinkFromInstance.parent = DuplicateArtboard
            LinkFromInstance.index = 0
            LinkFromInstance.overrides[1].value = item.name
            LinkFromInstance.name = "⚙️LinkFrom: " + item.name
            LinkFromInstance.frame.width = 0.1
            LinkFromInstance.frame.height = 0.1
            LinkFromInstance.frame.x = DuplicateArtboard.frame.width / 2
            LinkFromInstance.frame.y = DuplicateArtboard.frame.height / 2
            LinkFromInstance.locked = true
            LinkFromInstance.hidden = true
            Settings.setLayerSettingForKey(LinkFromInstance, 'LinkOriginalMasterId', item.symbolId)

            //result counts
            DuplicateResult = DuplicateResult + 1
        })

        //toast result
        if (DuplicateResult === 0) {
            sketch.UI.message('Fain In Duplicating')
        } else if (DuplicateResult > 0) {
            sketch.UI.message('Succeed In Duplicating ' + DuplicateResult + ' Artboard(s)')
        }
    }

    //GA
    GA("NormalResult")
}