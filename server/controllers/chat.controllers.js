const chatServices = require("../services/chat.services");

const fetchAllMessageWithRoom = async (req, res) => {
  try {
    const messages = await chatServices.fetchAllMessageWithRoom(req.params.id);
    res.status(200).json({ success: true, messages });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

const addMessage = async (req, res) => {
  try {
    const data = req.body;
    const addedMessage = await chatServices.addMessage(data);
    res.status(200).json({ success: true, addedMessage });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = {
  fetchAllMessageWithRoom,
  addMessage,
};
