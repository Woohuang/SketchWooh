import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let UI = require('sketch/ui')

import GA from "./modules/Google Analytics Method"

export default function() {

    let SelectFormat = new String()
    let SelectResult = 0
        //start main function
    UI.getInputFromUser(
        "选择图层类型", {
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
    sketch.UI.message("Succeed In Selecting " + SelectResult + " Layer(s)")

    //GA
    GA("NormalResult")
}