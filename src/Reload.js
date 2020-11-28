import sketch from 'sketch'
import { GA } from "./modules/xscapeF"

export default function() {

    AppController.sharedInstance().pluginManager().reloadPlugins()

    //GA
    GA(":-)")
}