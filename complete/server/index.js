"use strict";

const mongodb = require('mongodb');
const initDataCollectionPoint = require('./data-collection-point.js');
const startWebServer = require('./web-server.js');
const initGenerateDailyReport = require('./generate-daily-report.js');
require('./trigger-sms-alert.js');
const config = require('./config.js');

mongodb.MongoClient.connect(config.database.host) // Open connection to the database.
    .then(client => {

        console.log("Connected to db");

        const db = client.db(config.database.name);

        // Now we can initialise sub-systems that depend on the database.
        initDataCollectionPoint(db);
		initGenerateDailyReport(db);
        startWebServer(db);
    })
    .catch(err => {
        console.error("An error occurred during system initialisation.");
        console.error(err);
    });