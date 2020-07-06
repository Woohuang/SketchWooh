import sketch from 'sketch'
var Libraries = require('sketch/dom').getLibraries()
let doc = sketch.getSelectedDocument()
let settings = require('sketch/settings')

export let Symbol_NextAndLast = function(counts) {

    //function: WriteSymbolInfo
    let WriteSymbolInfo = function(item1, item2, item3) {
        settings.setSessionVariable('ReadSymbolInfo', { JudgeSymbolId: item1, ThisIndex: item2 })
    }

    //判断是否有 WriteSymbolInfo 避免报错
    if (!settings.sessionVariable('ReadSymbolInfo')) {
        settings.setSessionVariable('ReadSymbolInfo', { JudgeSymbolId: null, ThisIndex: null })
    }
    let ReadSymbolInfo = settings.sessionVariable('ReadSymbolInfo')
    let ThisIndex, symbolMaster, ThisLibrary

    //获取选中的 symbol
    let Selection = doc.selectedLayers.layers
    let SelectedSymbols = Selection.filter(item => item.type === "SymbolInstance")

    //判断是否同类 symbol
    let JudgeSymbolId = SelectedSymbols[0].symbolId
    let JudgeSymbolResult
    JudgeSymbolResult = SelectedSymbols.findIndex(item => item.symbolId !== JudgeSymbolId)

    if (JudgeSymbolResult !== -1) {
        sketch.UI.message("Please Select Symbol With Same Master")
    }

    //开始主要功能
    else {

        //所选为 library symbol 时
        if (SelectedSymbols[0].master.getLibrary()) {
            ThisLibrary = Libraries.find(item => item.name === SelectedSymbols[0].master.getLibrary().name)
            let symbolReferences = ThisLibrary.getImportableSymbolReferencesForDocument(doc)

            //判断是否需要重新获取 ThisIndex
            if (JudgeSymbolId === ReadSymbolInfo.JudgeSymbolId) {
                ThisIndex = ReadSymbolInfo.ThisIndex
            } else {
                ThisIndex = symbolReferences.findIndex(item => item.import().symbolId === JudgeSymbolId)
            }

            //ThisIndex + counts 超出正常范围时
            if (counts > 0) {
                if (counts > symbolReferences.length) {
                    counts = counts - symbolReferences.length
                }
                if (ThisIndex + counts >= symbolReferences.length) {
                    ThisIndex = ThisIndex - symbolReferences.length
                }
            } else {
                if (-counts > symbolReferences.length) {
                    counts = -(-counts - symbolReferences.length)
                }
                if (ThisIndex + counts < 0) {
                    ThisIndex = symbolReferences.length - ThisIndex
                }
            }

            //获取待替换 symbolMaster
            symbolMaster = symbolReferences[ThisIndex + counts].import()
        }

        //所选为 local symbol 时 
        else {

            //不能用 let DocSymbols =  doc.getSymbols(), 会取到引入的其它 library symbol
            let DocSymbols = sketch.find('[type="SymbolMaster"]')

            //判断是否需要重新获取 ThisIndex
            if (JudgeSymbolId === ReadSymbolInfo.JudgeSymbolId) {
                ThisIndex = ReadSymbolInfo.ThisIndex
            } else {
                ThisIndex = DocSymbols.findIndex(item => item.symbolId === JudgeSymbolId)
            }

            //ThisIndex + counts 超出正常范围时
            if (counts > 0) {
                if (counts > DocSymbols.length) {
                    counts = counts - DocSymbols.length
                }
                if (ThisIndex + counts >= DocSymbols.length) {
                    ThisIndex = ThisIndex - DocSymbols.length
                }
            } else {
                if (-counts > DocSymbols.length) {
                    counts = -(-counts - DocSymbols.length)
                }
                if (ThisIndex + counts < 0) {
                    ThisIndex = DocSymbols.length - ThisIndex
                }
            }
            //获取待替换 symbolMaster
            symbolMaster = DocSymbols[ThisIndex + counts]
        }
    }

    sketch.UI.message(symbolMaster.name)
    SelectedSymbols.forEach(item => item.master = symbolMaster)

    //储存 symbol 临时信息
    WriteSymbolInfo(symbolMaster.symbolId, ThisIndex + counts)
}