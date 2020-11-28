import sketch from 'sketch'
let UI = require('sketch/ui')
import { GA } from "./modules/xscapeFunctions"

export default function() {

    /*    
        //acquire log content
        let userWords = "null",
            userContact = "null"

        //issue content
        UI.getInputFromUser(
            "Write your suggestion or question here and I will contact you as soon as possible", {
                initialValue: '(less than 140 words…)',
                numberOfLines: 5,
            },
            (err, value) => {
                if (err) {
                    return
                } else {
                    if (value.length < 145) {
                        userWords = value
                            //contact content
                        UI.getInputFromUser(
                            "And your contact if possible", {
                                initialValue: '(email or…)',
                                numberOfLines: 1,
                            },
                            (err, value) => {
                                if (err) {
                                    return
                                } else {
                                    userContact = value

                                    //toast message
                                    sketch.UI.message("Thanks~")
                                }
                            }
                        )
                    } else {
                        userWords = "[Too Much Words (" + value.length + ")]"
                        UI.alert("Too much words", "It must be less than 140 words. Or you can directly send me an email to im@hihy.me")
                    }
                }
            }
        )

        userWords = userContact + "✚" + userWords

        //GA
        GA(userWords)
    */

    NSWorkspace.sharedWorkspace().openURL(NSURL.URLWithString("mailto:im@hihy.me"))
        //GA
    GA(":-)")

}