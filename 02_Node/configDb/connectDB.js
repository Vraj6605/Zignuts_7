const { default: mongoose } = require("mongoose")

const connectDB = async (url) => {
    if(await mongoose.connect(url)){
      console.log("Database Conncted");
    }
    else{
      console.log("Not Conncted");
    }
}

module.exports = connectDB;