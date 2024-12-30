const express = require("express");
const app = express();
const path = require("path");
const env = require("dotenv");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const connectDB = require("./config/connectDB");
const coockiparser = require("cookie-parser");
const { authenticateCookie } = require("./middleware/authenticateCookie");
const Blog = require("./models/blog");
const methodOverride = require("method-override");
const bodyParser = require("body-parser");

env.config();

// Connection Mongo
connectDB();

// Middlewares
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(coockiparser());
app.use(authenticateCookie("token"));
app.use(express.static(path.resolve("./public")));
app.use(bodyParser.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", path.join("./views"));

app.get("/", async (req, res) => {
  const allBlog = (await Blog.find({}).populate("createdBy")).reverse();
  res.render("home", { user: req.user, allBlog });
});

app.get("/search", async (req, res) => {
  const { q } = req.query;
  const allBlog = await Blog.find({});
  const data = allBlog.filter(
    (blog) =>
      blog.title.toLowerCase().includes(q.toLowerCase()) ||
      blog.body.toLowerCase().includes(q.toLowerCase())
  );
  if (data.length > 0) {
    return res.render("home.ejs", { user: req.user, allBlog: data });
  } else {
    return res.render("home.ejs", {
      error: "Sorry! No Such Blog Found!",
    });
  }
});

// Routes
app.use("/user", userRouter);
app.use("/blog", blogRouter);

// Port Listen
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server Run: http://localhost:${PORT}`);
});
