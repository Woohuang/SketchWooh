import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers
let Settings = require('sketch/settings')

export default function() {

    const LinkPngOptions = { formats: 'jpg', output: false, scales: 1 }
    if (Selection.length === 1 && Selection[0].type === "Artboard") {

        //导出 Artboard 为 Png
        let LinkPng = sketch.export(Selection[0], LinkPngOptions)
        let LinkPngLayer = sketch.createLayerFromData(LinkPng, 'bitmap')

        //设置 LinkPngLayer 属性
        LinkPngLayer.name = "🧶Link_" + Selection[0].name
        LinkPngLayer.frame.width = Selection[0].frame.width
        LinkPngLayer.frame.height = Selection[0].frame.height
        LinkPngLayer.parent = Selection[0]
        LinkPngLayer.index = Selection[0].layers.length
        LinkPngLayer.locked = true
        doc.selectedLayers.clear()
        LinkPngLayer.selected = true

        //LinkPngLayer 储存 Artboard id
        Settings.setLayerSettingForKey(LinkPngLayer, 'ArtboardId', Selection[0].id)
    } else {
        sketch.UI.message("Please Select 1 Artboard")
    }
}