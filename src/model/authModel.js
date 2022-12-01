const mongoose = require("mongoose");

const authModel = new mongoose.Schema({
  username: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "username is required field"],
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    required: [true, "email is required field"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "password is required field"],
  },
});

module.exports = mongoose.model("auth", authModel);
