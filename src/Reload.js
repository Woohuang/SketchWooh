import sketch from 'sketch'
import { GA } from "./modules/xscapeFunctions"

export default function() {

    AppController.sharedInstance().pluginManager().reloadPlugins()

    //GA
    GA(":-)")
}