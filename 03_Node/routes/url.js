const express = require("express");
const router = express.Router();
const { handleShortUrl, redirectUrl, allUrl } = require("../controllers/url");
const URL = require("../models/url");

router.post("/", handleShortUrl);
router.get("/:shortUrl", redirectUrl);
router.get("/test/allurl", allUrl);


module.exports = router;
