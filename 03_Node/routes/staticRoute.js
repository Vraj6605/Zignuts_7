const express = require("express");
const StaticRoute = express.Router();
const {allUrl} = require("../controllers/url")

StaticRoute.get("/", allUrl);

module.exports = StaticRoute;
