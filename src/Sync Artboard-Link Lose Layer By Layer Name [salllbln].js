import sketch from "sketch";
let doc = sketch.getSelectedDocument();
let Settings = require("sketch/settings");
import { GA } from "./modules/xscapeF";

export default function () {
  //acquire Link_ layer
  let AllImg = sketch.find("Image", doc.selectedPage);
  let allLoseLinkPngs = AllImg.filter(
    (item) =>
      item.name.indexOf("Link_") !== -1 && item.name.indexOf("Lose") !== -1
  );
  if (allLoseLinkPngs.length > 0) {
    //acquire all arrboards
    let allArtboards = [];

    //match in all doc
    // doc.pages.forEach((item) => {
    //   allArtboards = allArtboards.concat(
    //     item.layers.filter((item) => item.type === "Artboard")
    //   );
    // });

    //match in current page
    allArtboards = doc.selectedPage.layers.filter(
      (item) => item.type === "Artboard"
    );

    //collect Link_ names
    let nameArray = [];
    for (let i = 0, len = allLoseLinkPngs.length; i < len; i++) {
      let artboartName = allLoseLinkPngs[i].name.split("Link_").pop();
      if (nameArray.findIndex((item) => item === artboartName) === -1) {
        nameArray.splice(nameArray.length, 0, artboartName);
      }
    }

    //set export option
    let string = NSPasteboard.generalPasteboard().stringForType(
        NSPasteboardTypeString
      ),
      CopyNumber = (string - 0) * 1,
      scales = CopyNumber === 3 ? 3 : CopyNumber === 2 ? 2 : 1,
      matchedArtboards,
      SyncResult = 0;

    const LinkPngOptions = { formats: "png", output: false, scales: scales };

    //start syncing
    nameArray.forEach((item) => {
      matchedArtboards = allArtboards.filter((item2) => item2.name === item);

      //name unique and available
      if (matchedArtboards.length === 1) {
        let LinkArtboard = matchedArtboards[0];

        let LinkPng = sketch.export(LinkArtboard, LinkPngOptions);

        let LinkPngLayer = sketch.createLayerFromData(LinkPng, "bitmap");

        allLoseLinkPngs
          .filter((item2) => item2.name.split("Link_").pop() === item)
          .forEach((item3) => {
            item3.image = LinkPngLayer.image;
            item3.frame.width = LinkArtboard.frame.width;
            item3.frame.height = LinkArtboard.frame.height;
            item3.name = "🧶Link_" + LinkArtboard.name;
            item3.locked = true;
            SyncResult = SyncResult + 1;

            //LinkPngLayer 储存 Artboard id
            Settings.setLayerSettingForKey(
              item3,
              "ArtboardId",
              LinkArtboard.id
            );
          });
      }

      //id unavailable
      else if (matchedArtboards.length > 1) {
        matchedArtboards.forEach((item2) => {
          item2.name.replace("Lose", "NameRepetition_Lose");
        });
      }
    });

    //toast message
    sketch.UI.message(
      "Succeed In Syncing " + SyncResult + " Layer In This Page"
    );
  }

  //no link lose layer
  else {
    sketch.UI.message("No Link Lose Layer");
  }

  //GA
  GA(":-)");
}
