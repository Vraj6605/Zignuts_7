const connectDB = require("./configDb/connectDB");
const express = require("express")
const app = express();
const userRouter = require("./routes/user")

// Mongo Connect
connectDB("mongodb://127.0.0.1:27017/api-app");

// Middlewares
app.use(express.urlencoded({extended : false}));
app.use("/user",userRouter);


// Listening Server
app.listen(8080,() => {
  console.log("Server start :- http://localhost:8080");
})

