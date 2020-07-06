import sketch from 'sketch'
var Document = require('sketch/dom').Document
var alldocuments = Document.getDocuments()
var SharedStyle = require('sketch/dom').SharedStyle
var Artboard = require('sketch/dom').Artboard
var path = require('path')

export default function () {
    var TS_doc, TC_doc, TS_pages, TC_pages, TS_StylesArtboards, TC_C_StylesArtboards
    TC_doc = sketch.getSelectedDocument()

    //通过文件名简单判断是否为TheSource.sketch
    TS_doc = alldocuments.find(item => path.basename(item.path).replace('.sketch', '') === 'TheSource')
    if (TS_doc === undefined) {
        sketch.UI.message("请先打开TheSource.sketch")
    } else if (path.basename(TC_doc.path).replace(".sketch", "") === "TheSource") {
        sketch.UI.message("请切换sketch窗口到到需要同步的子组件库")
    }
    else {
        TS_pages = TS_doc.pages, TC_pages = TC_doc.pages
        
        //同步TheSource的图层与字体样式、色板至TC
        const TS_txt_styles = TS_doc.sharedTextStyles
        const TS_layer_styles = TS_doc.sharedLayerStyles
        const TS_colors = TS_doc.colors
        TC_doc.sharedTextStyles = TS_txt_styles
        TC_doc.sharedLayerStyles = TS_layer_styles
        TC_doc.colors = TS_colors

        //同步TheSource的🔗Symbols至TC
        const TS_Symbols_Index = TS_pages.findIndex(item => item.name === '🔗Symbols')
        const TC_Symbols_Index = TC_pages.findIndex(item => item.name === '🔗Symbols')
        TC_pages.splice(TC_Symbols_Index, 1, TS_pages[TS_Symbols_Index])

        //同步TheSource的🍭Styles中的非CustomSymnbols至TC
        var TS_StylesPage, TC_C_StylesPage, TC_StylesPage
        const TS_Styles_Index = TS_doc.pages.findIndex(item => item.name === '🍭Styles')
        const TC_Styles_Index = TC_doc.pages.findIndex(item => item.name === '🍭Styles')
        const TC_C_Styles_Index = TC_doc.pages.findIndex(item => item.name === 'CustomStyles')
        TS_StylesPage = TS_pages[TS_Styles_Index]
        TC_StylesPage = TC_pages[TC_Styles_Index]
        TC_C_StylesPage = TC_pages[TC_C_Styles_Index]
        TS_StylesArtboards = TS_StylesPage.layers
        TC_C_StylesArtboards = TC_C_StylesPage.layers
        const newTC_StyleLayers = []
        for (let i = 0, len = TS_StylesArtboards.length; i < len; i++) {
            let Artboard_id = TS_StylesArtboards[i].id
            let SameSymbol_Index = TC_C_StylesArtboards.findIndex(item => item.id === Artboard_id)
            if (SameSymbol_Index === -1) {
                newTC_StyleLayers.splice(0, 0, TS_StylesArtboards[i])
            }
        }

        TC_StylesPage.layers=[].concat(newTC_StyleLayers)
        for (let i = 0, len = newTC_StyleLayers.length; i < len; i++) {
            TC_StylesPage.layers.splice(i, 1, newTC_StyleLayers[i])
        }
        TS_doc.close()
        sketch.UI.message("Done")
        
    }
}
