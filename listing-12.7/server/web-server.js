//
// The web-server for our live data visualization.
//

"use strict";

const express = require('express');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const updateVisualization = require('./update-visualization.js');

function startWebServer (db) { // Helper function to start our web server to host our web app and live data visualization.

    const incomingDataCollection = db.collection("incoming");

    const app = express();

    const httpServer = http.Server(app);
    const socketIOServer = socketIO(httpServer);    
    
    const staticFilesPath = path.join(__dirname, "public");
    const staticFilesMiddleWare = express.static(staticFilesPath);
    app.use("/", staticFilesMiddleWare);

    app.get("/rest/data", (req, res) => { // REST API that delivers data to the web app and its visualization.
        return incomingDataCollection.find() // Query the database for records.
            .sort({ _id: -1 }) // Get the most recent records first, a convenient method of sorting based on MongoDB ObjectIds.
            .limit(24) // Limit to entries for most recent 24 hours.
            .toArray()
            .then(data => {
                data = data.reverse(), // Reverse the data so it is in chronological order for display in the chart.
                res.json(data); // Send the data to the web app.
            })
            .catch(err => {
                console.error("An error occurred.");
                console.error(err);

                res.sendStatus(500); // Tell the web app that something went wrong.
            });
    });

    socketIOServer.on("connection", socket => { // Keep track of connections and disconnections. We want to be able to forward incoming data to the web app.
        updateVisualization.onConnectionOpened(socket);

        socket.on("disconnect", () => {
            updateVisualization.onConnectionClosed(socket);
        });
    });    
    
    httpServer.listen(3000, () => { // Start the server.
        console.log("Web server listening on port 3000!");
    });
};

module.exports = startWebServer;