import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {
    Selection.forEach(item => {
        item.selected = false
        if (item.index > 0) {
            item.parent.layers[item.index - 1].selected = true
        } else {
            item.selected = true
        }
    })
}