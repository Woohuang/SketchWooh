import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
let Settings = require('sketch/settings')
import { GA } from "./modules/xscapeF"

export default function() {

    //read stored ArtboardIds info
    let LogTexts = Selection.filter(item => Settings.layerSettingForKey(item, 'ArtboardIds') !== undefined)

    //selected LogTexts num > 0
    if (LogTexts.length > 0) {

        //acquire all artboards
        let AllArtboards = []
        doc.pages.forEach(item => {
            AllArtboards = AllArtboards.concat(item.layers.filter(item => item.type === "Artboard"))
        })

        //acquire log artboards ids
        let ArtboardIdString = new String()
        let ArtboardIds = []
        let SelecteResult = 0

        LogTexts.forEach(item => {
            ArtboardIdString = ArtboardIdString + Settings.layerSettingForKey(item, 'ArtboardIds')
        })
        ArtboardIdString.split("_next_").forEach(item => {
            if (ArtboardIds.findIndex(item2 => item2 === item) === -1) {
                ArtboardIds.splice(0, 0, item)
            }
        })

        //select log artboards
        ArtboardIds.forEach(item => {
            let ThisArtboardIndex = AllArtboards.findIndex(item2 => item2.id === item)
            if (ThisArtboardIndex !== -1) {
                AllArtboards[ThisArtboardIndex].selected = true
                SelecteResult = SelecteResult + 1
            }
        })

        //toast result
        sketch.UI.message("Succeed In Selecting " + SelecteResult + " Artboards")
    }

    //selected LogTexts num < 0
    else {
        sketch.UI.message("Please Select At Least 1 Log Text Layer")
    }

    //GA
    GA(":-)")
}