const mongoose = require("mongoose");

const connectDB = () => {
  mongoose.connect("mongodb://127.0.0.1:27017/api-app")
  .then(() => {console.log("Database Connected")})
  .catch(() => {console.log("Error:Database Conncectio");
  })
};

module.exports = connectDB;
