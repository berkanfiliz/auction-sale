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
    isActive: {
      type: Boolean,
      default: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    image_urls: [
      {
        type: String,
      },
    ],
    address: {
      type: String,
      required: true,
    },
    favorites: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "ihale",
        },
      ],
    },
  },
  { timestamps: true, versionKey: false }
);

const userModel = mongoose.model("user", userSchema);

module.exports = userModel;
