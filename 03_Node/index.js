const express = require("express");
const router = require("./routes/url");
const connectDB = require(".//config/connectDB");
const StaticRoute = require("./routes/staticRoute");

const app = express();

// Database Connection
connectDB();

// middlewares
app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

// Routes
app.use("/url", router);
app.use("/", StaticRoute);

app.listen(8000, () => {
  console.log("Server Start : http://localhost:8000");
});
