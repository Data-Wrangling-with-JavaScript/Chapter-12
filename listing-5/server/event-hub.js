"use strict";

const events = require('events');
const eventHub = new events.EventEmitter(); // Instantiate a Node.js EventEmitter as our 'event hub'.

module.exports = eventHub; // Export the event hub for other modules to rely on.