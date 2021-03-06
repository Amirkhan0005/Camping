const express = require("express");
const router = express.Router();
const user = require("../controllers/user");
const catchAsync = require("../utils/catchAsync");
const passport = require("passport");

router.route("/register").get(user.renderRegister).post(catchAsync(user.registerUser));
router
  .route("/login")
  .get(user.renderLogin)
  .post(passport.authenticate("local", { failureFlash: true, failureRedirect: "/login" }), user.login);

router.get("/logout", user.logout);

module.exports = router;
