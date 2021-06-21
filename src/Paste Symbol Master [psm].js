import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
let Settings = require('sketch/settings')
import { GA } from "./modules/xscapeF"

export default function() {

    let CopiedInfo = Settings.settingForKey('copySymbolInfo').split("_.0._.0._.0._"),
        CopiedId = CopiedInfo[0],
        CopiedSymbolMaster = doc.getLayerWithID(CopiedId).master,
        CopiedOverrides = doc.getLayerWithID(CopiedId).overrides,
        CopiedOverridesLen = CopiedOverrides.length,
        Result = 0

    Selection.forEach(item => {

        if (item.type === "SymbolInstance") {
            //read size info if exsits
            if (CopiedInfo[1] && CopiedInfo[2]) {
                item.frame.width = CopiedInfo[1]
                item.frame.height = CopiedInfo[2]
            }

            //replace symbol master
            item.master = CopiedSymbolMaster

            //replace text overrides 
            if (item.overrides.length === CopiedOverridesLen) {
                for (let i = 0; i < CopiedOverridesLen && i < item.overrides.length; i++) {
                    if (item.overrides[i].editable === true && item.overrides[i].affectedLayer.type === CopiedOverrides[i].affectedLayer.type && CopiedOverrides[i].affectedLayer.type !== "Text") {
                        item.setOverrideValue(item.overrides[i], CopiedOverrides[i].value)
                        Result = 1
                    }
                }
            }
            Result = 1
        }
    })

    if (Result === 1) {
        sketch.UI.message("Succeed In Replacing")
    } else {
        sketch.UI.message("Fail In Replacing")
    }
    //GA
    GA(":-)")
}