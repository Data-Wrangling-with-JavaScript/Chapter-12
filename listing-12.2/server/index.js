"use strict";

const net = require('net');

const serverHostName = "localhost"; // Server setup details.
const serverPortNo = 3030;

const server = net.createServer(socket => {  // Create the socket server for data collection.
	console.log("Client connected!");
    
    socket.on("data", incomingJsonData => { // Handle incoming data packets.

        const incomingData = JSON.parse(incomingJsonData); // Deserialize incoming JSON data.

        console.log("Received: ");
        console.log(incomingData); // Just log out the data received so that we can check that it is coming through ok.
    });
    
    socket.on("close", () => { // Callback for when the client closed the connection.
        console.log("Client closed the connection");
    });    

    socket.on("error", err => { // Add an error handler, mainly for ECONNRESET when the client abruptly disconnects.
        console.error("Caught socket error from client.");
        console.error(err);
    });
});

server.listen(serverPortNo, serverHostName, () => { // Start listening for incoming socket connections.
    console.log("Waiting for clients to connect.");
}); 
