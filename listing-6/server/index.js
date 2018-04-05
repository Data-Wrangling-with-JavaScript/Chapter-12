"use strict";

const mongodb = require('mongodb');
const initDataCollectionPoint = require('./data-collection-point.js');
const initGenerateDailyReport = require('./generate-daily-report.js');
require('./scheduler.js'); // Just require this, this sets up an event handler for the event 'incoming-data'.
const config = require('./config.js');

mongodb.MongoClient.connect(config.database.host) // Open connection to the database.
    .then(client => {
        console.log("Connected to db");

        const db = client.db(config.database.name);

        // Now we can initialise sub-systems that depend on the database.
        initDataCollectionPoint(db);
        initGenerateDailyReport(db);
    })
    .catch(err => {
        console.error("An error occurred during system initialisation.");
        console.error(err);
    });