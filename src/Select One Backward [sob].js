import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeF"

export default function() {

    Selection.forEach(item => {
        if (item.index > 0) {
            item.parent.layers[item.index - 1].selected = true
        } else if (item.parent.parent.type === "Group" || item.parent.parent.type === "Artboard" || item.parent.parent.type === "Page") {
            item.parent.parent.layers[item.parent.index - 1].selected = true
        }
    })

    //GA
    GA(":-)")
}