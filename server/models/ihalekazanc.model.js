const mongoose = require("mongoose");

const { Schema } = mongoose;

const ihaleKazancShema = new Schema(
  {
    ihale_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "ihale",
    },
    kazanan_id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    // yedek_id: {
    //   type: Schema.Types.ObjectId,
    //   ref: "user",
    // },
    kazanan_teklif: {
      type: String,
      required: true,
    },
  },
  { collection: "ihaleKazanc", versionKey: false, timestamps: true }
);

const ihaleKazancModel = mongoose.model("ihaleKazanc", ihaleKazancShema);

module.exports = ihaleKazancModel;
