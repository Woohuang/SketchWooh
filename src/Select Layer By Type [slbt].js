import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let UI = require('sketch/ui')
import { GA } from "./modules/xscapeFunctions"

export default function() {
    doc.selectedLayers.clear()

    let SelectFormat = new String()
    let SelectResult = 0
        //start main function
    UI.getInputFromUser(
        "Choose Layer Type", {
            type: UI.INPUT_TYPE.selection,
            possibleValues: ['Artboard', 'Group', 'Text', 'ShapePath', 'SymbolInstance', 'Image', 'Slice', 'HotSpot'],
        },
        (err, value) => {
            if (err) {
                return
            }

            //start select
            else {
                SelectFormat = value
                sketch.find(SelectFormat, doc.selectedPage).forEach(item => {
                    item.selected = true
                    SelectResult = SelectResult + 1
                })
            }
        }
    )

    //toast result
    sketch.UI.message("Succeed In Selecting " + SelectResult + " Layer")
        //GA
    GA(":-)")
}