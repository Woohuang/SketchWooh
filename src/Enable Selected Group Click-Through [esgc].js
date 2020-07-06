import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {

    let CommandResult = 0
    Selection.forEach(item => {
        if (item.type === "Group") {
            item.sketchObject.hasClickThrough = 1
            CommandResult = CommandResult + 1
        }
    })

    if (CommandResult === 0) {
        sketch.UI.message("请至少选中1个Group")
    } else {
        sketch.UI.message("Succeed In Enabling " + CommandResult + " Group(s)")
    }

}