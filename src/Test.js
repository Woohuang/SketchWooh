//import BrowserWindow from "sketch-module-web-view";
import sketch from 'sketch';
import * as xs from './modules/xscapeF';
let doc = sketch.getSelectedDocument(),
  selections = doc.selectedLayers.layers;
import BrowserWindow from 'sketch-module-web-view';

export default function () {
  if (doc.pages[0].name === 'xscape') {
    const identifier = `identifier${Date.now()}`;

    let win = new BrowserWindow({
      identifier,
      width: 800,
      height: 600,
      alwaysOnTop: true,
    });
    win.on('closed', () => {
      win = null;
    });

    // Or load a local HTML file
    console.log(3333222)
    win.loadURL(require('../resources/webview.html'));
  }
}
