const mongoose = require("mongoose");

const { Schema } = mongoose;

const ihaleSchema = new Schema(
  {
    katilimci_id: {
      type: Array,
    },
    // kazanan_id: {
    //   type: String,
    // },
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
    image_url: {
      type: Array,
    },
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
    teklifler: {
      type: Array,
    },
    yorumlar: {
      kullanici_id: { type: String },
      yorum: { type: String },
    },
    degerlendirme: {
      kullanici_id: { type: String },
      puan: { type: Number },
    },
  },
  { collection: "ihale", versionKey: false, timestamps: true }
);

const ihaleModel = mongoose.model("ihale", ihaleSchema);
module.exports = ihaleModel;
