import sketch from "sketch";
import { GA } from "./modules/xscapeF";
let doc = sketch.getSelectedDocument(),
    Selection = doc.selectedLayers.layers;

export default function() {
    let SelectionResult = 0,
        GlobalParameterResult = 0,
        AutoStyleLayerResult = 0,
        SyncRadiusResult = 0,
        SyncShadowsResult = 0;

    //收集对应 Radius 与 Shadows 的 masters

    let CollectMasters = Selection.filter((item) => item.type === "SymbolMaster");

    //if no selected global symbol masters then get all global symbol masters automately
    if (CollectMasters.length === 0) {
        CollectMasters = sketch
            .find("SymbolMaster")
            .filter(
                (item) =>
                item.name.indexOf("lobal") !== -1 && item.name.indexOf("⚙️") !== -1
            );
    }

    //get global symbol masters' instance control layer
    sketch
        .find("SymbolMaster")
        .filter(
            (item) =>
            item.name.indexOf("lobal") !== -1 && item.name.indexOf("⚙️") !== -1
        )
        .forEach((item) => {
            item.getAllInstances().forEach((item2) => {
                if (item2.parent.type === "SymbolMaster") {
                    if (item2.parent.layers.length === 1) {
                        CollectMasters.splice(0, 0, item2.parent);
                    }
                }
            });
        });

    if (CollectMasters.length > 0) {
        SelectionResult = 1;
    }

    let CollectRadiusMasters = CollectMasters.filter((item) => {
        if (item.layers[0].type === "ShapePath") {
            return (
                item.layers[0].name.indexOf("adius") !== -1 ||
                item.layers[0].name.indexOf("圆角") !== -1
            );
        } else if (item.layers[0].type === "SymbolInstance") {
            return (
                item.layers[0].master.layers[0].name.indexOf("adius") !== -1 ||
                item.layers[0].master.layers[0].name.indexOf("圆角") !== -1
            );
        }
    });
    let CollectShadowMasters = CollectMasters.filter((item) => {
        if (item.layers[0].type === "ShapePath") {
            return (
                item.layers[0].name.indexOf("hadow") !== -1 ||
                item.layers[0].name.indexOf("投影") !== -1 ||
                item.layers[0].name.indexOf("阴影") !== -1
            );
        } else if (item.layers[0].type === "SymbolInstance") {
            return (
                item.layers[0].master.layers[0].name.indexOf("hadow") !== -1 ||
                item.layers[0].master.layers[0].name.indexOf("投影") !== -1 ||
                item.layers[0].master.layers[0].name.indexOf("阴影") !== -1
            );
        }
    });

    //Radius function begins
    CollectRadiusMasters.forEach((item) => {
        SelectionResult = 1;
        let GlobalRadius = null;

        //获取 Global Parameter
        //判断所选 Artboard 内是否有图层
        if (item.layers.length > 0) {
            //判断所选 Artboard 内图层为正确的 SymbolInstance 时
            if (item.layers[0].type === "SymbolInstance") {
                if (typeof item.layers[0].master.layers[0] !== "undefined") {
                    if (typeof item.layers[0].master.layers[0].points !== "undefined") {
                        GlobalRadius =
                            item.layers[0].master.layers[0].points[0].cornerRadius;
                        GlobalParameterResult = 1;
                    }
                }
            }

            //判断所选 Artboard 内图层为正确的 Shape 时
            else if (item.layers[0].type === "ShapePath") {
                GlobalRadius = item.layers[0].points[0].cornerRadius;
                GlobalParameterResult = 1;
            }
            if (GlobalRadius === 0) {
                GlobalRadius = 0.00001;
            }
        }

        //对包含选中 symbol 的每一个 symbol 的相关图层进行设置
        let AllInstances = item.getAllInstances();

        AllInstances.forEach((item2) => {
            let ThisInstance = item2;

            //check if instance is the right instance
            if (
                item2.parent.type === "SymbolMaster" &&
                item2.parent.layers.length === 1
            ) {
                ThisInstance = item2.master;
            } else if (
                item2.parent.type === "Group" &&
                item2.parent.layers.length === 1 &&
                item2.getParentArtboard().layers.length === 1
            ) {} else {
                //锁定并隐藏 Global symbol instance 图层
                ThisInstance.style.opacity = 0;
                ThisInstance.frame.width = 0.1;
                ThisInstance.frame.height = 0.1;
                ThisInstance.frame.x = ThisInstance.parent.frame.width / 2;
                ThisInstance.frame.y = ThisInstance.parent.frame.height / 2;
                ThisInstance.locked = true;
                ThisInstance.hidden = true;

                let ThisParent = ThisInstance.parent;
                let AutoStyleLayer;

                if (
                    ThisParent.layers.find(
                        (item3) => item3.name.indexOf("AutoStyle") !== -1
                    )
                ) {
                    AutoStyleLayer = ThisParent.layers.find(
                        (item4) => item4.name.indexOf("AutoStyle") !== -1
                    );
                    if ("points" in AutoStyleLayer) {
                        if (GlobalParameterResult === 1) {
                            //形状已设置过圆角时，对 Radius 非0的 point 赋值新的 Radius
                            if (
                                AutoStyleLayer.points.find((item5) => item5.cornerRadius > 0)
                            ) {
                                AutoStyleLayer.points.forEach((item6) => {
                                    if (item6.cornerRadius !== 0) {
                                        item6.cornerRadius = GlobalRadius;
                                    }
                                });

                                //刷新 layer css
                                let NewIndex = AutoStyleLayer.points.findIndex(
                                    (item) => item.cornerRadius > 0
                                );
                                AutoStyleLayer.points[NewIndex].cornerRadius =
                                    GlobalRadius + 0.00001;
                                SyncRadiusResult++;
                            }

                            //形状未设置过圆角时，对所有 point 赋值新的 Radius
                            else {
                                AutoStyleLayer.points.forEach((item7) => {
                                    item7.cornerRadius = GlobalRadius;
                                });

                                //刷新 layer css
                                AutoStyleLayer.points[0].cornerRadius = GlobalRadius + 0.00001;
                                SyncRadiusResult++;
                            }
                        }
                        AutoStyleLayerResult = 1;
                    }
                }
            }
        });
    });

    //Shadows function begins
    CollectShadowMasters.forEach((item) => {
        let GlobalShadows = null;

        //获取 Global Parameter
        //判断所选 Artboard 内是否有图层
        if (item.layers.length > 0) {
            //判断所选 Artboard 内图层为正确的 SymbolInstance 时
            if (item.layers[0].type === "SymbolInstance") {
                if (typeof item.layers[0].master.layers[0] !== "undefined") {
                    GlobalShadows = item.layers[0].master.layers[0].style.shadows;
                }
            }

            //判断所选 Artboard 内图层为正确的 Shape 时
            else if (item.layers[0].type === "ShapePath") {
                GlobalShadows = item.layers[0].style.shadows;
                GlobalParameterResult = 1;
            }
        }

        //对包含选中 symbol 的每一个 symbol 的相关图层进行设置
        if (GlobalShadows.length > 0) {
            let AllInstances = item.getAllInstances();
            AllInstances.forEach((item2) => {
                let ThisInstance = item2;

                //check if instance is the right instance
                if (
                    item2.parent.type === "SymbolMaster" &&
                    item2.parent.layers.length === 1
                ) {
                    ThisInstance = item2.master;
                } else if (
                    item2.parent.type === "Group" &&
                    item2.parent.layers.length === 1 &&
                    item2.getParentArtboard().layers.length === 1
                ) {} else {
                    //对包含选中 symbol 的每一个 symbol 的相关图层进行设置
                    let AllInstances = item.getAllInstances();
                    AllInstances.forEach((item2) => {
                        //锁定并隐藏 Global symbol instance 图层
                        item2.style.opacity = 0;
                        item2.frame.width = 0.1;
                        item2.frame.height = 0.1;
                        item2.frame.x = item2.parent.frame.width / 2;
                        item2.frame.y = item2.parent.frame.height / 2;
                        item2.locked = true;
                        ThisInstance.hidden = true;

                        let ThisParent = item2.parent;
                        let AutoStyleLayer;

                        if (
                            ThisParent.layers.find(
                                (item3) => item3.name.indexOf("AutoStyle") !== -1
                            )
                        ) {
                            AutoStyleLayer = ThisParent.layers.find(
                                (item4) => item4.name.indexOf("AutoStyle") !== -1
                            );

                            if (GlobalParameterResult === 1) {
                                AutoStyleLayer.style.shadows = GlobalShadows;
                                SyncShadowsResult = SyncShadowsResult + 1;
                            }

                            AutoStyleLayerResult = 1;
                        }
                    });
                }
            });
        }
    });

    //判断 sync 结果并提示
    if (SelectionResult === 0) {
        sketch.UI.message("Find No Global Radius or Shadow Artboard");
    } else if (GlobalParameterResult === 0) {
        sketch.UI.message("未在 Global Artboard 内找到记录属性的形状图层");
    } else if (AutoStyleLayerResult === 0) {
        sketch.UI.message("未找到需要同步的 AutoStyle 图层");
    } else if (SyncRadiusResult + SyncShadowsResult === 0) {
        sketch.UI.message("同步 AutoStyle 图层属性时失败");
    } else {
        sketch.UI.message(
            "Succeed In Syncing " +
            SyncRadiusResult +
            " Radius Layer And " +
            SyncShadowsResult +
            " Shadows Layer"
        );
    }
    //GA
    GA(":-)");
}