import sketch from 'sketch'

import GA from "./modules/Google Analytics Method"

export default function() {

    AppController.sharedInstance().pluginManager().reloadPlugins()


    //GA
    GA("NormalResult")
}