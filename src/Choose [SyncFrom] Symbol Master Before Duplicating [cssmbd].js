import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { CopyStringToPasteboard } from "./modules/Copy String To Pasteboard"

import GA from "./modules/Google Analytics Method"

export default function() {
    let SelectResult = 0

    //judge selection format
    if (Selection.length === 1) {
        if (Selection[0].type === "SymbolMaster") {
            if (Selection[0].name.indexOf("Sync") !== -1 && Selection[0].name.indexOf("From") !== -1) {
                CopyStringToPasteboard(Selection[0].symbolId)
                SelectResult = 1
            }
        }
    }
    if (SelectResult === 1) {
        sketch.UI.message('Succeed In Getting SyncFrom Symbol Master')
    } else {
        sketch.UI.message('Fail In Getting SyncFrom Symbol Master')
    }

    //GA
    GA("NormalResult")
}