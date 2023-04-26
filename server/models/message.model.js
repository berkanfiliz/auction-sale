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

    // okundu_id: [
    //   {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //   },
    // ],
  },
  { timestamps: true, versionKey: false }
);

const messageModel = mongoose.model("Message", messageSchema);
module.exports = messageModel;
