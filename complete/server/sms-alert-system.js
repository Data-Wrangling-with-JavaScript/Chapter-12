//
// A SMS text message alert system.
// 
// Adapted from Twilio quickstart: https://www.twilio.com/docs/sms/quickstart/node
//

"use strict";

const config = require('./config.js');

// Uncomment this code when you have a Twilio account.
//const twilioClient = require('twilio')(config.twilio.accountSid, config.twilio.authToken);

function raiseSmsAlert (msg) { // Raise an alert via SMS text message.

    console.log("Register for Twilio, then uncomment the following code to send SMS text alerts.");

    /*
    return client.messages.create({
            to: config.twilio.toPhoneNumber,
            from: config.twilio.fromPhoneNumber,
            body: "[ALERT]: " + msg,
        })
        .then(() => {
            console.log("SMS message successfully sent.");
        })
        .catch(err => {
            console.error("Failed to send SMS message.");
            console.error(err);
        });
    */
};

module.exports = raiseSmsAlert;