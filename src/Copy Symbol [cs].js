import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { CopyStringToPasteboard } from "./modules/Copy String To Pasteboard"

import GA from "./modules/Google Analytics Method"

export default function() {
    if (Selection.length === 1 && Selection[0].type === "SymbolInstance") {
        CopyStringToPasteboard(Selection[0].id)
    } else {
        sketch.UI.message("Please Select 1 Symbol")
    }

    //GA
    GA("NormalResult")
}