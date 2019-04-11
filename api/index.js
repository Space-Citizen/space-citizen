const express = require('express');
const path = require('path');
const mysql = require('mysql');
const morgan = require('morgan');
const app = express();
const port = 4000;
const router = express.Router();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));
app.use('/static/common', express.static(path.join(__dirname, 'common')));
app.use(morgan('dev'));
//Database

global.db = mysql.createPool({
    host: process.env.SPACE_CITIZEN_DB_URL,
    user: process.env.SPACE_CITIZEN_DB_USERNAME,
    password: process.env.SPACE_CITIZEN_DB_PASSWORD,
    database: 'spacecitizen',
    multipleStatements: true
});

//Get routes
const AuthRoutes = require('./src/routes/AuthRoutes');
const FactionRoutes = require('./src/routes/FactionRoutes');
const ItemRoutes = require('./src/routes/ItemRoutes');
const LeaderboardRoutes = require('./src/routes/LeaderboardRoutes');
const MeRoutes = require('./src/routes/MeRoutes');
const MessageRoutes = require('./src/routes/MessageRoutes');
const ShipRoutes = require('./src/routes/ShipRoutes');
const UserRoutes = require('./src/routes/UserRoutes');
const FriendsRoutes = require('./src/routes/FriendsRoutes');
const MarketRoutes = require('./src/routes/MarketRoutes');
const ChallengeRoutes = require('./src/routes/ChallengeRoutes');

//Load the routes
router.use('/auth', AuthRoutes);
router.use('/factions', FactionRoutes);
router.use('/items', ItemRoutes);
router.use('/leaderboard', LeaderboardRoutes);
router.use('/me', MeRoutes);
router.use('/messages', MessageRoutes);
router.use('/ships', ShipRoutes);
router.use('/users', UserRoutes);
router.use('/friends', FriendsRoutes);
router.use('/marketplace', MarketRoutes);
router.use('/challenge', ChallengeRoutes);

//Use the router
app.use('/api', router);

//Start the server
app.listen(port, () => console.log('server running on port ' + port));
