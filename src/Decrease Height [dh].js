import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function () {

    let string = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    let CopyNumber = (string-0)*1
    let SetHeight

    if (CopyNumber > 0) {
        SetHeight = CopyNumber
    } else {
        sketch.UI.message("Try copying a Number~")
        SetHeight = 10
    }
    Selection.forEach(item => item.frame.height = item.frame.height - SetHeight)
}