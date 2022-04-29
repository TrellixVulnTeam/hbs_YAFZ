const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  fullname: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  password: String,
  phone: String,
});

module.exports = mongoose.model("User", User);
