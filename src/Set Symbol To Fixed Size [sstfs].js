import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {
    let SelectedSymbols = []
    for (let i = 0, len = Selection.length; i < len; i++) {
        if (Selection[i].type === "SymbolInstance") {
            SelectedSymbols.splice(SelectedSymbols.length, 0, Selection[i])
        }
    }
    SelectedSymbols.forEach(item => {
            let SettedSize = (item.overrides.find(item2 => item2.affectedLayer.name === "固定尺寸(格式: Width*Height)") || {}).value.split("*", 2)
            let SettedWidth = SettedSize[0]
            let SettedHeight = SettedSize[1]
            if (+SettedWidth > 0) { item.frame.width = SettedWidth }
            if (+SettedHeight > 0) { item.frame.height = SettedHeight }
            if (item.parent.type === "Group") {
                item.parent.adjustToFit()
            }
        })
        //GA
    GA(":-)")
}