import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function () {

  const LinkPngOptions = { formats: 'png', output: false }

  if (Selection.length === 1 && Selection[0].type === "Artboard") {

    let LinkPng = sketch.export(Selection[0], LinkPngOptions).toNSData()
    var pasteboard = NSPasteboard.generalPasteboard()
    pasteboard.clearContents()
    pasteboard.setData_forType(LinkPng, NSPasteboardTypePNG)
  }

}