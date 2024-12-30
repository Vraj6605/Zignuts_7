const express = require("express");
const app = express();
const multer = require("multer");

app.use(express.urlencoded({ extended: false }));
app.set("view engine", "ejs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}-${file.originalname}  `);
  },
});

const upload = multer({ storage });

app.get("/", (req, res) => {
  res.render("home");
});

app.post("/upload", upload.single("myfile"), (_req, res) => {
  
  res.redirect("/");
});

app.listen(8080, () => {
  console.log("Server Start: http://localhost:8080");
});
