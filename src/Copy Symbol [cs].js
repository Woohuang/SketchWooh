import sketch from 'sketch'
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers,
    Settings = require('sketch/settings')
import { GA } from "./modules/xscapeFunctions"

export default function() {

    if (Selection.length === 1 && Selection[0].type === "SymbolInstance") {
        Settings.setSettingForKey('copySymbolInfo', Selection[0].id)
    } else {
        sketch.UI.message("Please Select 1 Symbol")
    }

    //GA
    GA(":-)")
}