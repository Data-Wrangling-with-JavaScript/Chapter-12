"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can raise events.
const net = require('net');
const config = require('./config.js');

function initDataCollectionPoint (incomingDataCollection) { // Function to initialise our data collection point (the database collection is passed in).

    console.log("Connected to db");

    const server = net.createServer(socket => { // Create the socket server for data collection.
        console.log("Client connected!");
        
        socket.on('data', incomingJsonData => { // Handle incoming data packets.
            console.log("Storing data to database.");

            const incomingData = JSON.parse(incomingJsonData); // Deserialize incoming JSON data.

            incomingDataCollection.insertOne(incomingData) // Insert data into the database.
                .then(doc => { // The data was inserted successfully.
                    console.log("Data was inserted, raising event 'incoming-data'");

                    eventHub.emit('incoming-data', doc.insertedCount, incomingData); // Raise the 'incoming-data' event.
                })
                .catch(err => { // Something went wrong while inserting the data.
                    console.error("Error inserting data.");
                    console.error(err);
                });
        });
        
        socket.on('close', () => {
            console.log('Client closed the connection');
        });    

        socket.on('error', err => { // Add an error handler, mainly for ECONNRESET when the client abruptly disconnects.
            console.error("Caught socket error from client.");
            console.error(err);
        });    
    });
            
    server.listen(config.server.portNo, config.server.hostName, () => { // Start listening for incoming socket connections.
        console.log("Waiting for clients to connect.");
    });
};

module.exports = initDataCollectionPoint;