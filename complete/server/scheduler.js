//
// Raises time-based events.
//

"use strict";

const eventHub = require('./event-hub.js'); // Include the event hub so we can raise events.
const cron = require('cron'); // Include the cron library for scheduled time-based tasks.
const config = require('./config.js');

function generateReport () { // Job to execute on schedule.
    eventHub.emit('generate-daily-report'); // Simply raise the event 'generate-daily-report' and let the rest of the system deal with it.
};

const cronJob = new cron.CronJob({ // Create the cron job.
    cronTime: config.dailyReport.schedule, // Schedule at which to 'tick' the job.
    onTick: generateReport // Function to invoke on each 'tick'.
}); 

cronJob.start(); // Start the cron job.