//
// A reusable toolkit function to capture a web page to an image file using Nightmare.
//

"use strict";

const Nightmare = require('nightmare');

//
// Capture a multi-page report to a PDF file.
//
function captureReport (urlToCapture, captureElementSelector, outputPdfFilePath) {

    const nightmare = new Nightmare(); // Create an Nightmare instance.
    return nightmare.goto(urlToCapture) // Point the browser at the requested web page.
        .wait(captureElementSelector) // Wait until the specified HTML element appears on the screen. 
        .evaluate(() => { // Evaluate JavaScript code within the headless browser. This function returns a promise which changes the way our code works.
            const body = document.querySelector("body"); // Find the body element of the web page.
            return { // Return details computed in the headless browser to Node.js.
                documentArea: { // Return the scrollable area of the page, we will expand the size of the browser window to cover the entire documents (thus removing any scrollbars we might otherwise capture).
                    width: body.scrollWidth,
                    height: body.scrollHeight
                },
            };
        })
        .then(pageDetails => { // Retrieve details computed in the headless browser. We can now use these value in subsequent Node.js code.
            const printOptions = {
                marginsType: 0, // No margins. We want to be able to set our margins explicitly in CSS.
                pageSize: { // The size of each page. These values match the specification for the A4 page size standard, but in landscape.
                    width: 297000, // 29.7cm (in microns, don't ask me why they put this is in microns).
                    height: 210000, // 21cm (in microns)
                },
                landscape: true,
            };
            return nightmare.viewport(pageDetails.documentArea.width, pageDetails.documentArea.height) // Set the viewport to cover the area of the chart.
                .pdf(outputPdfFilePath, printOptions) // Capture the entire web page to a PDF report.
                .end(); // End the Nightmare session. Any queued operations are complated and the headless browser is terminated.
        });
};

module.exports = captureReport;