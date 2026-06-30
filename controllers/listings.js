const Listing = require("../models/listing");

//INDEX PG
module.exports.index = async (req, res) => {
  const { search } = req.query;

  if (search) {
    const allListings = await Listing.find({
      $or: [
        { title: { $regex: search, $options: "i" } }, // i = case insensitive
        { location: { $regex: search, $options: "i" } },
        { country: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ],
    });
    res.render("listings/index", { allListings, search });
  } else {
    const allListings = await Listing.find({});
    res.render("listings/index", { allListings, search: "" });
  }
};

//ADD NEW LISITNG PG
module.exports.renderNewForm = (req, res) => {
  res.render("listings/new");
};

//SHOW
module.exports.showNewListing = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id)
    .populate({ path: "reviews", populate: { path: "author" } })
    .populate("owner");
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/show", { listing });
};

//CREATE
module.exports.createNewListing = async (req, res) => {
  let url = req.file.path;
  let filename = req.file.filename;
  const newlisting = new Listing(req.body.listing);
  newlisting.owner = req.user._id; //assigning the owner of the listing to the currently logged-in user
  newlisting.image = { filename, url };
  await newlisting.save();
  req.flash("success", "Successfully created a new listing!");
  res.redirect("/listings");
};

//EDIT
module.exports.renderEditForm = async (req, res) => {
  let { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    req.flash("error", "Listing not found!");
    return res.redirect("/listings");
  }
  res.render("listings/edit.ejs", { listing });
};

//UPDATE
module.exports.updateListing = async (req, res) => {
  let { id } = req.params;
  let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
  if (typeof req.file !== "undefined") {
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = { filename, url };
    await listing.save();
  }
  req.flash("success", "Successfully updated the listing!");
  res.redirect(`/listings/${id}`);
};

//DELETE
module.exports.deleteListing = async (req, res) => {
  let { id } = req.params;
  let deletedListing = await Listing.findByIdAndDelete(id);
  req.flash("success", "Successfully deleted the listing!");
  res.redirect("/listings");
};
