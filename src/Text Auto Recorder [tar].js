import sketch from 'sketch'
import { GA } from "./modules/xscapeFunctions" 
import { userInfo } from './modules/xscapeFunctions'
import sketchModuleGoogleAnalytics from 'sketch-module-google-analytics'
let fs = require("@skpm/fs"),
    UI = require('sketch/ui'),
    doc = sketch.getSelectedDocument()

sketch.UI.message('This Feature Is Being Developed')

/*
export default function() {
    //auto switch settings
    let autoTextRecorderKey
    UI.getInputFromUser(
        "Turn On Text Auto Recorder", {
            type: UI.INPUT_TYPE.selection,
            possibleValues: ["Yes", "No"],
        },
        (err, value) => {
            if (err) {
                return
            } else {
                userInfo.set('p', 'autoTextRecorderKey', value)
                autoTextRecorderKey = value
            }
        }
    )
    GA(":-)")
}

export function textRecorder(context) {
    //judge auto switch states
    if (userInfo.get('p', 'autoTextRecorderKey') === 'Yes') {
        let ocActionLayer = context.actionContext.layer,
            actionLayer = sketch.fromNative(ocActionLayer),
            savePath = decodeURI(doc.path.replace('.sketch', '.csv'))

        //if text layer
        if (actionLayer.type === "Text" && context.actionContext.new !== context.actionContext.old) {
            appendToCsv(savePath, generateTxtCsv(actionLayer))
        }
        //if symbol override
        else if (actionLayer.type == "symbolInstance") {}
    } else {}
    GA("textRecorder")
}

function generateTxtCsv(sketchLayer) {
    //collect text layer info to csv
    let time = new Date(),
        nowDate = time.getFullYear() + '-' + (time.getMonth() + 1) + '-' + time.getDate()
    return csvFormat(nowDate) + ',' + csvFormat(sketchLayer.text) + ',' + 'Text Layer' + ',' + csvFormat(sketchLayer.getParentArtboard().name) + "\n"
}

function csvFormat(string) {
    string.replace(/(?<!")"/g, '"')
    if (string.indexOf(',') !== -1) {
        string = '"' + string + '"'
    }
    return string
}

function appendToCsv(path, csvFormatString) {
    fs.appendFileSync(path, csvFormatString)
}    
*/