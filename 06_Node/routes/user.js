const { Router } = require("express");
const router = Router();
const {
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
} = require("../controllers/user");

const { upload } = require("../controllers/blog");

router.get("/signin", uSignin);
router.get("/signup", uSignup);
router.post("/signup", hSignup);
router.post("/signin", hSignin);
router.get("/logout", hLogout);
router.get("/myBlogs", uMyBlogs);
router.get("/profile", profile);

// Admin Routes
router.get("/admin", admin);
router.get("/admin/allBlog", admin_allBlog);
router.get("/admin/allUser", admin_allUser);
router.delete("/admin/remove/:id", admin_removeUser);
router.get("/admin/blog/:id", admin_readBlog);
router.get("/admin/manageBlog", admin_manageBlog);
router.delete("/admin/blog/:id", admin_deleteBlog);
router.get("/admin/addBlog", admin_addBlog);
router.post("/admin/addBlog", upload.single("coverImageURL"), admin_hAddBlog);

module.exports = router;
