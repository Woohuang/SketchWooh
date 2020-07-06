import sketch from 'sketch'
let doc = sketch.getSelectedDocument()

export default function() {

    let AllShape = sketch.find('ShapePath', doc.selectedPage)
    let RadiusRectangles = AllShape.filter(item => item.shapeType === "Rectangle" && item.points.findIndex(item2 => item2.cornerRadius > 0) !== -1 && item.name !== "AutoStyle")
    RadiusRectangles.forEach(item => item.selected = true)
    sketch.UI.message("Select " + RadiusRectangles.length + " layer(s)")

}