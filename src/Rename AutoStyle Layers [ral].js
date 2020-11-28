import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {

    if (Selection.length > 0) {
        Selection.forEach(item => item.name = "AutoStyle")
    }
    //GA
    GA(":-)")
}