import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {

    let SelectionResult = 0
    let GlobalParameterResult = 0
    let AutoStyleLayerResult = 0
    let SyncResult = 0

    let CollectMasters = Selection.filter(item => item.type === "SymbolMaster")

    Selection.filter(item => item.type === "SymbolMaster").forEach(item => {
        item.getAllInstances().forEach(item2 => {
            if (item2.parent.type === "SymbolMaster") {
                if (item2.parent.layers.length === 1) {
                    CollectMasters.splice(0, 0, item2.parent)
                }
            }
        })
    })

    //主要功能开始
    CollectMasters.forEach(item => {
        SelectionResult = 1
        let GlobalParameter = null

        //获取 Global Parameter
        //判断所选 Artboard 内是否有图层
        if (item.layers.length > 0) {

            //判断所选 Artboard 内图层为正确的 SymbolInstance 时
            if (item.layers[0].type === "SymbolInstance") {
                if (typeof item.layers[0].master.layers[0] !== "undefined") {
                    GlobalParameter = item.layers[0].master.layers[0].style.shadows
                }
            }

            //判断所选 Artboard 内图层为正确的 Shape 时
            else if (item.layers[0].type === "ShapePath") {
                GlobalParameter = item.layers[0].style.shadows
                GlobalParameterResult = 1
            }
        }

        //对包含选中 symbol 的每一个 symbol 的相关图层进行设置
        if (GlobalParameter.length > 0) {
            let AllInstances = item.getAllInstances()
            AllInstances.forEach(item2 => {
                let ThisInstance = item2

                //check if instance is the right instance
                if (item2.parent.type === "SymbolMaster" && item2.parent.layers.length === 1) {
                    ThisInstance = item2.master
                } else if (item2.parent.type === "Group" && item2.parent.layers.length === 1 && item2.getParentArtboard().layers.length === 1) {} else {

                    //对包含选中 symbol 的每一个 symbol 的相关图层进行设置
                    let AllInstances = item.getAllInstances()
                    AllInstances.forEach(item2 => {

                        //锁定并隐藏 Global symbol instance 图层
                        item2.style.opacity = 0
                        item2.frame.width = 1
                        item2.frame.height = 1
                        item2.frame.x = item2.parent.frame.width / 2
                        item2.frame.y = item2.parent.frame.height / 2
                        item2.locked = true

                        let ThisParent = item2.parent
                        let AutoStyleLayer

                        if (ThisParent.layers.find(item3 => item3.name.indexOf("AutoStyle") !== -1)) {
                            AutoStyleLayer = ThisParent.layers.find(item4 => item4.name.indexOf("AutoStyle") !== -1)

                            if (GlobalParameterResult === 1) {
                                AutoStyleLayer.style.shadows = GlobalParameter
                                SyncResult = SyncResult + 1
                            }

                            AutoStyleLayerResult = 1
                        }
                    })
                }
            })
        }
    })

    //判断 sync 结果并提示
    if (SelectionResult === 0) {
        sketch.UI.message("Find No Global Radius or Shadow Artboard")
    } else if (GlobalParameterResult === 0) {
        sketch.UI.message("未在 Global Artboard 内找到记录属性的形状图层")
    } else if (AutoStyleLayerResult === 0) {
        sketch.UI.message("未找到需要同步的 AutoStyle 图层")
    } else if (SyncResult === 0) {
        sketch.UI.message("同步 AutoStyle 图层属性时失败")
    } else {
        sketch.UI.message("Succeed In Syncing " + SyncResult + " Layers~")
    }
}