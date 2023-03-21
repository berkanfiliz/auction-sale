const mongoose = require("mongoose");

const { Schema } = mongoose;

const ihaleKazancShema = new Schema(
  {
    ihale_id: {
      type: String,
      required: true,
    },
    kazanan_id: {
      type: String,
      required: true,
    },
    yedek_id: {
      type: String,
    },
    kazanan_teklif: {
      type: String,
      required: true,
    },
  },
  { collection: "ihaleKazanc", versionKey: false, timestamps: true }
);

const ihaleKazancModel = mongoose.model("ihaleKazanc", ihaleKazancShema);
