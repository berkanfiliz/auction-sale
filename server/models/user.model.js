const mongoose = require("mongoose");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    adres: {
      type: String,
      required: true,
    },
    favorites: {
      type: Array,
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
