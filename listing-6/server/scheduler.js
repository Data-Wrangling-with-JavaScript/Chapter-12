//
// Raises time-based events.
//

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can raise events.
const cron = require('cron');

const jobSchedule = "00 * * * * *"; // Once per minute, the high frequency is for demonstration purposes.
//const jobSchedue = "00 00 06 * * 1-5"; // Uncomment this for once per day, Monday through Friday, at 6am.

function generateReport () { // Job to execute on schedule.
    eventHub.emit('generate-daily-report');
};

const cronJob = new cron.CronJob({ // Create the cron job.
    cronTime: jobSchedule, // Schedule at which to 'tick' the job.
    onTick: generateReport // Function to invoke on each 'tick'.
}); 

cronJob.start(); // Start the cron job.