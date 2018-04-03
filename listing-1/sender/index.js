//
// Emulates a 'sender' of data to our Node.js server.
//

"use strict";

const fs = require('fs');
const request = require('request-promise');
const importCsvFile = require('./toolkit/importCsvFile.js');

const location = "brisbanecbd";
const dataFilePath = "../../data/brisbanecbd-aq-2014.csv";

const dataSubmitUrl = "http://localhost:3000/data-collection-point"; // URL for our Node.js server.

importCsvFile(dataFilePath)
    .then(data => {
        let curIndex = 0;

        setInterval(() => { // Every second send a chunk of data to the server.
        
                const outgoingData = Object.assign({}, data[curIndex]); // Clone the data so we can modify it.
                curIndex += 1;
        
                outgoingData.Location = location; // Tag the data with a location so that we can differentuate our data sources.

                console.log("Sending data to server!");
        
                request.post({
                    method: "POST",
                    uri: dataSubmitUrl, 
                    body: outgoingData,
                    json: true
                });
         
            }, 1000);
    })
    .catch(err => {
        console.error("An error occured.");
        console.error(err);
    });

