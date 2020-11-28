import sketch from 'sketch'
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers,
    Settings = require('sketch/settings')
import { GA } from "./modules/xscapeF"

export default function() {

    let CopiedInfo = Settings.settingForKey('copySymbolInfo').split("_.0._.0._.0._"),
        CopiedId = CopiedInfo[0],
        CopiedOverrides = doc.getLayerWithID(CopiedId).overrides,
        CopiedOverridesLen = CopiedOverrides.length,
        Result = 0
    Selection.forEach(item => {

        //read size info if exsits
        if (CopiedInfo[1] && CopiedInfo[2]) {
            item.frame.width = CopiedInfo[1]
            item.frame.height = CopiedInfo[2]
        }

        if (item.type === "SymbolInstance") {
            for (let i = 0; i < CopiedOverridesLen && i < item.overrides.length; i++) {
                if (item.overrides[i].editable === true && item.overrides[i].affectedLayer.type === CopiedOverrides[i].affectedLayer.type && CopiedOverrides[i].property !== "stringValue") {
                    item.setOverrideValue(item.overrides[i], CopiedOverrides[i].value)
                    Result = 1
                }
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