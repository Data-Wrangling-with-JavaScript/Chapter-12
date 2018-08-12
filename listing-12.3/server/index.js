"use strict";

const net = require('net');
const config = require('./config.js'); // Load the configuration file, just like any other Node.js module.

const server = net.createServer(socket => {
	console.log("Client connected!");
    
    socket.on("data", incomingJsonData => {

        const incomingData = JSON.parse(incomingJsonData);

        console.log("Received: ");
        console.log(incomingData);
    });
    
    socket.on("close", () => {
        console.log("Client closed the connection");
    });    

    socket.on("error", err => {
        console.error("Caught socket error from client.");
        console.error(err);
    });
});

server.listen(config.server.portNo, config.server.hostName, () => { // Start the socket server with details loaded from the configuration file.
    console.log("Waiting for clients to connect.");
}); 
