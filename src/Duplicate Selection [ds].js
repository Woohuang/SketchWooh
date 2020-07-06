import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function () {

    Selection.forEach(item => {
        let AddItem = item.duplicate()
        AddItem.parent = item.parent
        AddItem.index = item.index
    })
}