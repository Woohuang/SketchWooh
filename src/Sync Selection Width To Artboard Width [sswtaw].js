import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {
    Selection.forEach(item => {
        item.frame.width = item.getParentArtboard().frame.width
    })

    //GA
    GA(":-)")
}