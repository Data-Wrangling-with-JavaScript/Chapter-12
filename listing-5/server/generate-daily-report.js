//
// Handle the event 'generate-daily-report', pull 24 hours of data from the database, generate a report
// then email the report to interested parties.
//

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can handle events.
const generateReport = require('./toolkit/generate-report.js')
const mongodb = require('mongodb');

const databaseHost = "mongodb://localhost:27017"; // Database host.
const databaseName = "air_quality"; // Database name.

eventHub.on('generate-daily-report', () => { // Handle the 'generate-daily-report' event.
    
    console.log("Generating daily report..."); 

    mongodb.MongoClient.connect(databaseHost) //todo: Shouldn't have to remake the connection.
        .then(client => {
            const db = client.db(databaseName);
            const collection = db.collection("incoming");

            const reportFilePath = "./report.pdf";

            return collection.find() // Find records.
                .sort({ _id: -1 }) // Most recent first.
                .limit(24) // Limit to entries for most recent 24 hours.
                .toArray()
                .then(data => {
                    console.log(data); //fio:`
                    const chartData = {
                        json: data,
                        keys: {
                            x: "Date",  
                            value: [
                                "PM10 (ug/m^3)"
                            ]
                        }
                    };
                    return generateReport(chartData, reportFilePath);
                })
                .then(() => {
                    //todo:  email report.
                    console.log("Generated the report!");
                })
                .then(() => {
                    return client.close();
                });
        })
        .catch(err => {
            console.error("Error generating the report.");
            console.error(err);
        });
});


