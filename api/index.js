const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4000;
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//Database
const dbPool = mysql.createPool({
    host: '35.235.82.216',
    user: process.env.SPACE_CITIZEN_DB_USERNAME,
    password: process.env.SPACE_CITIZEN_DB_PASSWORD,
    database: 'spacecitizen'
});

// connect to database
dbPool.getConnection(function (err, connection) {
    if (err) {
        console.log("mysql connect err:", err);
        return;
    }
    //save variable as global
    console.log('Connected to database');
    global.db = connection;
});


//Get routes
const AuthRoutes = require('./src/routes/AuthRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const MeRoutes = require('./src/routes/MeRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');
const ShipRoutes = require('./src/routes/ShipRoutes');

//Load the routes
router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/me', MeRoutes);
router.use('/items', ItemRoutes);
router.use('/ships', ShipRoutes);

//Use the router
app.use('/api', router);

//Start the server
app.listen(port, () => console.log('server running on port ' + port));
