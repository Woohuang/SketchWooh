import sketch from "sketch";
import * as xs from "../src/modules/xscapeF";
//thank to gaddafirusli

let doc = sketch.getSelectedDocument(),
    autoRefreshKey = xs.userInfo.get('t', "autoRefreshKey") || "No auto refresh",
    selection = doc.selectedLayers.layers,
    artboard = 0;

if (selection.length > 0) {
    for (let i = 0; artboard == 0 && i < selection.length; i++) {
        artboard = selection[i].getParentArtboard() || selection[i];
        if (artboard.type !== "Artboard") {
            artboard = 0;
        }
    }
}

export default function() {
    if (
        autoRefreshKey === "Auto refresh @2x" ||
        autoRefreshKey === "Refresh when saving document @2x"
    ) {
        artboardBrowse(artboard, "AutoRefreshing", false, 2);
    } else if (
        autoRefreshKey === "Auto refresh @1x" ||
        autoRefreshKey === "Refresh when saving document @1x"
    ) {
        artboardBrowse(artboard, "AutoRefreshing", false, 1);
    } else {
        artboardBrowse(artboard, artboard.name, true, 2);
    }

    //GA
    //console.log(autoRefreshKey)
    xs.GA(autoRefreshKey);
}

export function autoRefreshHandler() {
    if (autoRefreshKey === "Auto refresh @2x") {
        refreshImg(2);
        //console.log(autoRefreshKey)
        //console.log('auto2')
    } else if (autoRefreshKey === "Auto refresh @1x") {
        refreshImg(1);
        //console.log(autoRefreshKey)
        //console.log('auto1')
    }
    xs.GA(autoRefreshKey);
}

export function autoRefreshHandlerSave() {
    if (autoRefreshKey === "Refresh when saving document @2x") {
        refreshImg(2);
        //console.log(autoRefreshKey)
        //console.log('save2')
    } else if (autoRefreshKey === "Refresh when saving document @1x") {
        refreshImg(1);
        //console.log(autoRefreshKey)
        //console.log('save1')
    }
    xs.GA(autoRefreshKey);
}

//functions
export function artboardBrowse(
    artboard,
    pageTitle,
    customBlockKey,
    scaleValue
) {
    if (artboard === 0) {
        sketch.UI.message("Please Select 1 Artboard");
    } else {
        let artboardname = pageTitle;
        artboardname = artboardname.replace(/['|'|/|#|.|\\|"|"]/g, "");
        let filename = NSTemporaryDirectory() + artboardname + ".png";
        doc.sketchObject.saveArtboardOrSlice_toFile(
            scaleArtboard(artboard, scaleValue),
            filename
        );

        //htmlContent
        let htmlContent = NSString.stringWithString_(
            "<html>\
            <head><meta charset='UTF-8'></head>" +
            "<body id='" +
            customBlockKey +
            "'>\
            <img id='mainImg' width=" +
            artboard.sketchObject.frame().width() +
            " src='./" +
            artboardname +
            ".png' center top no-repeat;'>\
            <div id='refreshBlock' onClick='refreshBlock()'>Stop Refreshing</div>\
            </body>\
            <style type='text/css'>\
            body {\
                text-align: center;\
                margin: 0;\
                padding: 0;\
                background:" +
            colorToRGBA(artboard.sketchObject.backgroundColor()) +
            ";}\
            body::-webkit-scrollbar {\
                display: none;}\
            #refreshBlock {\
                opacity: .3;\
                position: fixed;\
                right: 20px;\
                bottom: 10px;\
                background: rgba(0, 0, 0, .8);\
                border-radius: 100px;\
                font-family: sans - serif;\
                font-size: 12px;\
                padding: 1px 8px;\
                color: white;\
                cursor: pointer;\
                user-select: none;}\
            #refreshBlock:hover {opacity: .9;\
                transition: .25s;}\
            </style>\
            <script>\
            let stopRefreshKey = JSON.parse(document.getElementsByTagName('body')[0].id);\
            if (stopRefreshKey == true) {document.getElementById('refreshBlock').remove();};\
            function workLoop(deadline) {\
                if (stopRefreshKey == false && deadline.timeRemaining() > 1 && document.visibilityState == 'visible') {\
                    document.getElementById('mainImg').src=document.getElementById('mainImg').src+'?t='+Math.random();\
                };\
                setTimeout('window.requestIdleCallback(workLoop)',1000);\
            };\
            window.requestIdleCallback(workLoop);\
            let refreshBlock = function() {\
                if (stopRefreshKey == false) { stopRefreshKey = true; document.getElementById('refreshBlock').innerHTML='Continue To Refresh';}\
                else { location.reload()\
                    /*stopRefreshKey = false; window.requestIdleCallback(workLoop); document.getElementById('refreshBlock').innerHTML='Stop Refreshing';*/};\
            };\
            </script>\
            </html>"
        );

        let filepath = NSTemporaryDirectory() + artboardname + ".html";
        htmlContent
            .dataUsingEncoding_(NSUTF8StringEncoding)
            .writeToFile_atomically_(filepath, true);
        let file = NSURL.fileURLWithPath(filepath);
        NSWorkspace.sharedWorkspace().openFile(file.path());
    }
}

function refreshImg(scaleValue) {
    if (artboard !== 0) {
        let artboardname = "AutoRefreshing";
        artboardname = artboardname.replace(/['|'|/|#|.|\\|"|"]/g, "");
        let filename = NSTemporaryDirectory() + artboardname + ".png";
        doc.sketchObject.saveArtboardOrSlice_toFile(
            scaleArtboard(artboard, scaleValue),
            filename
        );
        sketch.UI.message("Browser Preview Refreshing");
    }
}

function scaleArtboard(layer, times) {
    let rect = layer.sketchObject.absoluteInfluenceRect();
    let request = MSExportRequest.new();
    request.rect = rect;
    request.scale = times;
    return request;
}

function colorToRGBA(color) {
    let rgbaValue =
        "rgba(" +
        (color.red() * 255).toFixed(0) +
        "," +
        (color.green() * 255).toFixed(0) +
        "," +
        (color.blue() * 255).toFixed(0) +
        "," +
        color.alpha().toFixed(2) +
        ")";
    return rgbaValue;
}