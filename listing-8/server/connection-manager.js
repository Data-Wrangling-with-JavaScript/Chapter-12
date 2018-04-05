//
// This file manages the connections to the web-app and forwards incoming data to the live visualization via the socket IO connection.
//

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can handle events.

const openSockets = []; // Array of currently open socket IO connections.

function onConnectionOpened (openedSocket) { // Function to call when a socket IO connection has been opened.
    openSockets.push(openedSocket);
};

function onConnectionClosed (closedSocket) { // Function to call when a socket IO connection has been closed.
    const socketIndex = openSockets.indexOf(closedSocket);
    if (socketIndex >= 0) {
        openSockets.splice(socketIndex, 1);
    }
};

eventHub.on("incoming-data", (id, incomingData) => {
    for (let socketIndex = 0; socketIndex < openSockets.length; ++socketIndex) {
        const socket = openSockets[socketIndex];
        socket.emit("incoming-data", incomingData);

        //todo: coudl just send the data to everyone!
    }
});

module.exports = {
    onConnectionOpened: onConnectionOpened,
    onConnectionClosed: onConnectionClosed
}