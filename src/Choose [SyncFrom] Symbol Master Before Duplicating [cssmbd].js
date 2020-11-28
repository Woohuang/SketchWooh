import sketch from 'sketch'
import { copyStringToPasteboard } from "./modules/xscapeF"
import { GA } from "./modules/xscapeF"
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers

export default function() {
    let SelectResult = 0

    //judge selection format
    if (Selection.length === 1) {
        if (Selection[0].type === "SymbolMaster") {
            if (Selection[0].name.indexOf("Sync") !== -1 && Selection[0].name.indexOf("From") !== -1) {
                copyStringToPasteboard(Selection[0].symbolId)
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
    GA(":-)")
}