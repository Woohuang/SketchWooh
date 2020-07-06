import sketch from 'sketch'
//thank ashung
let system = require("./modules/System")
let Document = require('sketch/dom').Document
let doc = sketch.getSelectedDocument()
let alldocuments = Document.getDocuments()
let SharedStyle = require('sketch/dom').SharedStyle
let Artboard = require('sketch/dom').Artboard
let path = require('path')

export default function () {

    //选择 TheSource.sketch
    let chooseFile = system.chooseFile(["sketch"]);
    if (!chooseFile) {
        return;
    }
    let count = 0
    let fileURL = NSURL.fileURLWithPath(chooseFile)
    let error = MOPointer.alloc().init()
    let newDocument = MSDocument.alloc().init()
    newDocument.readFromURL_ofType_error(fileURL, "com.bohemiancoding.sketch.drawing", error)
    let wrappedDoc = sketch.fromNative(newDocument)

    //需要补充一系列检验文件正确性的功能

    //Sync 开始
    let TS_doc, TC_doc, TS_pages, TC_pages, TS_StylesArtboards, TC_CuStylesArtboards
    TC_doc = doc, TS_doc = wrappedDoc
    TS_pages = TS_doc.pages, TC_pages = TC_doc.pages

    const TS_TxtStyles = TS_doc.sharedTextStyles
    const TS_LayerStyles = TS_doc.sharedLayerStyles
    const TS_Colors = TS_doc.colors

    //同步 TheSource 的字体样式至 TC
    const TC_CuTxtStyles = []
    for (let i = 0, len = TC_doc.sharedTextStyles.length; i < len; i++) {
        let CurrentStyleId = TC_doc.sharedTextStyles[i].id
        let Judge = TS_TxtStyles.findIndex(item => item.id === CurrentStyleId)
        if (Judge === -1) {
            TC_CuTxtStyles.splice(TC_CuLayerStyles.length - 1, 0, TC_doc.sharedTextStyles[i])
        }
    }
    TC_doc.sharedTextStyles = TS_TxtStyles.concat(TC_CuTxtStyles)

    //同步 TheSource 的图层样式至 TC
    const TC_CuLayerStyles = []
    for (let i = 0, len = TC_doc.sharedLayerStyles.length; i < len; i++) {
        let CurrentStyleId = TC_doc.sharedLayerStyles[i].id
        let Judge = TS_LayerStyles.findIndex(item => item.id === CurrentStyleId)
        if (Judge === -1) {
            TC_CuLayerStyles.splice(TC_CuLayerStyles.length - 1, 0, TC_doc.sharedLayerStyles[i])
        }
    }
    TC_doc.sharedLayerStyles = TS_LayerStyles.concat(TC_CuLayerStyles)

    //同步 TheSource 的 Colors 至 TC
    TC_doc.colors = TS_Colors

    //同步 TheSource 的 🔗Symbols 至 TC
    const TS_Symbols_Index = TS_pages.findIndex(item => item.name === '🔗Symbols')
    const TC_Symbols_Index = TC_pages.findIndex(item => item.name === '🔗Symbols')
    if (TS_Symbols_Index === -1) {
        sketch.UI.message("未在TheSource.sketch中找到🔗Symbols页面")
    }
    if (TC_Symbols_Index === -1) {
        sketch.UI.message("未在当前文档找到🔗Symbols页面")
    }

    // TC_pages.splice(TC_Symbols_Index, 1, TS_pages[TS_Symbols_Index])
    TC_pages[TC_Symbols_Index].layers = TS_pages[TS_Symbols_Index].layers

    //同步 TheSource 的 🍭Styles 中的非 CustomSymnbols 至 TC
    let TS_StylesPage, TC_CuStylesPage, TC_StylesPage
    const TS_Styles_Index = TS_doc.pages.findIndex(item => item.name === '🍭Styles')
    const TC_Styles_Index = TC_doc.pages.findIndex(item => item.name === '🍭Styles')
    const TC_CuStyles_Index = TC_doc.pages.findIndex(item => item.name === 'CustomStyles')
    if (TS_Styles_Index === -1) {
        sketch.UI.message("未在TheSource.sketch中找到🍭Styles页面")
    }
    if (TS_Styles_Index === -1) {
        sketch.UI.message("未在当前文档找到🍭Styles页面")
    }
    if (TC_CuStyles_Index === -1) {
        sketch.UI.message("未在当前文档找到CustomStyles页面")
    }
    TS_StylesPage = TS_pages[TS_Styles_Index]
    TC_StylesPage = TC_pages[TC_Styles_Index]
    TC_CuStylesPage = TC_pages[TC_CuStyles_Index]
    TS_StylesArtboards = TS_StylesPage.layers
    TC_CuStylesArtboards = TC_CuStylesPage.layers
    const newTC_StyleLayers = []
    for (let i = 0, len = TS_StylesArtboards.length; i < len; i++) {
        let Artboard_id = TS_StylesArtboards[i].id
        let SameSymbol_Index = TC_CuStylesArtboards.findIndex(item => item.id === Artboard_id)
        if (SameSymbol_Index === -1) {
            newTC_StyleLayers.splice(0, 0, TS_StylesArtboards[i])
        }
    }
    TC_StylesPage.layers = [].concat(newTC_StyleLayers)
    for (let i = 0, len = newTC_StyleLayers.length; i < len; i++) {
        TC_StylesPage.layers.splice(i, 1, newTC_StyleLayers[i])
    }
    TS_doc.close()
    sketch.UI.message("Done")

}
