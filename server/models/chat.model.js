const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    kullanicilar: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  },
  { timestamps: true, versionKey: false }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
