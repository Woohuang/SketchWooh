import sketch from "sketch";
import { GA } from "./modules/xscapeF";
let doc = sketch.getSelectedDocument(),
    selection = doc.selectedLayers.layers,
    shapePath = require("sketch/dom").ShapePath;

export default function() {
    let counts = 0;
    selection.forEach((item) => {
        if (item.type === "Image") {
            const newImageShape = new shapePath({
                name: item.name,
                frame: item.frame,
                style: item.style,
            });
            newImageShape.style.fills.splice(0, 0, {
                fillType: "Pattern",
                pattern: { image: item.image, },
            })
            item.parent.layers.splice(item.index, 1, newImageShape);
            counts++;
        }
    });
    sketch.UI.message("Succeed In Converting " + counts + " Image");

    //GA
    GA(":-)");
}