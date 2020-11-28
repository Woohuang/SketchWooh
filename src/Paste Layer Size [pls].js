import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let selection = doc.selectedLayers.layers
let settings = require('sketch/settings')
import { GA } from "./modules/xscapeF"

export default function() {

    if (selection.length > 0) {
        let layerWidth = settings.settingForKey('copyLayerInfo')[0],
            layerHeight = settings.settingForKey('copyLayerInfo')[1]

        selection.forEach(item => {
            item.frame.width = layerWidth
            item.frame.height = layerHeight

            //parent group adjustToFit
            let itemParent = item.parent
            for (; itemParent.type === "Group";) {
                itemParent.adjustToFit()
                itemParent = itemParent.parent
            }
        })

        //toast result
        sketch.UI.message("Succeed In Pasting Size")
    }

    //no selection
    else {
        sketch.UI.message("Please Select Some Layers")
    }

    //GA
    GA(":-)")
}