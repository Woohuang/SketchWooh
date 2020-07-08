import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {
    Selection.forEach(item => {
        item.selected = false
        if (item.index > 0) {
            item.parent.layers[item.index - 1].selected = true
        } else {
            item.selected = true
        }
    })

    //GA
    GA("NormalResult")
}