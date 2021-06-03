import sketch from "sketch";
let system = require("./modules/System"),
  Page = require("sketch/dom").Page,
  Document = require("sketch/dom").Document,
  UI = require("sketch/ui"),
  SymbolMaster = require("sketch/dom").SymbolMaster;
import { GA } from "./modules/xscapeF";

export default function () {
  let CreateResult = 0;

  //choose TheSource.sketch
  sketch.UI.alert("First Step", "Choose TheSource.sketch");
  let chooseFile = system.chooseFile(["sketch"]);
  if (!chooseFile) {
    return;
  } else {
    let fileURL = NSURL.fileURLWithPath(chooseFile),
      error = MOPointer.alloc().init(),
      newDocument = MSDocument.alloc().init();
    newDocument.readFromURL_ofType_error(
      fileURL,
      "com.bohemiancoding.sketch.drawing",
      error
    );
    let wrappedDoc = sketch.fromNative(newDocument);

    //main function begins
    let TC_library = new Document();

    //sync shared styles and colors
     TC_library.sharedTextStyles = wrappedDoc.sharedTextStyles;
    TC_library.sharedLayerStyles = wrappedDoc.sharedLayerStyles;
    TC_library.colors = wrappedDoc.colors;
    TC_library.swatches = wrappedDoc.swatches;

    //create symbols page
    let SymbolsPage = Page.createSymbolsPage();
    SymbolsPage.parent = TC_library;
    let CustomMasterInfo = new SymbolMaster({
      name: "Custom/👇Creat Your Own Symbols In This Page",
    });
    CustomMasterInfo.parent = Page.getSymbolsPage(TC_library);
    CustomMasterInfo.frame.width = 20;
    CustomMasterInfo.frame.height = 20;
    TC_library.pages.splice(0, 1);

    //sync pages and symbols
    for (let i = 0, len = wrappedDoc.pages.length; i < len; i++) {
      //because sketch will remove the layer object from the original doc array after been spliced to another, so in this loop everytime it need be pages[0] instead of pages[i]
      TC_library.pages.push(wrappedDoc.pages[0]);
    }
    TC_library.pages = TC_library.pages.splice(
      1,
      0,
      new Page({ name: "CustomStyles" }),
      new Page({ name: "IrregularTxtStyles" })
    );

    //rename symbols page's name
    Page.getSymbolsPage(TC_library).name = "Custom";

    //set path and save
    sketch.UI.alert("Second Step", "Choose a folder to save it");
    let SavePath;
    let chooseFolder = system.chooseFolder(["sketch"]);
    if (!chooseFolder) {
      return;
    } else {
      UI.getInputFromUser(
        "Enter New Library Name",
        {
          initialValue: "ChildLibrary",
        },
        (err, value) => {
          if (err) {
            return;
          } else {
            SavePath = chooseFolder + "/TS_" + value + ".sketch";
            TC_library.save(SavePath, {
              saveMode: Document.SaveMode.SaveAs,
            });
            sketch.UI.message("Succeed In Creating");
            CreateResult = 1;
          }
        }
      );
    }
  }

  //toast result
  if (CreateResult === 0) {
    sketch.UI.message("Fail In Creating");
  }
  //GA
  GA(":-)");
}
