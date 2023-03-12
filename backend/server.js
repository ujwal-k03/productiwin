const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const checkAuth = require('./authMiddleware');

// env variables
require('dotenv').config();
PORT = process.env.PORT;

// express app and routers
const app = express();
const deadlineRoutes = require('./routes/deadlines');
const planRoutes = require('./routes/plans');
const authRoutes = require('./routes/auth');

// middleware
// parse json data and attach it to req.body
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
    console.log(req.path, req.method);
    next();
})
app.use(checkAuth);

// routes
app.use('/api/deadlines', deadlineRoutes);
app.use('/api/plans', planRoutes);
app.use('/api/auth/', authRoutes);

// connect to DB
DB_URI = process.env.DBURI;
mongoose.connect(DB_URI, {dbName: 'productiwin'})
.then(() => {
    console.log("Connected to db");
    // listen for requests
    app.listen(PORT, () => {
        console.log(`Backend listening on port ${PORT}`);
    })
})
.catch((error) => {
    console.log(error);
})
