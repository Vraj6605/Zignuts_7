const { setUser } = require("../service/Auth");
const Client = require("../models/user");

const signUp = async (req, res) => {
  let body = req.body;
  console.log(body);
  if (!body.name || !body.email || !body.password) {
    return res.json({ err: "Please Enter All value" });
  } else {
    const user = await Client.create({ ...body });

    res.redirect("/admin/login");
  }
};

const U_signUp = (req, res) => {
  res.render("signup");
};

const U_login = (req, res) => {
  res.render("login");
};

const login = async (req, res) => {
  let { email, password } = req.body;

  let user = await Client.findOne({ email, password });
  if (!user) return res.redirect("/admin");

  console.log(user);
  res.cookie("uid", setUser(user));
  res.redirect("/admin/home");
};

module.exports = {
  signUp,
  U_signUp,
  U_login,
  login,
};
