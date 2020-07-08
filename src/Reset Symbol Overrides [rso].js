import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

import GA from "./modules/Google Analytics Method"

export default function() {

    Selection.forEach(item => {

        if (item.type === "SymbolInstance") {

            //replace symbol master
            let NewInstance = item.master.createNewInstance()
            NewInstance.frame.width = item.frame.width
            NewInstance.frame.height = item.frame.height
            NewInstance.frame.x = item.frame.x
            NewInstance.frame.y = item.frame.y
            NewInstance.parent = item.parent
            NewInstance.index = item.index
            item.remove()

            Result = 1
        }
    })

    if (Result === 1) {
        sketch.UI.message("Succeed In Reseting")
    } else {
        sketch.UI.message("Fail In Reseting")
    }

    //GA
    GA("NormalResult")
}