"use strict";

const mongodb = require('mongodb');
const initDataCollectionPoint = require('./data-collection-point.js');
require('./trigger-sms-alert.js'); // Just require this, this sets up an event handler for the event 'incoming-data'.
const config = require('./config.js');

mongodb.MongoClient.connect(config.database.host) // Open connection to the database.
    .then(client => {
        const db = client.db(config.database.name);        

        // Now we can initialise sub-systems that depend on the database.
        initDataCollectionPoint(db); // Initialise our data collection point that depends on the database.
    })
    .catch(err => {
        console.error("An error occurred during system initialisation.");
        console.error(err);
    });