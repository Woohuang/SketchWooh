import sketch from 'sketch'
//thank to ashung
let Dialog = require("./modules/Dialog").dialog
let ui = require("./modules/Dialog").ui
import { GA } from "./modules/xscapeF"

export default function() {

    let manifestFilePath = context.plugin.url().path() + "/Contents/Sketch/manifest.json"
    let supportLanguages = {
        "zh": "中文",
        "en": "English"
    }
    let supportLanguagesKeys = Object.keys(supportLanguages)
    let supportLanguagesValues = []
    for (let key in supportLanguages) {
        supportLanguagesValues.push(supportLanguages["" + key + ""])
    }

    // Dialog
    let dialog = new Dialog("Switch Plugin Language")

    let languagesView = ui.popupButton(supportLanguagesValues)
    dialog.addView(languagesView)

    // Click OK button
    let responseCode = dialog.run()
    if (responseCode == 1000) {
        let languageIndex = languagesView.indexOfSelectedItem()
        let languageFileURL = context.plugin.urlForResourceNamed("manifest_" + supportLanguagesKeys[languageIndex] + ".json")
        if (languageFileURL) {
            let languageFilePath = languageFileURL.path()

            // Remove manifest.json
            NSFileManager.defaultManager().removeItemAtPath_error_(
                manifestFilePath, nil
            )

            // Replace manifest.json
            NSFileManager.defaultManager().copyItemAtPath_toPath_error_(
                languageFilePath, manifestFilePath, nil
            )

            // Reload Plugin
            AppController.sharedInstance().pluginManager().reloadPlugins()
            sketch.UI.message("Succeed In Switching Language")
        } else {
            let alert = require("sketch/ui").alert
            alert(
                "Language file not found.",
                "Language file \"" + context.plugin.url().path() + "/Contents/Resources/manifest_" + supportLanguagesKeys[languageIndex] + ".json\" does not existed."
            )
        }
    }

    //GA
    GA(":-)")
}