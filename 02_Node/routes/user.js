const express = require("express");
const userRouter = express.Router();
const {allUser,userwithId,userCreate,userDelete,userEdit} = require("../controllers/user");


userRouter.route("/").get(allUser).post(userCreate)
userRouter.route("/:id").get(userwithId).patch(userEdit).delete(userDelete)

// userRouter.get("/",allUser)

// userRouter.get("/:id",userwithId)

// userRouter.post("/",userCreate)

// userRouter.delete("/:id",userDelete)

// userRouter.patch("/:id",userEdit)

module.exports = userRouter;