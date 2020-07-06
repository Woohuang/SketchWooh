import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let UI = require('sketch/ui')
let Selection = doc.selectedLayers.layers

export default function() {
    let SelectFormat = new String()
    let UnselectResult = 0
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
                Selection.forEach(item => {
                    if (item.type !== SelectFormat) {
                        item.selected = false
                        UnselectResult = UnselectResult + 1
                    }
                })
            }
        }
    )

    //toast result
    sketch.UI.message("Succeed In Unselecting " + UnselectResult + " Layer(s)")
}