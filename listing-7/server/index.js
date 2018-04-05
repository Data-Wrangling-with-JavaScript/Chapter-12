"use strict";

const mongodb = require('mongodb');
const initDataCollectionPoint = require('./data-collection-point.js');
const startWebServer = require('./web-server.js');
const config = require('./config.js');

mongodb.MongoClient.connect(config.database.host) // Open connection to the database.
    .then(client => {
        const db = client.db(config.database.name);
        const incomingDataCollection = db.collection("incoming");

        // Now we can initialise sub-systems that depend on the database.
        initDataCollectionPoint(incomingDataCollection);
        startWebServer(db);
    })
    .catch(err => {
        console.error("An error occurred during system initialisation.");
        console.error(err);
    });