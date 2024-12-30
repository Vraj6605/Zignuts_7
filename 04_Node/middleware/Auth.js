const { getUser } = require("../service/Auth");

const restrictLoggedInUserOnly = async (req, res, next) => {
  let token = req.cookies.uid;
  if (!token) return res.redirect("/admin/login");
  let user = getUser(token);
  if (!user) return res.redirect("/admin/login");
  req.user = user;
  next();
};

module.exports = restrictLoggedInUserOnly;
