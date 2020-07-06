import sketch from 'sketch'
let doc = sketch.getSelectedDocument()

export default function() {
    if (sketch.find('*').length > 10) {
        console.log("Easy to Crash If Layers Quantity Greater Than 10")
    } else {
        console.log(doc)
    }
}