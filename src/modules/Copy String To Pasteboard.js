import sketch from 'sketch'

export const CopyStringToPasteboard = function (item) {
    let pasteboard = NSPasteboard.generalPasteboard();
    pasteboard.clearContents();
    pasteboard.writeObjects([item]);
}