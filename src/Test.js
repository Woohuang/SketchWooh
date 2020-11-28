//import BrowserWindow from "sketch-module-web-view";
import sketch from "sketch";
import * as xs from "./modules/xscapeFunctions";
let doc = sketch.getSelectedDocument(),
    selections = doc.selectedLayers.layers;

export default function() {
    if (doc.pages[0].name === "xscapetest") {
        const express = require("express");
        const app = express();

        app.get("/", function(req, res) {
            res.send("Hello World");
        });

        app.listen(3000);
        console.log("success");
    }
}