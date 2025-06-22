//import User from "../models/User.js";
const User = require("../models/User");
//import Message from "../models/message.js";
const Message = require("../models/message");
//import cloudinary from "../lib/cloudinary.js";
const cloudinary = require("../lib/cloudinary");
//import { getReceiverSocketId,io } from "../lib/socket.js";
const { getReceiverSocketId, io } = require("../lib/socket");

exports.getFriendsForMessaging = async (req, res) => {
  try {
      const user = await User.findById(req.user.id)
        .select("friends requests")
        .populate("friends", "first_name last_name picture username")
        .populate("requests", "first_name last_name picture username");
      res.json({
        friends: user.friends,
      });
    } catch (error) {
      console.error("Error in getFriendsPageInfos: ", error);
      res.status(500).json({ message: error.message });
    }
};


exports.getMessages = async (req, res) => {
  try {
    const userToChatId = req.params.id;
    const myId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    }).sort({ createdAt: 1 }); // Optional: sort by time ascending

    res.status(200).json(messages);
  } catch (error) {
    console.error("Error in getMessages controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};


// exports.sendMessage = async (req, res) => {
//   try {
//     const { text, image } = req.body;
//     const { id: receiverId } = req.params;
//     const senderId = req.user._id;

//     if (!text && !image) {
//       return res.status(400).json({ error: "Message content is empty" });
//     }
// const sender = await User.findById(senderId).select("friends");

// if (!sender) {
//   return res.status(404).json({ error: "Sender not found" });
// }

//     const isFriend = sender.friends.some(friendId => friendId.equals(receiverId));

//     // Optional: You could log or track non-friend chats
//     const isPublicChat = !isFriend;

//     let imageUrl;
//     if (image) {
//       const uploadResponse = await cloudinary.uploader.upload(image);
//       imageUrl = uploadResponse.secure_url;
//     }

//     const newMessage = new Message({
//       senderId,
//       receiverId,
//       text,
//       image: imageUrl,
//     });

//     await newMessage.save();

//     const receiverSocketId = getReceiverSocketId(receiverId);
//     if (receiverSocketId) {
//       io.to(receiverSocketId).emit("newMessage", newMessage);
//     }

//     res.status(201).json({ message: newMessage, isPublic: isPublicChat });
//   } catch (error) {
//     console.log("Error in sendMessage controller: ", error.message);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };

exports.sendMessage = async (req, res) => {
  try {
    const { text, image } = req.body;
    const receiverId = req.params.id;
    const senderId = req.user?._id || req.user?.id; // Fallback if one is missing

    if (!senderId) {
      return res.status(401).json({ error: "Unauthorized: sender ID missing" });
    }

    if (!text && !image) {
      return res.status(400).json({ error: "Message content is empty" });
    }

    let imageUrl;
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }

    res.status(201).json({ message: newMessage });
  } catch (error) {
    console.error("Error in sendMessage controller: ", error.message);
    res.status(500).json({ error: "Internal server error" });
  }
};
