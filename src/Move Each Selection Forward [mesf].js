import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {

    Selection.forEach(item => {
        item.moveForward()
    })


    //GA
    GA("NormalResult")
}