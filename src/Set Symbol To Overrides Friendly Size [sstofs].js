import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeF"

export default function() {
    let SelectedSymbols = Selection.filter(item => item.type === "SymbolInstance")
    SelectedSymbols.forEach(item => {
            item.resizeWithSmartLayout()
        })
        //GA
    GA(":-)")
}