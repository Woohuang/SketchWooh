import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {

    let string = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    let CopyNumber = (string - 0) * 1
    let SetWidth

    if (CopyNumber > 0) {
        SetWidth = CopyNumber
    } else {
        sketch.UI.message("Try copying a Number~")
        SetWidth = 10
    }
    Selection.forEach(item => item.frame.width = item.frame.width + SetWidth)

    //GA
    GA("NormalResult")
}