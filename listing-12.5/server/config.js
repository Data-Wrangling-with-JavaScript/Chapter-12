//
// A simple JavaScript configuration file.
// Gathers all the configuration for our server in the same place.
//

"use strict";

module.exports = {
    server: {
        hostName: "localhost", // Server setup details.
        portNo: 3030    
    },
    
    database: { // Database connection details.
        host: "mongodb://localhost:27017",
        name: "air_quality"                
    },

    //
    // Threshold values that trigger alerts.
    //
    alertLimits: {
        //
        // Set the maximum safe level of PM10 particles in the air before the alert is triggered.
        //
        maxSafePM10: 80 // Air quality is deemed to be 'poor' when PM10 is 80 or greater.
    },    

    twilio: { // Twilio SMS API configuration - add details here for your own Twilio account.
        accountSid: "<your account sid>",
        authToken: "<your auth token>",        
        toPhoneNumber: "<mobile phone number to receive alerts goes here>",
        fromPhoneNumber: "<mobile phone number to send alerts goes here>"    
    }
};