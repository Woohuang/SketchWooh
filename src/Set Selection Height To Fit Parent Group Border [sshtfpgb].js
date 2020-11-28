import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {

    Selection.forEach(item => {
        if (item.parent !== undefined) {
            item.frame.height = item.parent.frame.height - item.frame.y
            sketch.UI.message("Succeed")
        } else {
            sketch.UI.message("No Parent Group")
        }
    })

    //GA
    GA(":-)")
}