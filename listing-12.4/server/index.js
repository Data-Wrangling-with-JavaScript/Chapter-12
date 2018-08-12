"use strict";

const mongodb = require('mongodb');
const net = require('net');
const config = require('./config.js');

mongodb.MongoClient.connect(config.database.host) // Open connection to the database server.
    .then(client => {
        const db = client.db(config.database.name); // Retrieve the database we are using.
        const collection = db.collection("incoming"); // Retrieve the MongoDB collection where we will store incoming data.

        console.log("Connected to db");

        const server = net.createServer(socket => { // Create the socket server for data collection.
            console.log("Client connected!");
            
            socket.on("data", incomingJsonData => { // Handle incoming data packets.
                console.log("Storing data to database.");

                const incomingData = JSON.parse(incomingJsonData); // Deserialize incoming JSON data.

                collection.insertOne(incomingData) // Insert incoming data into the database.
                    .then(doc => { // The data was inserted successfully.
                        console.log("Data was inserted.");
                    })
                    .catch(err => { // Something went wrong while inserting the data.
                        console.error("Error inserting data.");
                        console.error(err);
                    });
            });

            socket.on("close", () => { // Callback for when the client closed the connection.
                console.log("Client closed the connection");
            });    

            socket.on("error", err => { // Add an error handler, mainly for ECONNRESET when the client abruptly disconnects.
                console.error("Caught socket error from client.");
                console.error(err);
            });
        });
                
        server.listen(config.server.portNo, config.server.hostName, () => { // Start listening for incoming socket connections.
            console.log("Waiting for clients to connect.");
        });
    });


