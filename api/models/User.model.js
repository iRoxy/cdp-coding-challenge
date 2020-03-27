const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
  },
  lastname: {
    type: String,
  },
  email_address: {
    type: String,
  },
  department: {
    type: String,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
