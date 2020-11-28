import sketch from 'sketch'
import { GA } from "./modules/xscapeFunctions"
let doc = sketch.getSelectedDocument(),
    selection = doc.selectedLayers.layers,
    UI = require('sketch/ui')

export default function() {

    const svgString =
        '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 801 496.42"><defs><style>.cls-1{fill:none;stroke:#e65c5c;stroke-miterlimit:10;}</style></defs><g id="layer2" data-name="layer2"><g id="layer1-2" data-name="layer1"><g id="group"><rect class="cls-1" x="568.17" y="350.37" width="14.52" height="14.52"/><rect class="cls-1" x="582.7" y="350.37" width="29.04" height="29.04"/><rect class="cls-1" x="568.17" y="306.81" width="43.56" height="43.56"/><rect class="cls-1" x="495.57" y="306.81" width="72.6" height="72.6"/><rect class="cls-1" x="495.57" y="379.41" width="116.16" height="116.16"/><rect class="cls-1" x="611.74" y="306.81" width="188.76" height="188.76"/><rect class="cls-1" x="568.17" y="364.89" width="14.52" height="14.52"/><rect class="cls-1" x="495.57" y="1.88" width="304.93" height="304.93"/><rect class="cls-1" x="1.88" y="1.88" width="493.69" height="493.69"/><path class="cls-1" d="M.5,495.57C.5,222.15,222.15.5,495.57.5"/><path class="cls-1" d="M495.57,1.88C664,1.88,800.5,138.4,800.5,306.81"/><path class="cls-1" d="M800.5,306.81c0,104.25-84.51,188.76-188.76,188.76"/><path class="cls-1" d="M611.74,495.92A116.51,116.51,0,0,1,495.23,379.41"/><path class="cls-1" d="M495.57,379.41a72.6,72.6,0,0,1,72.6-72.6"/><path class="cls-1" d="M568.17,306.81a43.57,43.57,0,0,1,43.57,43.56"/><path class="cls-1" d="M611.74,350.37a29,29,0,0,1-29,29"/><path class="cls-1" d="M582.7,379.41a14.53,14.53,0,0,1-14.53-14.52"/></g></g></g></svg>'

    const goldenGuideline = sketch.createLayerFromData(svgString, 'svg')

    //GA
    GA(":-)")
}