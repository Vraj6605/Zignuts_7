const express = require("express");
const router = express.Router();
const { signUp, U_signUp, U_login, login } = require("../controllers/admin");
const restrictLoggedInUserOnly = require("../middleware/Auth");


router.get("/", U_signUp);

router.post("/signup", signUp);

router.get("/login", U_login);
router.post("/login", login);

router.post("/logout", (req, res) => {
  res.clearCookie("uid");
  res.redirect("/admin/login");
});

router.get("/home", restrictLoggedInUserOnly, (req, res) => {
  res.render("home");
});

router.get("*", (req, res) => {
  res.send("No Web page");
});


module.exports = router;
