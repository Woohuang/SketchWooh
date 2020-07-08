import sketch from 'sketch'

import GA from "./modules/Google Analytics Method"

export default function() {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://sketchrunner.com/get"))

    //GA
    GA("NormalResult")
}