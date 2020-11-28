import sketch from 'sketch'
let Page = require('sketch/dom').Page
let Group = require('sketch/dom').Group
let UI = require('sketch/ui')
let Text = sketch.Text
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
let Settings = require('sketch/settings')

//acquire date
import { dateFormat } from './modules/xscapeFunctions'
dateFormat()
let ThisDay = new Date().format("yyyy-MM-dd")
let ThisTime = new Date().format("yyyy-MM-dd hh:mm:ss")
import { GA } from "./modules/xscapeFunctions"

export default function() {

    let LogPage, LogGroup, LogGroupY

    //set log page
    if (doc.pages.findIndex(item => item.name === "🗞️ChangeLog") === -1) {
        LogPage = new Page({
            name: '🗞️ChangeLog'
        })
        LogPage.parent = doc
    }
    LogPage = doc.pages.find(item => item.name === "🗞️ChangeLog")

    //set new log group
    if (LogPage.layers.findIndex(item => item.name === ThisDay) === -1) {
        LogGroup = new Group({
            name: ThisDay
        })
        if (LogPage.layers.length === 0) {
            LogGroupY = 0
        } else {
            LogGroupY = LogPage.layers[0].frame.y + LogPage.layers[0].frame.height + 50
        }
        LogGroup.parent = LogPage
        LogGroup.index = 0
        LogGroup.frame.x = 0
        LogGroup.frame.y = LogGroupY
        LogGroup.frame.width = 0
        LogGroup.frame.height = 0
    }
    LogGroup = LogPage.layers[0]

    //acquire selected artboard names
    let ThisArtboardName, ThisArtboardId
    let ArtboardNames = new String()
    let ArtboardIds = new String()
    let ArtboardNum = 0

    for (let i = 0, len = Selection.length; i < len; i++) {

        //set selected artboard names
        if (Selection[i].type === "Artboard") {
            ThisArtboardName = Selection[i].name
            ThisArtboardId = Selection[i].id
        } else if (Selection[i].getParentArtboard().type === "Artboard") {
            ThisArtboardName = Selection[i].getParentArtboard().name
            ThisArtboardId = Selection[i].getParentArtboard().id
        } else {
            ThisArtboardName = undefined
            ThisArtboardId = undefined
        }

        //compile selected artboard names
        if (ArtboardNames.indexOf(ThisArtboardName) === -1) {
            ArtboardNum = ArtboardNum + 1
            ArtboardNames = ArtboardNames + "\n" + ArtboardNum + "." + ThisArtboardName
            ArtboardIds = ArtboardIds + "_next_" + ThisArtboardId
        }
    }

    if (ArtboardNum > 0) {

        //acquire log content
        let LogContent
        UI.getInputFromUser(
            "Selected " + ArtboardNum + " Artboard" + ":" + ArtboardNames, {
                initialValue: 'Enter Change Log',
                numberOfLines: 3,
            },
            (err, value) => {
                if (err) {
                    return
                } else {
                    //set log text
                    LogContent = value
                    let ChangeLogTxt = new Text({
                        text: "⌨️ Log:" + "\n" + LogContent + "\n" + "🖱️ Pages:" + ArtboardNames,
                        parent: LogGroup
                    })
                    ChangeLogTxt.name = ThisTime
                    ChangeLogTxt.frame.x = 0
                    ChangeLogTxt.frame.y = LogGroup.frame.height + 20
                    ChangeLogTxt.index = 0
                    ChangeLogTxt = LogGroup.layers[0]
                    Settings.setLayerSettingForKey(ChangeLogTxt, 'ArtboardIds', ArtboardIds)
                    LogGroup.adjustToFit()
                    sketch.UI.message("Succeed In Logging")
                }
            }
        )
    } else {
        sketch.UI.message("Please Select At Least 1 Artboard")
    }

    //GA
    GA(":-)")
}