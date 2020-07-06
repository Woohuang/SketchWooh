import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { CopyStringToPasteboard } from "./modules/Copy String To Pasteboard"

export default function() {
    if (Selection.length === 1) {
        CopyStringToPasteboard(Selection[0].name)
    } else {
        sketch.UI.message("Please Select 1 Layer")
    }
}