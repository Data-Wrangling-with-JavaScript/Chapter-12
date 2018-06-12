//
// Helper function to send an email (with an attachment).
//

"use strict";

const nodemailer = require('nodemailer');
const config = require('./config.js');

/* Uncomment this code once you have Mailgun setup and have added your details to config.js.

const transport = nodemailer.createTransport({ // Configure nodemailer and create a 'transport'.
    service: "smtp",
    host: config.smtp.hostname,
    secure: true,
    auth: {
        user: config.smtp.username,
        pass: config.smtp.password
    },
});

*/

function sendEmail (to, subject, text, html, attachments) { // Helper function to send an email with optional attachments.

    /* Uncomment this code once you have Mailgun setup and have added your details to config.js.
    

    const mailOptions = { // Configure options for the email.
        from: config.smtp.from, 
        to: to,
        subject: subject,
        text: text,
        html: html,
        attachments: attachments, 
    };

    return transport.sendMail(mailOptions); // Send the email, returns a promise.
    */

   console.log("Sending email to " + to);

   return Promise.resolve();
};

module.exports = sendEmail;