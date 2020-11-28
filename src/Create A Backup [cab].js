import sketch from 'sketch'
import { GA } from "./modules/xscapeFunctions"
let Document = require('sketch/dom').Document,
    doc = sketch.getSelectedDocument(),
    path = require('path')

//acquire date
import { dateFormat } from './modules/xscapeFunctions'
dateFormat()
let ThisDate = new Date().format("yyyy-MM-dd hh:mm:ss")

export default function() {

    if (doc.path !== undefined) {
        let docPath = doc.path.replace(),
            docName = path.basename(docPath),
            SaveName = "Backup_" + docName.replace(".sketch", "【" + ThisDate + "】" + ".sketch"),
            savePath = decodeURI(docPath.replace(docName, SaveName))

        doc.save(savePath, {
            saveMode: Document.SaveMode.SaveTo,
        })
        sketch.UI.message("Succeed In Backup  At " + ThisDate)
    } else {
        sketch.UI.message("Please Save The Document First")
        doc.save()
    }

    //GA
    GA(":-)")
}