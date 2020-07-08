import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Settings = require('sketch/settings')

import GA from "./modules/Google Analytics Method"

export default function() {

    //acquire Link_ layer
    let AllImg = sketch.find('Image')
    let AllLinkPng = AllImg.filter(item => item.name.indexOf("Link_") !== -1)

    //acquire all arrboards
    let AllArtboards = []
    doc.pages.forEach(item => {
        AllArtboards = AllArtboards.concat(item.layers)
    })

    //collect Link_ id
    let IdArray = []
    for (let i = 0, len = AllLinkPng.length; i < len; i++) {
        if (IdArray.findIndex(item => item === Settings.layerSettingForKey(AllLinkPng[i], 'ArtboardId')) === -1) {
            IdArray.splice(IdArray.length, 0, Settings.layerSettingForKey(AllLinkPng[i], 'ArtboardId'))
        }
    }

    //set export option
    const LinkPngOptions = { formats: 'jpg', output: false, scales: 1 }

    let ArtboardIndex
    let SyncResult = 0

    //start syncing
    IdArray.forEach(item => {

        ArtboardIndex = AllArtboards.findIndex(item2 => item2.id === item)

        //id available
        if (ArtboardIndex !== -1) {
            let LinkArtboard = AllArtboards[ArtboardIndex]
            let LinkPng = sketch.export(LinkArtboard, LinkPngOptions)
            let LinkPngLayer = sketch.createLayerFromData(LinkPng, 'bitmap')
            AllLinkPng.filter(item2 => Settings.layerSettingForKey(item2, 'ArtboardId') === item).forEach(item3 => {
                item3.image = LinkPngLayer.image
                item3.frame.width = LinkArtboard.frame.width
                item3.frame.height = LinkArtboard.frame.height
                item3.name = "🧶Link_" + LinkArtboard.name
                item3.locked = true
                SyncResult = SyncResult + 1
            })
        }

        //id unavailable
        else {
            AllLinkPng.filter(item2 => Settings.layerSettingForKey(item2, 'ArtboardId') === item).forEach(item3 => {
                if (item3.name.indexOf("💀Lose") === -1) {
                    item3.name = "💀Lose" + item3.name
                    item3.locked = true
                }
            })
        }
    })

    //toast message
    if (SyncResult === 0) {
        sketch.UI.message("Fail In Syncing")
    } else {
        sketch.UI.message("Succeed In Syncing " + SyncResult + " layer(s)")
    }


    //GA
    GA("NormalResult")
}