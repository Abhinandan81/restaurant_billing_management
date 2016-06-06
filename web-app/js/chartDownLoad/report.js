/**
 * Create page object
 */
var page = require('webpage').create(),
    system = require('system');


//viewportSize being the actual size of the headless browser
page.viewportSize = {width: 1024, height: 2000};

//the clipRect is the portion of the page you are taking a screenshot of
//page.clipRect = { top: 0, left: 0, width: 1024, height: 2000 };

/**
 * Check for required parameters
 */
if (system.args.length < 3) {
    console.log('Usage: report.js <some URL> <output path/filename>');
    phantom.exit();
}

/**
 * Grab the page and output it to specified target
 * It is very important to call phantom.exit at some point in the script, otherwise PhantomJS will not be terminated at all.
 */
page.open(system.args[1], function (status) {
    console.log("Status: " + status);

    var selector = system.args[2];
    console.log("selector is : " + selector);

    /**
     * Output the result
     */
    var callbackFunction = function () {
        if (status === "success") {

            //for selecting the specific element on the given page
            var clipRect = page.evaluate(function (id) {
                var result = document.querySelector("#" + id).getBoundingClientRect();
                return result;
            }, selector);

            page.clipRect = {
                top: clipRect.top,
                left: clipRect.left,
                width: clipRect.width,
                height: clipRect.height
            };

            page.render(system.args[3]);
        }
        phantom.exit();
    };

    window.setTimeout(callbackFunction, 2000);       //Given delay of 2sec. to complete the animation if any
});