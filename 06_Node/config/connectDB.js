const mongoose = require("mongoose");
const env = require("dotenv");
env.config();

const connectDB = async () =>  {
  await mongoose.connect(`${process.env.MONGO_URL}`)
  .then(() => console.log("Database Conncted Successfully"))
  .catch(() => console.log("ERROR : DATABASE CONNECTION"))
}

module.exports = connectDB;