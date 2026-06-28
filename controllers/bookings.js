const Booking = require("../models/booking");
const Listing = require("../models/listing");
const User = require("../models/user");

module.exports.BookingDetails = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  const { checkIn, checkOut, guests } = req.query;

  // Calculate nights and total price
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24),
  );
  const totalPrice = nights * listing.price;

  res.render("bookings/new", {
    listing,
    checkIn,
    checkOut,
    guests,
    nights,
    totalPrice,
  });
};

module.exports.PostBooking = async (req, res) => {
  const { id } = req.params;
  const { checkIn, checkOut, guests, totalPrice } = req.body.booking;

  const booking = new Booking({
    listing: id,
    user: req.user._id,
    checkIn: new Date(checkIn),
    checkOut: new Date(checkOut),
    guests,
    totalPrice,
  });

  await booking.save();
  req.flash("success", "Booking Confirmed!");
  res.redirect(`/listings/${id}`);
};

module.exports.myBookings = async (req, res) => {
  const today = new Date();

  // Current bookings — checkOut date is in future
  const currentBookings = await Booking.find({
    user: req.user._id,
    checkOut: { $gte: today },
  }).populate("listing");

  // Previous bookings — checkOut date is in past
  const previousBookings = await Booking.find({
    user: req.user._id,
    checkOut: { $lt: today },
  }).populate("listing");

  res.render("bookings/mybookings", { currentBookings, previousBookings });
};
