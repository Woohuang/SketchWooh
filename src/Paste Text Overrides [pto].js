import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
    //let SymbolInstance = require('sketch/dom').SymbolInstance
let Settings = require('sketch/settings')
import { GA } from "./modules/xscapeFunctions"

export default function() {

    //let CopiedInfo = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString).split("_.0._.0._.0._")
    let CopiedInfo = Settings.settingForKey('copySymbolInfo').split("_.0._.0._.0._")
    let CopiedId = CopiedInfo[0]
    let copiedOverrides = doc.getLayerWithID(CopiedId).overrides
        //let copiedOverridesLen = copiedOverrides.length
    let Result = 0

    Selection.forEach(item => {
        //read size info if exsits
        if (CopiedInfo[1] && CopiedInfo[2]) {
            item.frame.width = CopiedInfo[1]
            item.frame.height = CopiedInfo[2]
        }

        if (item.type === "SymbolInstance") {
            let itemTextOverrides = item.overrides.filter(item2 => item2.editable === true && item2.property === "stringValue"),
                copiedTextOverrides = copiedOverrides.filter(item2 => item2.editable === true && item2.property === "stringValue")

            for (let i = 0; i < copiedTextOverrides.length && i < itemTextOverrides.length; i++) {
                item.setOverrideValue(itemTextOverrides[i], copiedTextOverrides[i].value)
                Result = 1
            }
        }
    })
    if (Result === 1) {
        sketch.UI.message("Succeed In Replacing")
    } else {
        sketch.UI.message("Fail Because Of The Not Similar Symbol")
    }

    //GA
    GA(":-)")
}