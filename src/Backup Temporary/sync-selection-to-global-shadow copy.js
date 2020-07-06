import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {

    let SelectionResult = 0
    let GlobalShadowResult = 0
    let AutoStyleLayerResult = 0
    let SyncResult = 0

    //主要功能开始
    Selection.forEach(item => {
        let GlobalShadow = null

        //获取 Global 值
        if (item.type === "SymbolMaster") {
            SelectionResult = 1

            //判断所选 Artboard 内是否有图层
            if (item.layers.length > 0) {

                //判断所选 Artboard 内图层为正确的 SymbolInstance 时
                if (item.layers[0].type === "SymbolInstance") {
                    if (typeof item.layers[0].master.layers[0] !== "undefined") {
                        GlobalShadow = item.layers[0].master.layers[0].style.shadows
                        GlobalShadowResult = 1
                    }
                }

                //判断所选 Artboard 内图层为正确的 Shape 时
                else if (item.layers[0].type === "ShapePath") {
                    GlobalShadow = item.layers[0].style.shadows
                    GlobalShadowResult = 1
                }
            }
        }

        if (SelectionResult === 1) {

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

                    if (GlobalShadowResult === 1) {
                        AutoStyleLayer.style.shadows = GlobalShadow
                        SyncResult = 1
                    }

                    AutoStyleLayerResult = 1
                }
            })
        }
    })

    //判断 sync 结果并提示
    if (SelectionResult === 0) {
        sketch.UI.message("Find No Global Radius or Shadow Artboard")
    } else if (GlobalShadowResult === 0) {
        sketch.UI.message("未在 Global Artboard 内找到记录属性的形状图层")
    } else if (AutoStyleLayerResult === 0) {
        sketch.UI.message("未找到需要同步的 AutoStyle 图层")
    } else if (SyncResult === 0) {
        sketch.UI.message("同步 AutoStyle 图层属性时失败")
    } else {
        sketch.UI.message("Succeed In Syncing")
    }
}