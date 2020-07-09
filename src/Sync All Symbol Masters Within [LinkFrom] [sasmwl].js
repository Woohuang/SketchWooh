import sketch from 'sketch'
let UI = require('sketch/ui')
let Settings = require('sketch/settings')
let doc = sketch.getSelectedDocument()

import GA from "./modules/Google Analytics Method"

export default function() {

    let LinkResult = 0,
        ChooseLinkFromMasterResult = 0,
        findSymbolMasters = sketch.find('SymbolMaster'),
        LinkFromSymbolLikelyList = findSymbolMasters.filter(item => item.name.indexOf("Link") !== -1 && item.name.indexOf("Bridge") !== -1),
        LinkFromSymbolLikelyNames = [],
        LinkFromMaster

    LinkFromSymbolLikelyList.forEach(item => {
        ChooseLinkFromMasterResult = ChooseLinkFromMasterResult + 1
        LinkFromSymbolLikelyNames.push(item.name + " [" + ChooseLinkFromMasterResult + "]")
    })

    //acquire LinkFrom master
    UI.getInputFromUser(
        "Choose [Link/From-Bridge] Symbol Master", {
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
        LinkFromMaster.getAllInstances().forEach(item => {

            //acquire LinkOriginalMasterId info
            let LinkOriginalMasterId
            if (item.overrides[0].value !== LinkFromMaster.layers[0].symbolId) {
                LinkOriginalMasterId = item.overrides[0].value

                //set LinkOriginalMasterId info
                Settings.setLayerSettingForKey(item, 'LinkOriginalMasterId', LinkOriginalMasterId)
            } else if (Settings.layerSettingForKey(item, 'LinkOriginalMasterId') !== undefined) {
                LinkOriginalMasterId = Settings.layerSettingForKey(item, 'LinkOriginalMasterId')
            } else {
                LinkOriginalMasterId = findSymbolMasters.find(item2 => item2.name === item.overrides[1].value).symbolId

                //set LinkOriginalMasterId info
                Settings.setLayerSettingForKey(item, 'LinkOriginalMasterId', LinkOriginalMasterId)
            }

            if (LinkOriginalMasterId !== undefined) {
                let LinkMaster = doc.getSymbolMasterWithID(LinkOriginalMasterId)

                //remove old layers
                item.parent.layers.filter(item2 => item2.id !== item.id).forEach(item2 => item2.remove())

                //reset 'artboards' or 'group' frame
                if (item.parent.type === 'Artboard' || item.parent.type === 'SymbolMaster') {
                    item.parent.frame.width = LinkMaster.frame.width
                    item.parent.frame.height = LinkMaster.frame.height
                }

                //duplicate layers
                LinkMaster.layers.forEach(item2 => {
                    item2.duplicate().parent = item.parent
                })

                //reset group frame size
                if (item.parent.type === 'Group') {
                    item.parent.frame.x = 0
                    item.parent.frame.y = 0
                        //item.parent.adjustToFit()
                    let AllGroups = sketch.find('Group', item.getParentArtboard())
                    for (let i = 0; i < AllGroups.length; i++) { AllGroups.forEach(item => item.adjustToFit()) }
                }

                //reset LinkFrom symbol instance
                item.index = 0
                item.overrides[0].value = LinkFromMaster.overrides[0].value
                item.overrides[1].value = LinkMaster.name
                item.name = "⚙️LinkFrom: " + LinkMaster.name
                item.frame.width = 0.1
                item.frame.height = 0.1
                item.frame.x = item.parent.frame.width / 2
                item.frame.y = item.parent.frame.height / 2
                item.locked = true
                item.hidden = true

            }

            //result counts
            LinkResult = LinkResult + 1
        })
    }

    //result toast
    sketch.UI.message("Succeed In Linking " + LinkResult + " Symbol(s)")

    //GA
    GA("NormalResult")
}