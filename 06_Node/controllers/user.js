const User = require("../models/user");
const Blog = require("../models/blog");
const env = require("dotenv");
const { json } = require("express");
env.config();

const uSignin = (req, res) => {
  return res.render("signin");
};

const hSignin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const token = await User.matchPasswordAndGenerateToken(email, password);
    if (
      email == process.env.ADMIN_EMAIL &&
      password == process.env.ADMIN_PASSWORD &&
      token
    ) {
      return res.cookie("token", token).redirect("/user/admin");
    } else {
      return res.cookie("token", token).redirect("/");
    }
  } catch (error) {
    return res.render("signin", { error: "Incorrect Username or Password !" });
  }
};

const uSignup = (req, res) => {
  return res.render("signup");
};

const hSignup = async (req, res) => {
  const { fullname, email, password } = req.body;
  await User.create({
    fullname,
    email,
    password,
  });

  return res.redirect("/");
};

const hLogout = (req, res) => {
  res.clearCookie("token").redirect("/");
};

const uMyBlogs = async (req, res) => {
  const currentUserId = req.user._id;
  // console.log(currentUserId);

  try {
    const allBlog = await Blog.find({}).populate();
    const userBlogs = allBlog.filter(
      (blog) => blog.createdBy["_id"] == currentUserId
    );
    return res.render("myBlogs", { user: req.user, allBlog: userBlogs });
  } catch (error) {
    throw new Error("Incorrect Credentials");
  }
};

const profile = (req, res) => {
  return res.render("profile", { user: req.user });
};

// ------------------Admin Controllers -------------
const admin = (req, res) => {
  res.render("Admin");
};
const admin_allBlog = async (req, res) => {
  const allBlog = await Blog.find({});
  return res.render("Admin", { allBlog, flag: true });
};

const admin_allUser = async (req, res) => {
  const allUser = await User.find({});
  return res.render("Admin", { allUser });
};
const admin_removeUser = async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  return res.redirect("/user/admin/allUser");
};
const admin_readBlog = async (req, res) => {
  const { id } = req.params;
  const blog = await Blog.findById(id);
  return res.render("Admin", { blog });
};
const admin_manageBlog = async (req, res) => {
  const ManageBlog = await Blog.find({});
  return res.render("Admin", { ManageBlog, flag: false });
};
const admin_deleteBlog = async (req, res) => {
  const { id } = req.params;
  await Blog.findByIdAndDelete(id);
  return res.redirect("/user/admin/manageBlog");
};

const admin_addBlog = async (req, res) => {
  return res.render("Admin", { AddBlog: "Hello" });
};
const admin_hAddBlog = async (req, res) => {
  console.log(req.body);
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/user/admin/blog/${blog._id}`);
};

module.exports = {
  uSignin,
  hSignin,
  uSignup,
  hSignup,
  hLogout,
  uMyBlogs,
  profile,
  admin,
  admin_allBlog,
  admin_allUser,
  admin_removeUser,
  admin_readBlog,
  admin_manageBlog,
  admin_deleteBlog,
  admin_addBlog,
  admin_hAddBlog,
};
