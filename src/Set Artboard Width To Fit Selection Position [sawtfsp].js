import sketch from 'sketch'
import { GA } from "./modules/xscapeFunctions"
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers

export default function() {
    let copiedString = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString) || '0',
        copiedNumber = (copiedString.split(">")[0] - 0) * 1 || 0,
        artboardSizeFilter = (copiedString.split(">")[1] - 0) * 1 || 0,
        copiedResult = (copiedNumber > 0 || artboardSizeFilter > 0)

    Selection.forEach(item => {
        //get each selection position
        let findParentGroup = item,
            findParentGroupPositionY = item.frame.y + item.frame.width
        for (;;) {
            if (findParentGroup.parent) {
                if (findParentGroup.parent.type === "Group") {
                    findParentGroup = findParentGroup.parent
                    findParentGroup.adjustToFit()
                    findParentGroupPositionY = findParentGroupPositionY + findParentGroup.frame.y
                } else {
                    break
                }
            }
        }

        //set size
        if (item.getParentArtboard().frame.width > artboardSizeFilter) {
            item.getParentArtboard().frame.width = findParentGroupPositionY + copiedNumber
        }
    })

    if (copiedResult === false) {
        sketch.UI.message('Try Copying A Number~')
    }

    //empty pasteboard
    NSPasteboard.generalPasteboard().clearContents()
        //GA
    GA(":-)")
}