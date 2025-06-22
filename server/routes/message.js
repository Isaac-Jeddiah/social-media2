
const express = require("express");
const router = express.Router();
const {
  sendMessage,
  getMessages,
  getFriendsForMessaging,
} = require("../controllers/message");
const {authUser} = require("../middlewares/auth");

router.get("/friends", authUser, getFriendsForMessaging); // List of friends for chat
router.get("messages/getmessage/:id", authUser, getMessages); // Get message history with user
router.post("messages/sendmessage/:id", authUser, sendMessage); // Send message to user

module.exports = router;
