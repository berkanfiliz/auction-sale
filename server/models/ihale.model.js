const mongoose = require("mongoose");

const { Schema } = mongoose;

const ihaleSchema = new Schema(
  {
    katilimci_id: {
      type: Schema.Types.ObjectId,
      ref: "user",
    },
    olusturan_id: {
      type: Schema.Types.ObjectId,
      ref: "ihale",
    },
    durum: {
      type: Boolean,
      default: true,
    },
    bitis_tarih: {
      type: Date,
      required: true,
    },
    baslik: {
      type: String,
      required: true,
    },
    aciklama: {
      type: String,
      required: true,
    },
    image_urls: [
      {
        type: String,
      },
    ],
    baslangic_fiyat: {
      type: Number,
      required: true,
    },
    artis_miktari: {
      type: Number,
      required: true,
    },
    minimum_satis_yuzde: {
      type: Number,
      required: true,
    },
    kategori: {
      type: String,
      required: true,
    },
    // teklifler: {
    //   type: Array,
    // },
    teklifler: [
      {
        _id: false,
        id: { type: Schema.Types.ObjectId },
        teklif: { type: Number },
      },
    ],
    yorumlar: {
      kullanici_id: { type: Schema.Types.ObjectId, ref: "user" },
      yorum: { type: String },
    },
    degerlendirme: {
      kullanici_id: { type: Schema.Types.ObjectId, ref: "user" },
      puan: { type: Number },
    },
  },
  { collection: "ihale", versionKey: false, timestamps: true }
);

const ihaleModel = mongoose.model("ihale", ihaleSchema);
module.exports = ihaleModel;
