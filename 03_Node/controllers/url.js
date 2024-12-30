const URL = require("../models/url");
const shortid = require("shortid");

const handleShortUrl = async (req, res) => {
  const shortID = shortid();
  await URL.create({
    shortUrl: shortID,
    originalUrl: req.body.url,
    visitHistory: [],
  });

  res.redirect("/");
};

const redirectUrl = async (req, res) => {
  const shortUrl = req.params.shortUrl;
  const entry = await URL.findOneAndUpdate(
    { shortUrl },
    { $push: { visitHistory: { time: Date.now() } } }
  );
  res.redirect(entry.originalUrl);
};

const allUrl = async (req, res) => {
  let allUrl = await URL.find({});
  res.render("allUrl.ejs", { data: allUrl });
};
module.exports = {
  handleShortUrl,
  redirectUrl,
  allUrl,
};
