//
// Handle the event 'generate-daily-report', pull 24 hours of data from the database, generate a report
// then email the report to interested parties.
//

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can handle events.
const generateReport = require('./toolkit/generate-report.js');

function initGenerateDailyReport (incomingDataCollection) { // Function to initialise our report generation job (the database collection is passed in).
    eventHub.on('generate-daily-report', () => { // Handle the 'generate-daily-report' event.
        
        console.log("Generating daily report..."); 

        const reportFilePath = "./output/report.pdf"; // The file path for the report we are outputting.

        return incomingDataCollection.find() // Find records.
            .sort({ _id: -1 }) // Most recent first.
            .limit(24) // Limit to entries for most recent 24 hours.
            .toArray()
            .then(data => {
                const chartData = { // Prepare the data to display in the chart.
                    xFormat: "%d/%m/%Y %H:%M", // Format of the Date column, used by C3 to parse the data series for the X axis.
                    json: data,
                    keys: {
                        x: "Date",  
                        value: [
                            "PM10 (ug/m^3)"
                        ]
                    }
                };
                return generateReport(chartData, reportFilePath); // Render a report to a PDF file.
            })
            .then(() => {
                //todo:  email report.
                console.log("Generated the report!");
            });
    });
};

module.exports = initGenerateDailyReport;