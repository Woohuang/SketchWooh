import sketch from 'sketch'

export default function() {
    let string = NSPasteboard.generalPasteboard().stringForType(NSPasteboardTypeString)
    if (string != "....") {
        sketch.UI.message(":-)")
    } else {
        //start
        //*********
        //*********
        //*********
        //*********
        //*********

        // ColorPicker main window
        var threadDictionary = NSThread.mainThread().threadDictionary();
        var identifier = "com.ashung.hung.hsl_color_picker";
        if (threadDictionary[identifier]) {
            return;
        }

        // Window size
        var windowWidth = 240,
            windowHeight = 180;
        var colorPicker = NSPanel.alloc().init();
        colorPicker.setFrame_display(NSMakeRect(0, 0, windowWidth, windowHeight), true);
        colorPicker.setStyleMask(NSTexturedBackgroundWindowMask | NSTitledWindowMask | NSClosableWindowMask);
        colorPicker.setBackgroundColor(NSColor.whiteColor());

        // show buttons?
        //colorPicker.standardWindowButton(NSWindowCloseButton).setHidden(true);
        colorPicker.standardWindowButton(NSWindowMiniaturizeButton).setHidden(true);
        colorPicker.standardWindowButton(NSWindowZoomButton).setHidden(true);

        // Titlebar
        colorPicker.setTitle("Xscape!");
        colorPicker.setTitlebarAppearsTransparent(true);
        colorPicker.becomeKeyWindow();
        colorPicker.setLevel(NSFloatingWindowLevel);
        threadDictionary[identifier] = colorPicker;

        // Add Web View to window
        var webView = WebView.alloc().initWithFrame(NSMakeRect(0, -24, windowWidth, windowHeight));
        webView.setMainFrameURL_(context.plugin.urlForResourceNamed("UI.html").path());
        colorPicker.contentView().addSubview(webView);
        colorPicker.center();
        colorPicker.makeKeyAndOrderFront(nil);

        //*********
        //*********
        //*********
        //*********
        //*********
        //*********
        //end and reload plugin
        AppController.sharedInstance().pluginManager().reloadPlugins()
        sketch.UI.message("OK2")
    }
}