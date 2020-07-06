import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {

    //角度转换弧度 function
    function toRadians(angle) {
        return angle * (Math.PI / 180);
    }

    //数字大小排序 function
    function sortNumber(a, b) {
        return a - b
    }

    //主要功能开始

    let string = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    let CopyNumber = (string - 0) * 1
    let SetSpacing
    let CopiedNumberResult = 1
    let ArrangeResult = 0

    if (CopyNumber >= 0 || CopyNumber < 0) {
        SetSpacing = CopyNumber
    } else {
        SetSpacing = 0
        CopiedNumberResult = 0
    }

    Selection.forEach(item => {

        if (item.type === "Group" && item.layers.length > 1) {

            let PositionArray = []
            for (let i = 0, len = item.layers.length; i < len; i++) {
                PositionArray.splice(0, 0, item.layers[i].frame.x)
            }
            PositionArray = PositionArray.sort(sortNumber)
            let MinPosition = PositionArray[0]

            let ArrangedIndex = []
            for (let i = 0, len = PositionArray.length; i < len; i++) {
                let MinPositionIndex = item.layers.findIndex(item2 => item2.frame.x === PositionArray[i])
                item.layers[MinPositionIndex].frame.x = item.layers[MinPositionIndex].frame.x + 0.00000000001
                ArrangedIndex.splice(ArrangedIndex.length, 0, MinPositionIndex)
            }

            for (let i = 0, len = ArrangedIndex.length; i < len; i++) {
                item.layers[ArrangedIndex[i]].frame.x = MinPosition
                let RotationPI = toRadians(item.layers[ArrangedIndex[i]].transform.rotation)
                let Width = item.layers[ArrangedIndex[i]].frame.width
                let Height = item.layers[ArrangedIndex[i]].frame.height
                MinPosition = MinPosition + Math.abs(Width * Math.cos(RotationPI)) + Math.abs(Height * Math.sin(RotationPI)) + SetSpacing
            }

            item.adjustToFit()

            ArrangeResult = 1

        }
    })

    if (CopiedNumberResult === 0 && ArrangeResult === 1) {
        sketch.UI.message("Try copying a Number~")
    }

    //清空剪贴板
    NSPasteboard.generalPasteboard().clearContents()
}