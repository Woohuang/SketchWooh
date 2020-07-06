import sketch from 'sketch'
let Document = require('sketch/dom').Document
let doc = sketch.getSelectedDocument()
let path = require('path')

//引入时间戳
import { DateFormat } from './modules/Date Format'
DateFormat()
let ThisDate = new Date().format("yyyy-MM-dd hh:mm:ss")

export default function () {

  if (doc.path !== undefined) {
    let doc_path = doc.path.replace()
    let DocName = path.basename(doc_path)
    let SaveName = "Backup_" + DocName.replace(".sketch", "【" + ThisDate + "】" + ".sketch")
    let save_path = decodeURI(doc_path.replace(DocName, SaveName))

    doc.save(save_path, {
      saveMode: Document.SaveMode.SaveTo,
    })
    sketch.UI.message("Succeed In Backup  At " + ThisDate)
  }

  else {
    sketch.UI.message("请先保存文档")
    doc.save()
  }

}