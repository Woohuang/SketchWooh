import sketch from "sketch";
import { GA } from "./modules/xscapeFunctions";
let doc = sketch.getSelectedDocument(),
    selection = doc.selectedLayers.layers;

export default function() {
    let RenameResult = 0;
    if (selection.length > 0) {
        selection.forEach((item) => {
            if (item.sharedStyleId !== null) {
                item.sharedStyle.name = item.name;
                RenameResult++;
            }
        });
        if (RenameResult === 0) {
            sketch.UI.message(
                "The Selected Layers Has No Shared Layer Or Text Styles"
            );
        } else {
            sketch.UI.message("Succeed In Renaming " + RenameResult + " Styles");
        }
    } else {
        sketch.UI.message("Please Select At Least  1 Layer");
    }

    //GA
    GA(":-)");
}