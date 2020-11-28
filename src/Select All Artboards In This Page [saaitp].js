import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
import { GA } from "./modules/xscapeF"

export default function() {
    doc.selectedLayers.clear()
    doc.selectedPage.layers.filter(item => item.type === "Artboard" || item.type === "SymbolMaster").forEach(item => {
        item.selected = true
    })
    sketch.UI.message("Succeed In Selecting " + doc.selectedPage.layers.filter(item => item.type === "Artboard" || item.type === "SymbolMaster").length + " Artbaord")
        //GA
    GA(":-)")
}