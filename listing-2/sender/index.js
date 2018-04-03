"use strict";

const fs = require('fs');
const request = require('request-promise');
const papa = require('papaparse');
const net = require('net');

const client = new net.Socket();
client.connect(1337, '127.0.0.1', function() {
	console.log('Connected to server!');
});

client.on('close', function() {
	console.log('Server closed the connection.');
});


//
// Load example data.
//
const location = "brisbanecbd";
const parsed = papa.parse(fs.readFileSync("./data/brisbanecbd-aq-2014.csv", "utf8"), { dynamicTyping: true, header: true });
const data = parsed.data;

let curIndex = 0;

setInterval(() => { // Every second send a chunk of data to the server.

        const postData = Object.assign({}, data[curIndex]);
        curIndex += 1;

        postData.Location = location; // Tag the data with a location so that we can differentuate our data sources.

        client.write(JSON.stringify(postData));
 
    }, 1000);