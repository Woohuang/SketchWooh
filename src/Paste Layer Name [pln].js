import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {

    let CopiedLayerName = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)

    if (Selection.length > 0) {
        if (CopiedLayerName) {
            Selection.forEach(item => item.name = CopiedLayerName)
        }

        //若剪贴板为空，默认命名为 item#
        else {
            Selection.forEach(item => item.name = "item#")
        }
        sketch.UI.message("Succeed In Renaming")
    }

    //empty pasteboard
    NSPasteboard.generalPasteboard().clearContents()

    //GA
    GA("NormalResult")
}