import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {
    let RenameResult = 0

    if (Selection.length > 0) {
        Selection.forEach(item => {
            if (item.sharedStyleId !== null) {
                item.sharedStyle.name = item.name
                RenameResult++
            }
        })
        sketch.UI.message("Succeed In Renaming " + RenameResult + " Styles")
    } else {
        sketch.UI.message("Please Select At Least  1 Layer")
    }


    //GA
    GA("NormalResult")
}