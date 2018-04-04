"use strict";

const mongodb = require('mongodb');
const net = require('net');

const serverHostName = "localhost"; // Server setup details.
const serverPortNo = 3030;

const databaseHost = "mongodb://localhost:27017"; // Database host.
const databaseName = "air_quality"; // Database name.

mongodb.MongoClient.connect(databaseHost) // Open connection to the database.
    .then(client => {
        const db = client.db(databaseName);
        const collection = db.collection("incoming");

        console.log("Connected to db");

        const server = net.createServer(socket => { // Create the socket server for data collection.
            console.log("Client connected!");
            
            socket.on('data', incomingJsonData => { // Handle incoming data packets.
                console.log("Storing data to database.");

                const incomingData = JSON.parse(incomingJsonData); // Deserialize incoming JSON data.

                collection.insertOne(incomingData) // Insert data into the database.
                .then(doc => { // The data was inserted successfully.
                        console.log("Data was inserted.");
                    })
                    .catch(err => { // Something went wrong while inserting the data.
                        console.error("Error inserting data.");
                        console.error(err);
                    });
            });

            socket.on('close', () => { // Callback for when the client closed the connection.
                console.log('Client closed the connection');
            });    

            socket.on('error', err => { // Add an error handler, mainly for ECONNRESET when the client abruptly disconnects.
                console.error("Caught socket error from client.");
                console.error(err);
            });
        });
                
        server.listen(serverPortNo, serverHostName, () => { // Start listening for incoming socket connections.
            console.log("Waiting for clients to connect.");
        });
    });


