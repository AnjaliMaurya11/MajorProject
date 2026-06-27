const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
});
//No need to add username and password fields as passport-local-mongoose will handle that along with the authentication logic.

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
