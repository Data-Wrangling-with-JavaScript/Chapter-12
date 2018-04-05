//
// Handle the event 'generate-daily-report', pull 24 hours of data from the database, generate a report
// then email the report to interested parties.
//

"use strict";

const generateReport = require('./toolkit/generate-report.js');
const sendEmail = require('./send-email.js');
const config = require('./config.js');

function generateDailyReport (db) { // Function to initialise our report generation job (the database collection is passed in).

    console.log("Generating daily report..."); 

    const incomingDataCollection = db.collection("incoming");

    const reportFilePath = "./output/daily-report.pdf"; // The file path for the report we are outputting.

    return incomingDataCollection.find() // Query the database for records.
        .sort({ _id: -1 }) // Get the most recent records first, a convenient method of sorting based on MongoDB ObjectIds.
        .limit(24) // Limit to entries for most recent 24 hours.
        .toArray()
        .then(data => {
            const chartData = { // Prepare the data to display in the chart.
                xFormat: "%d/%m/%Y %H:%M", // Format of the Date column, used by C3 to parse the data series for the X axis.
                json: data.reverse(), // Reverse the data so it is in chronological order for display in the chart.
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
            const subject = "Daily report"; // This subject and then the body of the email.
            const text = "Your daily report is attached."; 
            const html = text; // Could also include a fancy html formatted version of the email here.
            const attachments = [ // Specify attachments to send with the email.
                { // We only need a single attachment here, but you could easily add more.
                    path: reportFilePath, // The file to be attached.
                }
            ];
            return sendEmail(config.dailyReport.recipients, subject, text, html, attachments); // Send the report to specified recipients.
        });
};

module.exports = generateDailyReport;