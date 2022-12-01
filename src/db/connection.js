const mongoose = require("mongoose");

function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`DATABASE CONNECTED`);
  } catch (error) {
    console.log(error, "could not connect to database");
  }
}

module.exports = connectDb;
