import sketch from "sketch";
import { GA } from "./modules/xscapeFunctions";
let doc = sketch.getSelectedDocument(),
    selections = doc.selectedLayers.layers;

export default function() {
    //angle convertion function
    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    //number sorting function
    function sortNumber(a, b) {
        return a - b;
    }

    //main function begins
    let string = NSPasteboard.generalPasteboard().stringForType(
        NSPasteboardTypeString
    );
    let CopyNumber = (string - 0) * 1,
        SetSpacing,
        CopiedNumberResult = 1,
        ArrangeResult = 0;

    if (CopyNumber >= 0 || CopyNumber < 0) {
        SetSpacing = CopyNumber;
    } else {
        SetSpacing = 0;
        CopiedNumberResult = 0;
    }

    selections.forEach((item) => {
        if (item.type === "Group" && item.layers.length > 1) {
            let PositionArray = [];
            for (let i = 0, len = item.layers.length; i < len; i++) {
                PositionArray.splice(0, 0, item.layers[i].frame.y);
            }
            PositionArray = PositionArray.sort(sortNumber);
            let MinPosition = PositionArray[0];

            let ArrangedIndex = [];
            for (let i = 0, len = PositionArray.length; i < len; i++) {
                let MinPositionIndex = item.layers.findIndex(
                    (item2) => item2.frame.y === PositionArray[i]
                );
                item.layers[MinPositionIndex].frame.y =
                    item.layers[MinPositionIndex].frame.y + 0.00000000001;
                ArrangedIndex.splice(ArrangedIndex.length, 0, MinPositionIndex);
            }

            for (let i = 0, len = ArrangedIndex.length; i < len; i++) {
                item.layers[ArrangedIndex[i]].frame.y = MinPosition;
                let RotationPI = toRadians(
                    item.layers[ArrangedIndex[i]].transform.rotation
                );
                let Width = item.layers[ArrangedIndex[i]].frame.width,
                    Height = item.layers[ArrangedIndex[i]].frame.height;
                MinPosition =
                    MinPosition +
                    Math.abs(Width * Math.sin(RotationPI)) +
                    Math.abs(Height * Math.cos(RotationPI)) +
                    SetSpacing;
            }

            //adjust parent groups' frame
            let i = 0,
                findParentGroup = item;
            for (; i < 1;) {
                if (findParentGroup.type === "Group") {
                    findParentGroup.adjustToFit();
                    findParentGroup = findParentGroup.parent;
                } else {
                    i = 1;
                }
            }
            ArrangeResult = 1;
        }
    });

    if (CopiedNumberResult === 0 && ArrangeResult === 1) {
        sketch.UI.message("Try copying a Number~");
    }

    //empty pasteboard
    NSPasteboard.generalPasteboard().clearContents();
    //GA
    GA(":-)");
}