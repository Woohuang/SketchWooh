import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {
    if (Selection.length > 10) {
        console.log("Easy to Crash If Layers Quantity Greater Than 10")
    } else {
        console.log(Selection)
    }

    //GA
    GA("NormalResult")
}