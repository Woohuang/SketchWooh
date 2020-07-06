import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function () {
    Selection.forEach(item => {
        //item.frame.x = 0
        //item.frame.y = 0
        item.frame.height = item.getParentArtboard().frame.height
    })
}