const express = require('express');

// env variables
require('dotenv').config();
PORT = process.env.PORT 

// express app
const app = express();

// middleware
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})

// routes
app.get('/', (req, res) => {
    res.json({mssg: 'Hi whats up'});
})

// listen for requests
app.listen(PORT, () => {
    console.log(`Backend listening on port ${PORT}`);
})