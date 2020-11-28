import sketch from 'sketch'
let doc = sketch.getSelectedDocument()

export default function() {

    let docPath = decodeURI(doc.path)
    if (docPath === "undefined") {
        sketch.UI.message("Please Save The Document First")
        doc.save()
    } else {
        showDocInFinder(docPath)
    }

    function showDocInFinder(newPath) {
        NSWorkspace.sharedWorkspace().activateFileViewerSelectingURLs([newPath])
        sketch.UI.message("Watching Your Finder")
    }

}