//
// Emulates a 'sender' of data to our Node.js server.
//

"use strict";

const fs = require('fs');
const request = require('request-promise');
const importCsvFile = require('./toolkit/importCsvFile.js');
const net = require('net');

const location = "brisbanecbd"; // Location tag for the example data.
const dataFilePath = "../../data/brisbanecbd-aq-2014.csv"; // CSV file containing example data.

const serverHostName = "localhost"; // Server connection details.
const serverPortNo = 3030;

const client = new net.Socket();
client.connect(serverPortNo, serverHostName, () => { // Connect the socket to our server.
	console.log("Connected to server!");
});

client.on("close", () => { // Callback when server has closed the connection.
	console.log("Server closed the connection.");
});

importCsvFile(dataFilePath) // Load the example data from the CSV file.
    .then(data => {
        let curIndex = 0;

        setInterval(() => { // Every second send a chunk of data to the server.
        
                const outgoingData = Object.assign({}, data[curIndex]); // Clone the data so we can modify it.
                curIndex += 1; // Work our way through the example data.
        
                outgoingData.Location = location; // Tag the data with a location so that we can differentuate our data sources. We'll need this later when we are accepting data from a variety of different locations.

                const outgoingJsonData = JSON.stringify(outgoingData); // Convert the data to JSON format.
        
                client.write(outgoingJsonData); // Send JSON data over the wire.
         
            }, 1000);
    })
    .catch(err => {
        console.error("An error occurred.");
        console.error(err);
    });