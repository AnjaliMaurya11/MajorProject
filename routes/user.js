const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/users.js");

router.post("/signup", wrapAsync(userController.postSignup)); // POST SIGNUP ROUTE

router.post(
  "/login",
  saveRedirectUrl,
  passport.authenticate("local", {
    failureFlash: true,
    failureRedirect: "back",
  }),
  userController.postLogin,
);

//LOGOUT ROUTE
router.get("/logout", userController.logout);

module.exports = router;
