import sketch from "sketch";
import { GA } from "./modules/xscapeF";
let Document = require("sketch/dom").Document,
    doc = sketch.getSelectedDocument(),
    path = require("path"),
    UI = require("sketch/ui");

//acquire date
import { dateFormat } from "./modules/xscapeF";
dateFormat();
let ThisDate = new Date().format("yyyy-MM-dd hh:mm:ss");

export default function() {
    if (doc.path !== undefined) {
        //write introduction
        let Introduction = new String();
        UI.getInputFromUser(
            "Enter Backup Instructions", {
                initialValue: "",
                numberOfLines: 1,
            },
            (err, value) => {
                if (err) {
                    return;
                } else {
                    Introduction = value;
                }
            }
        );
        let doc_path = doc.path.replace(),
            docName = path.basename(doc_path),
            SaveName =
            "Backup_" +
            docName.replace(
                ".sketch",
                "【" + ThisDate + "】" + Introduction + ".sketch"
            ),
            save_path = decodeURI(doc_path.replace(docName, SaveName));

        doc.save(save_path, {
            saveMode: Document.SaveMode.SaveTo,
        });
        sketch.UI.message("Succeed In Backup  At " + ThisDate);
    } else {
        sketch.UI.message("Please Save The Document First");
        doc.save();
    }

    //GA
    GA(":-)");
}