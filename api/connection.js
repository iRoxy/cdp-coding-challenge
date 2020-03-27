// connection.js
const mongoose = require("mongoose");
const User = require("./models/User.model");
const config = require('./db');

const connection = config.DB;

const connectDb = () => {
  return mongoose.connect(connection);
};

module.exports = connectDb;
