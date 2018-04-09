"use strict";

const webServer = require('./template-report/web-server.js');
const captureReport = require('./capture-report.js');

const webServerPortNo = 5252;

//
// A function that renders a report to a PDF file.
//
function generateReport (data, outputPdfPath) {
    return webServer.start(webServerPortNo, data)
        .then(server => {
            const urlToCapture = "http://localhost:" + webServerPortNo;
            return captureReport(urlToCapture, "svg", outputPdfPath)
                .then(() => server.close());
        });
};

module.exports = generateReport;