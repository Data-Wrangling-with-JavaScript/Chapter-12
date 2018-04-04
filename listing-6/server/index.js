"use strict";

const mongodb = require('mongodb');
const initDataCollectionPoint = require('./data-collection-point.js');
const initGenerateDailyReport = require('./generate-daily-report.js');
require('./scheduler.js'); // Just require this, this sets up an event handler for the event 'incoming-data'.

const databaseHost = "mongodb://localhost:27017"; // Database host.
const databaseName = "air_quality"; // Database name.

mongodb.MongoClient.connect(databaseHost) // First thing, open connection to the database.
    .then(client => {
        const db = client.db(databaseName);
        const incomingDataCollection = db.collection("incoming");

        // Now we can initialise sub-systems that depend on the database.
        initDataCollectionPoint(incomingDataCollection);
        initGenerateDailyReport(incomingDataCollection);
    })
    .catch(err => {
        console.error("An error occurred during system initialisation.");
        console.error(err);
    });