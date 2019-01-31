const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4000;
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public/', express.static('public'));
app.use('/common/', express.static('common'));

//Database

global.db = mysql.createConnection({
    host: '35.235.82.216',
    user: process.env.SPACE_CITIZEN_DB_USERNAME,
    password: process.env.SPACE_CITIZEN_DB_PASSWORD,
    database: 'spacecitizen'
});

db.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log("Connected to database");
});

//Get routes
const AuthRoutes = require('./src/routes/AuthRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const MeRoutes = require('./src/routes/MeRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');
const ShipRoutes = require('./src/routes/ShipRoutes');
const MessageRoutes = require('./src/routes/MessageRoutes');

//Load the routes
router.use('/auth', AuthRoutes);
router.use('/users', UserRoutes);
router.use('/me', MeRoutes);
router.use('/items', ItemRoutes);
router.use('/ships', ShipRoutes);
router.use('/messages', MessageRoutes);

//Use the router
app.use('/api', router);

//Start the server
app.listen(port, () => console.log('server running on port ' + port));
