import sketch from 'sketch'
let system = require("../modules/System")

export default function() {
    // Choose the new sketch file.
    let chooseFile = system.chooseFile(["sketch"]);
    if (!chooseFile) {
        return;
    }
    let count = 0;
    // Read the new sketch file.
    let fileURL = NSURL.fileURLWithPath(chooseFile);
    let error = MOPointer.alloc().init();
    let newDocument = MSDocument.alloc().init();
    newDocument.readFromURL_ofType_error(fileURL, "com.bohemiancoding.sketch.drawing", error);
    let wrappedDoc = sketch.fromNative(newDocument)

    console.log(wrappedDoc)

}