//
// Handle the event 'generate-daily-report' and trigger report generation.
//

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can handle events.
const generateDailyReport = require('./generate-daily-report.js');

function initGenerateDailyReport (incomingDataCollection) { // Function to initialise our report generation job (the database collection is passed in).
    eventHub.on('generate-daily-report', () => { // Handle the 'generate-daily-report' event.
        generateDailyReport(incomingDataCollection) // Actually generate the report.
            .then(() => {
                console.log("Report was generated.");
            })
            .catch(err => {
                console.error("Failed to generate report.");
                console.error(err);
            });
    });
};

module.exports = initGenerateDailyReport;