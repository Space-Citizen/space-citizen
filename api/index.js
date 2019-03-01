const express = require('express');
const mysql = require('mysql');
const app = express();
const port = 4000;
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public/', express.static('public'));
app.use('/static/common/', express.static('common'));

//Database

global.db = mysql.createPool({
    host: process.env.SPACE_CITIZEN_DB_URL,
    user: process.env.SPACE_CITIZEN_DB_USERNAME,
    password: process.env.SPACE_CITIZEN_DB_PASSWORD,
    database: 'spacecitizen'
});

// db.connect(function (err) {
//     if (err) {
//         console.error('error connecting: ' + err.stack);
//         return;
//     }
//     console.log("Connected to database");
// });

//Get routes
const AuthRoutes = require('./src/routes/AuthRoutes');
const FactionRoutes = require('./src/routes/FactionRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');
const MeRoutes = require('./src/routes/MeRoutes');
const MessageRoutes = require('./src/routes/MessageRoutes');
const ShipRoutes = require('./src/routes/ShipRoutes');
const UserRoutes = require('./src/routes/UserRoutes');

//Load the routes
router.use('/auth', AuthRoutes);
router.use('/factions', FactionRoutes);
router.use('/items', ItemRoutes);
router.use('/me', MeRoutes);
router.use('/messages', MessageRoutes);
router.use('/ships', ShipRoutes);
router.use('/users', UserRoutes);

//Use the router
app.use('/api', router);

//Start the server
app.listen(port, () => console.log('server running on port ' + port));
