
const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getFriendsForMessaging,
} = require("../controllers/message");
const auth = require("../middlewares/auth");

router.get("/friends", auth, getFriendsForMessaging); // List of friends for chat
router.get("messages/getmessage/:id", auth, getMessages); // Get message history with user
router.post("messages/sendmessage/:id", auth, sendMessage); // Send message to user

module.exports = router;
