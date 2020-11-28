import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let UI = require('sketch/ui')
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeFunctions"

export default function() {

    let CopiedString = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    if (CopiedString === null) {
        CopiedString = ""
    }

    let SearchResult = 0

    //start main function
    UI.getInputFromUser(
        "Input Key Text", {
            initialValue: CopiedString,
        },
        (err, value) => {
            if (err) {
                return
            }

            //start select
            else {
                CopiedString = value
                let SearchLayers = Selection.filter(item => {
                    if (item.type === 'Text') {
                        return item.text.indexOf(CopiedString) !== -1
                    } else if (item.type === 'SymbolInstance') {
                        return item.overrides.findIndex(item2 => item2.affectedLayer.type === "Text" && item2.value.indexOf(CopiedString) !== -1) !== -1
                    } else {
                        return false
                    }
                })
                SearchLayers.forEach(item => {
                    item.selected = false
                    SearchResult = SearchResult + 1
                })

                //toast result
                if (SearchResult > 0) {
                    sketch.UI.message("Succeed In Unselecting " + SearchResult + " Layers That Name Contains [" + CopiedString + "]")
                } else {
                    sketch.UI.message("No Object Fits")
                }
            }
        }
    )

    //GA
    GA(":-)")
}