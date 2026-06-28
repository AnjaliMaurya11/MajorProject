const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const {
  isLoggedIn,
  isOwner,
  validateListing,
  upload,
} = require("../middleware.js");

const listingsController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingsController.index))
  .post(
    isLoggedIn,
    upload.single("listing[image]"),
    wrapAsync(listingsController.createNewListing),
  );

router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
  .route("/:id")
  .get(isLoggedIn, wrapAsync(listingsController.showNewListing))
  .put(
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingsController.updateListing),
  )
  .delete(isLoggedIn, isOwner, wrapAsync(listingsController.deleteListing));

router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm),
);

module.exports = router;
