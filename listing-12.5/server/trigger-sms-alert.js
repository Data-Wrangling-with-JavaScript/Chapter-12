//
// Handles the 'incoming-data' event, triggers an SMS alert when PM10 particle account exceeds safe levels.
//

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can handle events.
const raiseSmsAlert = require('./sms-alert-system.js'); // Include the SMS alert system so we can send SMS text messages.
const config = require('./config.js');

eventHub.on("incoming-data", incomingData => { // Handle the 'incoming-data' event.
    const pm10Value = incomingData["PM10 (ug/m^3)"]; // Extract the value from the data that we are interested in.
    const pm10SafeLimit = config.alertLimits.maxSafePM10; // The max safe limit is read from the configuration file.
    if (pm10Value > pm10SafeLimit) { // Has the incoming data exceeded the safe limit?
        console.log("Alert triggered!!!!!!!!!!");
        console.log("Received PM10 value " + pm10Value + ", this has exceeded the safe limit of " + pm10SafeLimit);
        raiseSmsAlert("PM10 concentration has exceeded safe levels."); // Yes it has, send the SMS alert.
    }
});

