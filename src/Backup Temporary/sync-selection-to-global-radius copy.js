import sketch from 'sketch'
let doc = sketch.getSelectedDocument()
let Selection = doc.selectedLayers.layers

export default function() {

    let SelectionResult = 0
    let GlobalRadiusResult = 0
    let AutoStyleLayerResult = 0
    let SyncResult = 0

    let CollectMasters = Selection.filter(item => item.type === "SymbolMaster")
    Selection.forEach(item => {
        item.getAllInstances().forEach(item2 => {
            if (item2.parent.type === "Artboard") {
                if (item2.parent.layers.length === 1) {
                    CollectMasters.splice(0, 0, item2.parent)
                }
            }
        })
    })

    /*
        GlobalMasters = Selection.filter(item => {
            if (item.type === "SymbolMaster") {
                SelectionResult = 1
                if (item.getAllInstances().patent.type === "Artboard") {
                    item.getAllInstances().patent.layers.length === 1
                } else if (item.parent.type === "Group") {
                    item.parent.layers.length === 1 && item.getParentArtboard().layers.length === 1
                }
            }
        })
        */

    /*
Selection.forEach(item => {
    if (item.type === "SymbolMaster") {
        SelectionResult = 1
        if (item.getAllInstances().patent.type === "Artboard") {
            if (item.getAllInstances().patent.layers.length > 1) {
                GlobalMasters.splice(0, 0, item)
            }
        } else if (item.parent.type === "Group") {
            if (item.parent.layers.length > 1 || item.getParentArtboard().layers.length > 1) {
                GlobalMasters.splice(0, 0, item)
            }
        }
    }
})
*/

    //主要功能开始
    CollectMasters.forEach(item => {
        let GlobalRadius = null

        //获取 Global 值
        //判断所选 Artboard 内是否有图层
        if (item.layers.length > 0) {

            //判断所选 Artboard 内图层为正确的 SymbolInstance 时
            if (item.layers[0].type === "SymbolInstance") {
                if (typeof item.layers[0].master.layers[0] !== "undefined") {
                    if (typeof item.layers[0].master.layers[0].points !== "undefined") {
                        GlobalRadius = item.layers[0].master.layers[0].points[0].cornerRadius
                        GlobalRadiusResult = 1
                    }
                }
            }

            //判断所选 Artboard 内图层为正确的 Shape 时
            else if (item.layers[0].type === "ShapePath") {
                GlobalRadius = item.layers[0].points[0].cornerRadius
                GlobalRadiusResult = 1
            }
            if (GlobalRadius === 0) {
                GlobalRadius = 0.00001
            }
        }

        //}

        //   if (SelectionResult === 1) {

        //对包含选中 symbol 的每一个 symbol 的相关图层进行设置
        let AllInstances = item.getAllInstances()
        AllInstances.forEach(item2 => {

            let ThisInstance = item2

            //check if instance is the right instance
            if (item2.parent.type === "SymbolMaster" && item2.parent.layers.length === 1) {
                ThisInstance = item2.master
            } else if (item2.parent.type === "Group" && item2.parent.layers.length === 1 && item2.getParentArtboard().layers.length === 1) {} else {
                //锁定并隐藏 Global symbol instance 图层
                ThisInstance.style.opacity = 0
                ThisInstance.frame.width = 1
                ThisInstance.frame.height = 1
                ThisInstance.frame.x = ThisInstance.parent.frame.width / 2
                ThisInstance.frame.y = ThisInstance.parent.frame.height / 2
                ThisInstance.locked = true

                let ThisParent = ThisInstance.parent
                let AutoStyleLayer

                if (ThisParent.layers.find(item3 => item3.name.indexOf("AutoStyle") !== -1)) {
                    AutoStyleLayer = ThisParent.layers.find(item4 => item4.name.indexOf("AutoStyle") !== -1)
                    if ('points' in AutoStyleLayer) {
                        if (GlobalRadiusResult === 1) {

                            //形状已设置过圆角时，对 Radius 非0的 point 赋值新的 Radius
                            if (AutoStyleLayer.points.find(item5 => item5.cornerRadius > 0)) {
                                AutoStyleLayer.points.forEach(item6 => {
                                    if (item6.cornerRadius !== 0) {
                                        item6.cornerRadius = GlobalRadius
                                        SyncResult = 1
                                    }
                                })

                                //刷新 layer css
                                let NewIndex = AutoStyleLayer.points.findIndex(item => item.cornerRadius > 0)
                                AutoStyleLayer.points[NewIndex].cornerRadius = GlobalRadius + 0.00001
                                    //AutoStyleLayer.points[NewIndex].cornerRadius = AutoStyleLayer.points[NewIndex].cornerRadius - 0.00001

                            }

                            //形状未设置过圆角时，对所有 point 赋值新的 Radius
                            else {
                                AutoStyleLayer.points.forEach(item7 => {
                                    item7.cornerRadius = GlobalRadius
                                    SyncResult = 1
                                })

                                //刷新 layer css
                                AutoStyleLayer.points[0].cornerRadius = GlobalRadius + 0.00001
                                    //AutoStyleLayer.points[0].cornerRadius = AutoStyleLayer.points[0].cornerRadius - 0.00001

                            }

                        }
                        AutoStyleLayerResult = 1
                    }
                }
            }
        })
    })

    //判断 sync 结果并提示
    if (SelectionResult === 0) {
        sketch.UI.message("Find No Global Radius or Shadow Artboard")
    } else if (GlobalRadiusResult === 0) {
        sketch.UI.message("未在 Global Artboard 内找到记录属性的形状图层")
    } else if (AutoStyleLayerResult === 0) {
        sketch.UI.message("未找到需要同步的 AutoStyle 图层")
    } else if (SyncResult === 0) {
        sketch.UI.message("同步 AutoStyle 图层属性时失败")
    } else {
        sketch.UI.message("Succeed In Syncing")
    }
}