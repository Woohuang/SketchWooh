import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
import { GA } from "./modules/xscapeF"

export default function() {

    let string = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    let CopyNumber = (string - 0) * 1
    let SetHeight

    if (CopyNumber > 0) {
        SetHeight = CopyNumber
    } else {
        sketch.UI.message("Try copying a Number~")
        SetHeight = 10
    }
    Selection.forEach(item => {
            item.frame.height = item.frame.height + SetHeight

            //adjust parent groups' frame
            let i = 0
            let findParentGroup = item.parent
            for (; i < 1;) {
                if (findParentGroup.type === "Group") {
                    findParentGroup.adjustToFit()
                    findParentGroup = findParentGroup.parent
                } else {
                    i = 1
                }
            }
        })
        //GA
    GA(":-)")
}