//
// Handles the 'incoming-data' event, triggers an SMS alert when PM10 particle account exceeds safe levels.

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can handle events.
const smsAlertSystem = require('./sms-alert-system.js'); // Include the SMS alert system so we can send SMS text messages.

const maxSafePM10 = 80; // Set the maximum safe level of PM10 particles in the air before the alert is triggered.

eventHub.on('incoming-data', (id, data) => { // Handle the 'incoming-data' event.

    if (data["PM10 (ug/m^3)"] > maxSafePM10) {
        smsAlertSystem.raiseAlert("PM10 concentration has exceeded safe levels.");
    }
});

