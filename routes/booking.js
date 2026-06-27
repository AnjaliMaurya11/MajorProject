const express = require("express");

const wrapAsync = require("../utils/wrapAsync.js");
const { isLoggedIn } = require("../middleware.js");

const router = express.Router({ mergeParams: true });
const bookingController = require("../controllers/bookings.js");

router.get("/new", isLoggedIn, wrapAsync(bookingController.BookingDetails));

router.post("/", isLoggedIn, wrapAsync(bookingController.PostBooking));

router.get("/mybookings", isLoggedIn, wrapAsync(bookingController.myBookings));

module.exports = router;
