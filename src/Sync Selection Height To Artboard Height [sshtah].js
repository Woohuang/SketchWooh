import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {
    Selection.forEach(item => {
            item.frame.height = item.getParentArtboard().frame.height

        })
        //GA
    GA(":-)")
}