const {
  upload,
  uBlogForm,
  hBlogForm,
  uBlog,
  dBlog,
  eBlog,
  geBlog,
} = require("../controllers/blog");
const { Router } = require("express");
const router = Router();

router.get("/", uBlogForm);
router.post("/", upload.single("coverImageURL"), hBlogForm);
router.delete("/:id", dBlog);
router.get("/:id/", uBlog);
router.get("/:id/Edit", geBlog);
router.patch("/:id", eBlog);

module.exports = router;
