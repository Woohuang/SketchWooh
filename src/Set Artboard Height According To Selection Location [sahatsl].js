import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {
    let string = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    let CopyNumber = 0
    let SetSize = 0
    let CopyResult = 0

    if (string !== null) {
        CopyNumber = (string.split(">")[0] - 0) * 1
        SetSize = (string.split(">")[1] - 0) * 1
    }

    if (CopyNumber > 0 || CopyNumber <= 0) {
        CopyResult = 1
    } else {
        CopyNumber = 0
    }

    Selection.forEach(item => {
        if (SetSize > 0) {
            if (item.getParentArtboard().frame.height > SetSize) {
                item.getParentArtboard().frame.height = item.frame.y + item.frame.height + CopyNumber
            }
        } else {
            item.getParentArtboard().frame.height = item.frame.y + item.frame.height + CopyNumber
        }
    })

    if (CopyResult === 0) {
        sketch.UI.message("Try copying a Number~")
    }

    //empty pasteboard
    NSPasteboard.generalPasteboard().clearContents()

    //GA
    GA("NormalResult")
}