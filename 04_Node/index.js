const express = require("express");
const app = express();
const connectDB = require("./service/connectDB");
const path = require("path");
const adminRoute = require("./routes/admin");
const userRoute = require("./routes/user");
const cookieParser = require("cookie-parser");

// Connections to Mongo
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routes
app.use("/admin", adminRoute);
app.use("/", userRoute);

// Ejs Templete
app.set("view engine", "ejs");
app.set("views", path.join("./views"));

// Listen Server
app.listen(8080, () => {
  console.log("Server Start : http://localhost:8080");
});
