//
// Our Node.js that recieves incoming data via HTTP POST.
//

"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post('/data-collection-point', (req, res) => { // REST API endpoint that recieves submitted data.
    console.log(req.body); // Not doing anything with the data yet, just print to check that it is coming through.
    res.sendStatus(200); // Respond to the client with HTTP STATUS 200 (status ok).
});

app.listen(3000, () => console.log('Data collection point listening on port 3000!'))