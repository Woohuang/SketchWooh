import sketch from 'sketch'
import { GA } from "./modules/xscapeFunctions"

export default function() {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://sketchrunner.com/get"))
        //GA
    GA(":-)")
}