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
    },

    // 
    // Configuration for generation of the daily report.
    //
    dailyReport: {
        // Once per minute, this high frequency of report generation is for demonstration purposes.
        schedule:  "00 * * * * *", 

        // Uncomment this for daily report generation only once per day, Monday through Friday, at 6am.
        //schedule:  "00 00 06 * * 1-5", 

        recipients: [ // Email recipients to be sent the automatically generated daily report.
            "<add your email addresses here>"
        ]
    },

    smtp: {
        hostname: "smtp.mailgun.org",
        username: "<add your smtp email username here>",
        password: "<add your smtp email password here>",
        from: "<add your from and reply-to email address here>"
    }
};