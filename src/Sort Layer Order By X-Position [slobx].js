import * as xs from "./modules/xscapeFunctions";
import sketch from "sketch";
let doc = sketch.getSelectedDocument(),
    selections = doc.selectedLayers.layers;

export default function() {
    if (
        selections.findIndex(
            (item) => item.parent.id !== selections[0].parent.id
        ) === -1
    ) {
        let indexInfo = []
        selections.sort((a, b) => a.index - b.index).forEach(item => indexInfo.push(item.index))
        selections.sort((a, b) =>
            a.frame.x - b.frame.x
        );
        selections.forEach(item => item.index = indexInfo[selections.indexOf(item)])
        sketch.UI.message(`Succeed In Sorting ${selections.length} Layers`);
    } else {
        sketch.UI.message(
            "Selected Layers Must From A Same Group Or Artboard"
        );
    }
    GA(":-)")
}