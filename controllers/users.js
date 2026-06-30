const User = require("../models/user.js");

module.exports.postSignup = async (req, res) => {
  try {
    let { username, email, password } = req.body;
    const user = new User({ username, email });
    const registeredUser = await User.register(user, password);
    req.login(registeredUser, (err) => {
      //to log in the user immediately after registration
      if (err) {
        return next(err);
      }
      req.flash("success", "Welcome to Airbnb!");
      res.redirect("/listings");
    });
  } catch (e) {
    req.flash("error", e.message);
    res.redirect("back");
  }
};

module.exports.postLogin = async (req, res) => {
  req.flash("success", "Welcome back!");
  const redirectUrl =
    req.body.redirectUrl || res.locals.redirectUrl || "/listings";
  res.redirect(redirectUrl);
};

module.exports.logout = (req, res) => {
  req.logout((err) => {
    if (err) {
      next(err);
    } else {
      req.flash("success", "You have successfully logged out.");
    }
    res.redirect("/listings");
  });
};
