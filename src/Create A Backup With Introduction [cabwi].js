import sketch from 'sketch'
let Document = require('sketch/dom').Document
let UI = require('sketch/ui')
let doc = sketch.getSelectedDocument()
let path = require('path')

//acquire date
import { DateFormat } from './modules/Date Format'
DateFormat()
let ThisDate = new Date().format("yyyy-MM-dd hh:mm:ss")

import GA from "./modules/Google Analytics Method"

export default function() {

    if (doc.path !== undefined) {

        //write introduction
        let Introduction = new String()
        UI.getInputFromUser(
            "Enter Backup Instructions", {
                initialValue: '',
                numberOfLines: 1,
            },
            (err, value) => {
                if (err) {
                    return
                } else {
                    Introduction = value
                }
            }
        )
        let doc_path = doc.path.replace()
        let DocName = path.basename(doc_path)
        let SaveName = "Backup_" + DocName.replace(".sketch", "【" + ThisDate + "】" + Introduction + ".sketch")
        let save_path = decodeURI(doc_path.replace(DocName, SaveName))

        doc.save(save_path, {
            saveMode: Document.SaveMode.SaveTo,
        })
        sketch.UI.message("Succeed In Backup  At " + ThisDate)
    } else {
        sketch.UI.message("Please Save The Document First")
        doc.save()
    }


    //GA
    GA("NormalResult")
}