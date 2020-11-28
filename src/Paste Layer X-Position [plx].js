import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let selection = doc.selectedLayers.layers
let settings = require('sketch/settings')
import { GA } from "./modules/xscapeFunctions"

export default function() {

    if (selection.length > 0) {

        let absoluteX = settings.settingForKey('copyLayerInfo')[2],
            absoluteY = settings.settingForKey('copyLayerInfo')[3]

        selection.forEach(item => {
            let itemParent = item.parent

            //parent is not group
            if (item.parent.type !== "Group") {
                item.frame.x = absoluteX
            }

            //parent is group
            else {
                let convertAbsoluteX = absoluteX,
                    convertAbsoluteY = absoluteY

                //get absolute position
                for (; itemParent.type === "Group";) {
                    convertAbsoluteX = convertAbsoluteX - itemParent.frame.x
                    convertAbsoluteY = convertAbsoluteY - itemParent.frame.y
                    itemParent = itemParent.parent
                }

                //set absolute position
                item.frame.x = convertAbsoluteX
                itemParent = item.parent

                //parent group adjustToFit
                for (; itemParent.type === "Group";) {
                    itemParent.adjustToFit()
                    itemParent = itemParent.parent
                }

            }
        })

        //toast result
        sketch.UI.message("Succeed In Pasting X-Position")
    }

    //no selection
    else {
        sketch.UI.message("Please Select Some Layers")
    }

    //GA
    GA(":-)")
}