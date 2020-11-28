import sketch from "sketch";
let system = require("./modules/System"),
    doc = sketch.getSelectedDocument();
import { GA } from "./modules/xscapeF";

export default function() {
    //选择 TheSource.sketch
    console.log("begins");
    let chooseFile = system.chooseFile(["sketch"]);
    if (!chooseFile) {
        return;
    }
    let count = 0,
        fileURL = NSURL.fileURLWithPath(chooseFile),
        error = MOPointer.alloc().init(),
        newDocument = MSDocument.alloc().init();
    newDocument.readFromURL_ofType_error(
        fileURL,
        "com.bohemiancoding.sketch.drawing",
        error
    );
    let wrappedDoc = sketch.fromNative(newDocument);

    //Sync 开始
    let TS_doc,
        TC_doc,
        TS_pages,
        TC_pages,
        TS_StylesArtboards,
        TC_CuStylesArtboards;
    TC_doc = doc;
    TS_doc = wrappedDoc;
    TS_pages = TS_doc.pages;
    TC_pages = TC_doc.pages;

    const TS_TxtStyles = TS_doc.sharedTextStyles,
        TS_LayerStyles = TS_doc.sharedLayerStyles,
        TS_Colors = TS_doc.colors;

    //同步 TheSource 的字体样式至 TC
    let TC_CuTxtStyles = [],
        counts = 0;
    for (let i = 0, len = TC_doc.sharedTextStyles.length; i < len; i++) {
        console.log("a" + ++counts);
        if (counts % 5 === 0) {
            console.clear();
        }
        let CurrentStyleId = TC_doc.sharedTextStyles[i].id,
            Judge = TS_TxtStyles.findIndex((item) => item.id === CurrentStyleId);
        if (Judge === -1) {
            TC_CuTxtStyles.splice(
                TC_CuTxtStyles.length - 1,
                0,
                TC_doc.sharedTextStyles[i]
            );
        }
    }
    TC_doc.sharedTextStyles = TS_TxtStyles.concat(TC_CuTxtStyles);

    //同步 TheSource 的图层样式至 TC
    const TC_CuLayerStyles = [];
    counts = 0;
    for (let i = 0, len = TC_doc.sharedLayerStyles.length; i < len; i++) {
        console.log("b" + ++counts);
        if (counts % 5 === 0) {
            console.clear();
        }
        let CurrentStyleId = TC_doc.sharedLayerStyles[i].id,
            Judge = TS_LayerStyles.findIndex((item) => item.id === CurrentStyleId);
        if (Judge === -1) {
            TC_CuLayerStyles.splice(
                TC_CuLayerStyles.length - 1,
                0,
                TC_doc.sharedLayerStyles[i]
            );
        }
    }
    TC_doc.sharedLayerStyles = TS_LayerStyles.concat(TC_CuLayerStyles);

    //同步 TheSource 的 Colors 至 TC
    TC_doc.colors = TS_Colors;

    //同步 TheSource 的 🔗Symbols 至 TC
    const TS_Symbols_Index = TS_pages.findIndex(
        (item) => item.name === "🔗Symbols"
    );
    const TC_Symbols_Index = TC_pages.findIndex(
        (item) => item.name === "🔗Symbols"
    );
    if (TS_Symbols_Index === -1) {
        sketch.UI.message("未在TheSource.sketch中找到🔗Symbols页面");
    }
    if (TC_Symbols_Index === -1) {
        sketch.UI.message("未在当前文档找到🔗Symbols页面");
    }

    // TC_pages.splice(TC_Symbols_Index, 1, TS_pages[TS_Symbols_Index])
    TC_pages[TC_Symbols_Index].layers = TS_pages[TS_Symbols_Index].layers;
    console.log("success: 同步 TheSource 的 🔗Symbols 至 TC");

    //同步 TheSource 的 🍭Styles 中的非 CustomSymnbols 至 TC
    let TS_StylesPage, TC_CuStylesPage, TC_StylesPage;
    const TS_Styles_Index = TS_doc.pages.findIndex(
            (item) => item.name === "🍭Styles"
        ),
        TC_Styles_Index = TC_doc.pages.findIndex(
            (item) => item.name === "🍭Styles"
        ),
        TC_CuStyles_Index = TC_doc.pages.findIndex(
            (item) => item.name === "CustomStyles"
        );
    if (TS_Styles_Index === -1) {
        sketch.UI.message("未在TheSource.sketch中找到🍭Styles页面");
    }
    if (TS_Styles_Index === -1) {
        sketch.UI.message("未在当前文档找到🍭Styles页面");
    }
    if (TC_CuStyles_Index === -1) {
        sketch.UI.message("未在当前文档找到CustomStyles页面");
    }
    TS_StylesPage = TS_pages[TS_Styles_Index];
    TC_StylesPage = TC_pages[TC_Styles_Index];
    TC_CuStylesPage = TC_pages[TC_CuStyles_Index];
    TS_StylesArtboards = TS_StylesPage.layers;
    TC_CuStylesArtboards = TC_CuStylesPage.layers;
    let newTC_StyleLayers = [];
    counts = 0;
    for (let i = 0, len = TS_StylesArtboards.length; i < len; i++) {
        console.log("c" + ++counts);
        if (counts % 5 === 0) {
            console.clear();
        }
        let Artboard_id = TS_StylesArtboards[i].id;
        let SameSymbol_Index = TC_CuStylesArtboards.findIndex(
            (item) => item.id === Artboard_id
        );
        if (SameSymbol_Index === -1) {
            newTC_StyleLayers.splice(0, 0, TS_StylesArtboards[i]);
        }
    }
    TC_StylesPage.layers = [].concat(newTC_StyleLayers);
    counts = 0;
    for (let i = 0, len = newTC_StyleLayers.length; i < len; i++) {
        console.log("d" + ++counts);
        if (counts % 5 === 0) {
            console.clear();
        }
        TC_StylesPage.layers.splice(i, 1, newTC_StyleLayers[i]);
    }

    //toast result
    sketch.UI.message("Done!");
    //GA
    GA(":-)");
}