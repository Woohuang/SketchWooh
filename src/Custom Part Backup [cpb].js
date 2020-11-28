import sketch from 'sketch'
let Document = require('sketch/dom').Document
let path = require('path')
    //var SharedStyle = require('sketch/dom').SharedStyle
import { GA } from "./modules/xscapeFunctions"

export default function() {
    const doc = sketch.getSelectedDocument()
    const doc_pages = doc.pages
    const TS_text_styles = doc.sharedTextStyles
    const TS_layer_styles = doc.sharedLayerStyles
    const TS_colors = doc.colors
    var TS_Custom
    var TS_CustomStyles
    var TS_IrregularTxtStyles
    for (let i = 0, len = doc_pages.length; i < len; i++) {
        if (doc_pages[i].name === "Custom") {
            TS_Custom = doc_pages[i]
        }
    }
    for (let i = 0, len = doc_pages.length; i < len; i++) {
        if (doc_pages[i].name === "CustomStyles") {
            TS_CustomStyles = doc_pages[i]
        }
    }
    for (let i = 0, len = doc_pages.length; i < len; i++) {
        if (doc_pages[i].name === "IrregularTxtStyles") {
            TS_IrregularTxtStyles = doc_pages[i]
        }
    }
    doc.save()
    doc.close()
    var backup_doc = new Document()
    backup_doc.sharedTextStyles = TS_text_styles
    backup_doc.sharedLayerStyles = TS_layer_styles
    backup_doc.colors = TS_colors
    backup_doc.pages = [TS_Custom, TS_CustomStyles, TS_IrregularTxtStyles]
    const doc_path = doc.path
    const save_path = decodeURI(doc_path.replace(".sketch", "-CustomBackup.sketch"))
    backup_doc.save(save_path, {
        saveMode: Document.SaveMode.SaveAs,
    })
    backup_doc.close()
    sketch.UI.alert("Done", " ")

    //GA
    GA(":-)")
}