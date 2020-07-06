import sketch from 'sketch'
let settings = require('sketch/settings')
let doc = sketch.getSelectedDocument()

export default function () {
    console.log("start")

    if (!settings.sessionVariable('SymbolInfoSave')) {
        settings.setSessionVariable('SymbolInfoSave', { LibraryName: null, SavedMasters: [] })
    }

}