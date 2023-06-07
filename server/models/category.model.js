const mongoose = require("mongoose");

const { Schema } = mongoose;

const categorySchema = new Schema(
  {
    category: { type: String, required: true },
    image_urls: [{ type: String }],
  },
  { timestamps: true, versionKey: false }
);

const categoryModel = mongoose.model("category", categorySchema);

module.exports = categoryModel;
