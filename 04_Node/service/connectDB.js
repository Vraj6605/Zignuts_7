const mongoose = require("mongoose");

const connectDB = async () => {
  mongoose.connect("mongodb://127.0.0.1:27017/api-app")
  .then(() => {console.log("Database Connected Successfully!")})
  .catch(() => console.log("ERROR : MONGO Connection")
  )
}

module.exports = connectDB;