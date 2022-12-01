const mongoose = require("mongoose");

function connectDb() {
  mongoose.connect(process.env.MONGO_URI);
  console.log(`DATABASE CONNECTED`);
}

module.exports = connectDb;
