const Blog = require("../models/blog");
const path = require("path");
const multer = require("multer");
const mongoose = require("mongoose");
const uBlogForm = (req, res) => {
  return res.render("addBlog", { user: req.user });
};

const hBlogForm = async (req, res) => {
  console.log(req.body);
  const { title, body } = req.body;
  const blog = await Blog.create({
    title,
    body,
    createdBy: req.user._id,
    coverImageURL: `/uploads/${req.file.filename}`,
  });
  return res.redirect(`/blog/${blog._id}`);
};

const uBlog = async (req, res) => {
  const { id } = req.params;
  const blogData = await Blog.findById(id);
  return res.render("blog", { user: req.user, blog: blogData });
};

const uEditBlog = (req, res) => {
  res.send("Edit Your Blog");
};

const dBlog = async (req, res) => {
  const id = req.params.id;
  await Blog.findByIdAndDelete(id);
  return res.redirect("/user/myBlogs");
};

const eBlog = async (req, res) => {
  const id = req.params.id;
  const { title, body } = req.body;
  await Blog.findByIdAndUpdate(id, { title, body });
  return res.redirect("/user/myBlogs");
};

const geBlog = async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  return res.render("EditBlog", { user: req.user, blog, file: req.file });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  },
});

const upload = multer({ storage: storage });

module.exports = {
  upload,
  uBlogForm,
  hBlogForm,
  uBlog,
  uEditBlog,
  dBlog,
  eBlog,
  geBlog,
};
