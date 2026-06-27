const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

const listingsController = require("../controllers/listings.js");

router
  .route("/")
  .get(wrapAsync(listingsController.index)) //INDEX ROUTE
  .post(
    //CREATE ROUTE
    isLoggedIn,
    // validateListing,
    upload.single("listing[image]"),
    wrapAsync(listingsController.createNewListing),
  );

//NEW LISTING
router.get("/new", isLoggedIn, listingsController.renderNewForm);

router
  .route("/:id")
  .get(isLoggedIn, wrapAsync(listingsController.showNewListing)) //SHOW ROUTE
  .put(
    //UPDATE ROUTE
    isLoggedIn,
    isOwner,
    upload.single("listing[image]"),
    validateListing,
    wrapAsync(listingsController.updateListing),
  )
  .delete(
    //DELETE ROUTE
    isLoggedIn,
    isOwner,
    wrapAsync(listingsController.deleteListing),
  );

//EDIT ROUTE
router.get(
  "/:id/edit",
  isLoggedIn,
  isOwner,
  wrapAsync(listingsController.renderEditForm),
);

module.exports = router;
