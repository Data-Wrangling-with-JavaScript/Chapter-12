"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.json());

app.post('/submit-data', (req, res) => {
    console.log(req.body);
    res.sendStatus(200);
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))