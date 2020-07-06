import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {

    Selection.forEach(item => {
        item.selected = false
        if (item.type === "SymbolMaster") {
            let newInstance = item.createNewInstance()
            newInstance.parent = doc.selectedPage
            newInstance.frame.x = item.frame.x + item.frame.width + 10
            newInstance.frame.y = item.frame.y
            newInstance.selected = true
        }
    })
}