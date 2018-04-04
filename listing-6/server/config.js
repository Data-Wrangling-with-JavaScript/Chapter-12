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
    // Configuration for generation of the daily report.
    //
    dailyReport: {
        // Once per minute, this high frequency of report generation is for demonstration purposes.
        schedule:  "00 * * * * *", 

        // Uncomment this for daily report generation only once per day, Monday through Friday, at 6am.
        //schedule:  "00 00 06 * * 1-5", 
    },
};