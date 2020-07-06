import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let UI = require('sketch/ui')
let Selection = doc.selectedLayers.layers

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
                let SearchLayers = Selection.filter(item => item.name.indexOf(CopiedString) !== -1)

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

}