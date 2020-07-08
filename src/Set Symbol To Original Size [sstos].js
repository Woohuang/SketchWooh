import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {
    let SelectedSymbols = Selection.filter(item => item.type === "SymbolInstance")
    SelectedSymbols.forEach(item => {
        item.frame.width = item.master.frame.width
        item.frame.height = item.master.frame.height
    })

    //GA
    GA("NormalResult")
}