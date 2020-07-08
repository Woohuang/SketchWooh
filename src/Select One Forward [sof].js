import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {

    Selection.forEach(item => {
        if (item.index < item.parent.layers.length - 1) {
            item.parent.layers[item.index + 1].selected = true
        } else {
            item.selected = true
        }
    })

    //GA
    GA("NormalResult")
}