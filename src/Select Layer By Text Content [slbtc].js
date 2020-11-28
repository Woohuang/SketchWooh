import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let UI = require('sketch/ui')
import { GA } from "./modules/xscapeF"

export default function() {
    doc.selectedLayers.clear()

    let CopiedString = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    if (CopiedString === null) {
        CopiedString = ""
    }

    let SearchLayersLen = 0
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
                let SearchTexts = sketch.find('Text', doc.selectedPage).filter(item => item.text.indexOf(CopiedString) !== -1)
                let SearchInstances = sketch.find('SymbolInstance', doc.selectedPage).filter(item => item.overrides.findIndex(item2 => item2.affectedLayer.type === "Text" && item2.value.indexOf(CopiedString) !== -1) !== -1)
                let SearchLayers = SearchTexts.concat(SearchInstances)
                SearchLayersLen = SearchLayers.length
                SearchLayers.forEach(item => {
                    item.selected = true
                    SearchResult = 1
                })

                //toast result
                if (SearchResult === 1) {
                    sketch.UI.message("Succeed In Selecting " + SearchLayersLen + " Layers That Name Contains [" + CopiedString + "]")
                } else {
                    sketch.UI.message("No Object Fits")
                }
            }
        }
    )

    //GA
    GA(":-)")
}