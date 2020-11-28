import sketch from "sketch";
import { GA } from "./modules/xscapeFunctions";
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers,
    Settings = require("sketch/settings");

export default function() {
    if (Selection.length === 1 && Selection[0].type === "SymbolInstance") {
        let SelectedInfo =
            Selection[0].id +
            "_.0._.0._.0._" +
            Selection[0].frame.width +
            "_.0._.0._.0._" +
            Selection[0].frame.height;
        Settings.setSettingForKey("copySymbolInfo", SelectedInfo);
    } else {
        sketch.UI.message("Please Select 1 Symbol");
    }
    //GA
    GA(":-)");
}