import sketch from 'sketch'
import { GA } from "./modules/xscapeF"
let doc = sketch.getSelectedDocument(),
    selections = doc.selectedLayers.layers

export default function() {

    selections.forEach(item => {
        item.selected = false
        if (item.index < item.parent.layers.length - 1) {
            item.parent.layers[item.index + 1].selected = true
        } else if (item.parent.parent.type === "Group" || item.parent.parent.type === "Artboard" || item.parent.parent.type === "Page") {
            item.parent.parent.layers[item.parent.index + 1].selected = true
        } else {
            item.selected = true
        }
    })

    //GA
    GA(":-)")
}