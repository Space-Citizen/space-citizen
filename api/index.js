const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4000;
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Database
const db = mysql.createConnection({
    host: '35.235.82.216',
    user: process.env.SPACE_CITIZEN_DB_USERNAME,
    password: process.env.SPACE_CITIZEN_DB_PASSWORD,
    database: 'spacecitizen'
});

// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});

//save variable as global
global.db = db;

//Get routes
const AuthRoutes = require('./src/routes/AuthRoutes');
const UserRoutes = require('./src/routes/UserRoutes');

//Load the routes
router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);

//Use the router
app.use('/api', router);

//Start the server
app.listen(port, () => console.log('server running on port ' + port));
