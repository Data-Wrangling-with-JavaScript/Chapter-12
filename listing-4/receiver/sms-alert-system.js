//
// A SMS text message alert system.
// 
// Adapted from Twilio quickstart: https://www.twilio.com/docs/sms/quickstart/node
//

"use strict";

const accountSid = "<your account sid>";
const authToken = "<your auth token>";

const toPhoneNumber = "<mobile phone number to receive alerts goes here>";
const fromPhoneNumber = "<mobile phone number to send alerts goes here>";

// Uncomment this code when you have a Twilio account.
//const twilioClient = require('twilio')(accountSid, authToken);

function raiseAlert (msg) { // Raise an alert via SMS text message.

    console.log("Register for Twilio, then uncomment the following code to send SMS text alerts.");

    /*
    return client.messages.create({
            to: toPhoneNumber,
            from: fromPhoneNumber,
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