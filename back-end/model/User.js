const mongoose = require("mongoose");

const userScheman = new mongoose.Schema({
  name: {
    type: String,
  },

  email: {
    type: String,
    required: true,
    unique: true,
  },

  password: {
    type: String,
    required: true,
  },
});

const userModel = mongoose.model("user", userScheman);

module.exports = userModel;