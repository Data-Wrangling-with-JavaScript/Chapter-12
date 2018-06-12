"use strict";

const events = require('events');
const eventHub = new events.EventEmitter();

module.exports = eventHub;