import sketch from 'sketch'

export default function() {
    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("https://sketchrunner.com/get"))
}