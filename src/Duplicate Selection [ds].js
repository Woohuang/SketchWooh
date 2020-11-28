import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {

    Selection.forEach(item => {
            let AddItem = item.duplicate()
            AddItem.parent = item.parent
            AddItem.index = item.index
        })
        //GA
    GA(":-)")
}