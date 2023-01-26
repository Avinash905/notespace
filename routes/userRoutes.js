const express = require("express");
const {
  login,
  register,
  updateProfile,
} = require("../controllers/userController");
const auth = require("../middleware/auth");

const userRouter = express.Router();

userRouter.post("/login", login);
userRouter.post("/register", register);
userRouter.put("/updateprofile", auth, updateProfile);

module.exports = userRouter;
