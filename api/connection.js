// connection.js
const mongoose = require('mongoose');
const config = require('./db');

const connection = config.DB;

const connectDb = () => mongoose.connect(connection);

module.exports = connectDb;
