import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Settings = require('sketch/settings')
import { GA } from "./modules/xscapeF"

export default function() {

    //acquire Link_ layer
    let AllImg = sketch.find('Image', doc.selectedPage)
    let allLoseLinkPngs = AllImg.filter(item => item.name.indexOf("Link_") !== -1 && item.name.indexOf("Lose") !== -1)
    if (allLoseLinkPngs.length > 0) {

        //acquire all arrboards
        let allArtboards = []
        doc.pages.forEach(item => {
            allArtboards = allArtboards.concat(item.layers.filter(item => item.type === "Artboard"))
        })

        //collect Link_ names
        let NameArray = []
        for (let i = 0, len = allLoseLinkPngs.length; i < len; i++) {
            let artboartName = allLoseLinkPngs[i].name.split("Link_").pop()
            if (NameArray.findIndex(item => item === artboartName) === -1) {
                NameArray.splice(NameArray.length, 0, artboartName)
            }
        }

        //set export option
        const LinkPngOptions = { formats: 'png', output: false, scales: 1 }

        let fitArtboards
        let SyncResult = 0

        //start syncing
        NameArray.forEach(item => {

            fitArtboards = allArtboards.filter(item2 => item2.name === item)

            //name unique and available
            if (fitArtboards.length === 1) {
                let LinkArtboard = fitArtboards[0]
                let LinkPng = sketch.export(LinkArtboard, LinkPngOptions)
                let LinkPngLayer = sketch.createLayerFromData(LinkPng, 'bitmap')
                allLoseLinkPngs.filter(item2 => item2.name.split("Link_").pop() === item).forEach(item3 => {
                    item3.image = LinkPngLayer.image
                    item3.frame.width = LinkArtboard.frame.width
                    item3.frame.height = LinkArtboard.frame.height
                    item3.name = "🧶Link_" + LinkArtboard.name
                    item3.locked = true
                    SyncResult = SyncResult + 1

                    //LinkPngLayer 储存 Artboard id
                    Settings.setLayerSettingForKey(item3, 'ArtboardId', LinkArtboard.id)
                })
            }

            //id unavailable
            else if (fitArtboards.length > 1) {
                fitArtboards.forEach(item2 => {
                    item2.name.replace("Lose", "NameRepetition_Lose")
                })
            }
        })

        //toast message
        if (SyncResult === 0) {
            sketch.UI.message("Fail In Syncing")
        } else {
            sketch.UI.message("Succeed In Syncing " + SyncResult + " Layer In This Page")
        }
    }

    //no link lose layer
    else {
        sketch.UI.message("No Link Lose Layer")
    }

    //GA
    GA(":-)")
}