const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");
// importing the data from data.js file and Listing model to initialize the database with sample listings.
const mongoUrl = "mongodb://127.0.0.1:27017/Airbnb";
main()
  .then(() => {
    console.log("connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });

//DB CONNECTION
async function main() {
  await mongoose.connect(mongoUrl);
}

//first random data is deleted and then new data is inserted into the database
const initDB = async () => {
  await Listing.deleteMany({});
  initData.data = initData.data.map((obj) => ({
    ...obj,
    owner: "6a37bf0b75ddc3425a507f00",
  }));
  await Listing.insertMany(initData.data);
  console.log("data initialized");
};
initDB();
