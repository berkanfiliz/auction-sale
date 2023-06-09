const mongoose = require("mongoose");

const messageSchema = mongoose.Schema(
  {
    chat_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Chat",
    },
    gonderici: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    icerik: {
      type: String,
    },
  },
  { timestamps: true, versionKey: false }
);

const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel;
