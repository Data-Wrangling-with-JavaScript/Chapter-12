"use strict";

const net = require('net');

const server = net.createServer(socket => {
	console.log("Client connected!");
    
    socket.on('data', function(data) {
        console.log('Received: ');
        console.log(JSON.parse(data));
    });
    
    socket.on('close', function() {
        console.log('Client closed the connection');
    });    
});

server.listen(1337, '127.0.0.1');
