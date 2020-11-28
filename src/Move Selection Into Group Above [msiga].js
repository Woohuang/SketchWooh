import sketch from 'sketch'
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {

    let MoveResult = 0

    if (Selection.length > 0) {
        Selection.forEach(item => {
            if (item.index < item.parent.layers.length - 1) {
                if (item.parent.layers[item.index + 1].type === "Group") {
                    let newX = item.frame.x - item.parent.layers[item.index + 1].frame.x
                    let newY = item.frame.y - item.parent.layers[item.index + 1].frame.y
                    item.parent = item.parent.layers[item.index + 1]
                    item.index = 0
                    item.frame.x = newX
                    item.frame.y = newY
                    item.parent.adjustToFit()
                    MoveResult = MoveResult + 1
                }
            }
        })

        //Result Message
        if (MoveResult === 1) {
            sketch.UI.message("Succeed In Moving " + MoveResult + " Layer")
        } else {
            sketch.UI.message("Fail In Moving")
        }
    } else {
        sketch.UI.message("Please Select 1 or More Layers")

    }
    //GA
    GA(":-)")
}