import sketch from "sketch";
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers,
    UI = require('sketch/ui'),
import { GA } from "./modules/xscapeF";

export default function () {
    let newName

    UI.getInputFromUser(
        "Enter New Name", {
        initialValue: 'item#',
    },
        (err, value) => {
            if (err) {
                return
            }

            else {
                newName = value
            }
        }
    )

    if (Selection.length > 0) {
        if (newName) {
            Selection.forEach((item) => (item.name = newName));
        }

        else {
            return
        }
        sketch.UI.message("Succeed In Renaming");
    }

    //GA
    GA(":-)");
}
