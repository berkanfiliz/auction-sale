const mongoose = require("mongoose");

const chatSchema = mongoose.Schema(
  {
    admin_id: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    kullanicilar: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
    // isGroupChat: { type: Boolean, default: false },
    // latestMessage: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   ref: "Message",
    // },
  },
  { timestamps: true, versionKey: false }
);

const chatModel = mongoose.model("Chat", chatSchema);

module.exports = chatModel;
