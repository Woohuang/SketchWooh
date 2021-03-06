import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { copyStringToPasteboard } from "./modules/xscapeF"
import { GA } from "./modules/xscapeF"

export default function() {
    if (Selection.length === 1) {
        copyStringToPasteboard(Selection[0].name)
    } else {
        sketch.UI.message("Please Select 1 Layer")
    }
    //GA
    GA(":-)")
}