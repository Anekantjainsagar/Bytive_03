const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  profile: {
    type: String,
    default:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTpCKq1XnPYYDaUIlwlsvmLPZ-9-rdK28RToA&s",
  },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  website: { type: String, required: true },
  likes: { type: Number, default: 0 },
  address: {
    street: String,
    suite: String,
    city: String,
    zipcode: String,
  },
  company: String,
});

const User = mongoose.model("User", UserSchema);

module.exports = User;
