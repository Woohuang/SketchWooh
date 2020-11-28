import sketch from 'sketch'
let doc = sketch.getSelectedDocument(),
    selection = doc.selectedLayers.layers,
    settings = require('sketch/settings')
import { GA } from "./modules/xscapeF"

export default function() {

    if (selection.length === 1) {
        let layerWidth = itemSizeAndAbsolutePosition(selection[0])[0],
            layerHeight = itemSizeAndAbsolutePosition(selection[0])[1],
            layerX = itemSizeAndAbsolutePosition(selection[0])[2],
            layerY = itemSizeAndAbsolutePosition(selection[0])[3]
        settings.setSettingForKey('copyLayerInfo', [layerWidth, layerHeight, layerX, layerY])
        sketch.UI.message("Succeed In Copying")
    }

    //no selection
    else {
        sketch.UI.message("Please Select 1 Layer")
    }

    //absolute position function
    function itemSizeAndAbsolutePosition(item) {
        let layerWidth = item.frame.width,
            layerHeight = item.frame.height,
            absoluteX = item.frame.x,
            absoluteY = item.frame.y,
            itemParent = item.parent

        //parent is not group
        if (item.parent.type !== "Group") {}

        //parent is group
        else {
            for (; itemParent.type === "Group";) {
                absoluteX = absoluteX + itemParent.frame.x
                absoluteY = absoluteY + itemParent.frame.y
                itemParent = itemParent.parent
            }
        }

        //return result
        return [layerWidth, layerHeight, absoluteX, absoluteY]
    }

    //GA
    GA(":-)")
}