const messageModel = require("../models/message.model");

const fetchAllMessageWithRoom = (_id) => {
  const mesajlar = messageModel.find({ chat_id: _id }).populate("gonderici").populate("chat_id");
  return mesajlar;
};

const addMessage = (data) => {
  const message = messageModel.create({ chat_id: data.chat_id, gonderici: data.gonderici, icerik: data.icerik });
  return message;
};

module.exports = {
  fetchAllMessageWithRoom,
  addMessage,
};
