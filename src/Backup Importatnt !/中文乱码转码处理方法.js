import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
var path = require('path')

export default function () {
    console.log(decodeURI(doc.path))
}
