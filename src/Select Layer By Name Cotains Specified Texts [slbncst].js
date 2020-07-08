import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let UI = require('sketch/ui')

import GA from "./modules/Google Analytics Method"

export default function() {

    let CopiedString = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    if (CopiedString === null) {
        CopiedString = ""
    }

    let SearchLayersLen = 0
    let SearchResult = 0

    //start main function
    UI.getInputFromUser(
        "Enter Keywords To Filter", {
            initialValue: CopiedString,
        },
        (err, value) => {
            if (err) {
                return
            }

            //start select
            else {
                CopiedString = value
                let SearchLayers = sketch.find('*', doc.selectedPage).filter(item => item.name.indexOf(CopiedString) !== -1)
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
    GA("NormalResult")
}