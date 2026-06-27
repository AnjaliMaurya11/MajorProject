const Listing = require("./models/listing");
const Review = require("./models/review");
const ExpressError = require("./utils/ExpressError.js");
const { listingSchema, reviewSchema } = require("./schema.js");

//middleware for schema validation
module.exports.validateListing = (req, res, next) => {
  const { error } = listingSchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  }
  next();
};

//middleware for review schema validation
module.exports.validateReview = (req, res, next) => {
  const { error } = reviewSchema.validate(req.body);
  if (error) {
    let errorMessage = error.details.map((el) => el.message).join(",");
    throw new ExpressError(400, errorMessage);
  }
  next();
};

//check if the user is logged in before allowing them to create a new listing or review.
module.exports.isLoggedIn = (req, res, next) => {
  if (!req.isAuthenticated()) {
    req.session.redirectUrl = req.originalUrl; //store the original URL to redirect after login
    req.flash("error", "Please log in first");
    return res.redirect("/listings");
  }
  next();
};

//middleware to save the redirect URL in res.locals for use in the login route
module.exports.saveRedirectUrl = (req, res, next) => {
  if (req.session.redirectUrl) {
    res.locals.redirectUrl = req.session.redirectUrl;
  }
  next();
};

//check if the currently logged-in user is the owner of the listing before allowing them to edit or delete it.
module.exports.isOwner = async (req, res, next) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing.owner.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the owner of this listing!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};

module.exports.isReviewAuthor = async (req, res, next) => {
  let { id, reviewId } = req.params;
  const review = await Review.findById(reviewId);
  if (!review.author.equals(res.locals.currentUser._id)) {
    req.flash("error", "You are not the author of this review!");
    return res.redirect(`/listings/${id}`);
  }
  next();
};
