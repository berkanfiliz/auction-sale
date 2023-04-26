const router = require("express").Router();
const { fetchAllMessageWithRoom, addMessage } = require("../controllers/chat.controllers");

router.get("/:id", fetchAllMessageWithRoom);

router.post("/", addMessage);

module.exports = router;
