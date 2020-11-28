import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {

    let CommandResult = 0
    Selection.forEach(item => {
        if (item.type === "Group") {
            item.sketchObject.hasClickThrough = 0
            CommandResult = CommandResult + 1
        }
    })

    if (CommandResult === 0) {
        sketch.UI.message("Please Select At Least 1 Group")
    } else {
        sketch.UI.message("Succeed In Disabling " + CommandResult + " Group")
    }

    //GA
    GA(":-)")
}