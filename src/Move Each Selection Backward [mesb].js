import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeF"

export default function() {

    Selection.forEach(item => {
            item.index = item.index - 1
        })
        //GA
    GA(":-)")
}