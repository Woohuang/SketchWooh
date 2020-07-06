import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function () {

    Selection.forEach(item => {
        item.moveForward()
    })
}