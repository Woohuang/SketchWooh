import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {
    Selection.forEach(item => {
        //item.frame.x = 0
        //item.frame.y = 0
        item.frame.height = item.getParentArtboard().frame.height
    })

    //GA
    GA("NormalResult")
}