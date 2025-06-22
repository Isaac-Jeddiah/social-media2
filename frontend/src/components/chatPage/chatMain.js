import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { getFriendsPageInfos } from "../../functions/user";
const ChatApp = () => {
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const [activeFriend, setActiveFriend] = useState(null);
  const [newMessage, setNewMessage] = useState("");
  const dispatch = useDispatch();
    const { user } = useSelector((state) => state); // Assuming user is stored in Redux state
  const token = user.token; // Replace with real token (from localStorage/cookie)
const getData = async () => {
    dispatch({ type: "FRIENDS_REQUEST" });
    const data = await getFriendsPageInfos(user.token);
    
    console.log(data);
    setFriends(data);
    if (data.status === "ok") {
      dispatch({ type: "FRIENDS_SUCCESS", payload: data.data });
    } else {
      dispatch({ type: "FRIENDS_ERROR", payload: data.data });
    }
  };
  const api = axios.create({
    baseURL: "https://social-media2-0t94.onrender.com", // Change if your backend is hosted elsewhere
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  useEffect(() => {
    getData();
    const fetchFriends = async () => {
      const res = await api.get("/friends");
      setFriends(res.data);
    };

    fetchFriends();
  }, []);

  const fetchMessages = async (friendId) => {
    setActiveFriend(friendId);
    const res = await api.get(`/messages/getmessage/${friendId}`);
    setMessages(res.data);
  };

  const sendMessage = async () => {
    if (!newMessage.trim()) return;
    const res = await api.post(`messages/sendmessage/${activeFriend}`, {
      text: newMessage,
    });
    setMessages((prev) => [...prev, res.data.message]);
    setNewMessage("");
  };

  return (
    <div style={{ display: "flex", height: "100vh", fontFamily: "Arial" }}>
      {/* Sidebar */}
      <div style={{ width: "200px", borderRight: "1px solid #ccc", padding: "10px" }}>
        <h3>Friends</h3>
        {friends.map((friend) => (
          <div
            key={friend._id}
            onClick={() => fetchMessages(friend._id)}
            style={{
              cursor: "pointer",
              marginBottom: "10px",
              fontWeight: friend._id === activeFriend ? "bold" : "normal",
            }}
          >
            {friend.first_name} {friend.last_name}
          </div>
        ))}
      </div>

      {/* Chat Window */}
      <div style={{ flex: 1, padding: "10px", display: "flex", flexDirection: "column" }}>
        <div style={{ flex: 1, overflowY: "auto", borderBottom: "1px solid #ccc" }}>
          {messages.map((msg, idx) => (
            <div key={idx} style={{ margin: "5px 0" }}>
              <b>{msg.senderId === activeFriend ? "Them" : "You"}:</b> {msg.text}
            </div>
          ))}
        </div>
        <div style={{ display: "flex", marginTop: "10px" }}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type message..."
            style={{ flex: 1, padding: "8px" }}
          />
          <button onClick={sendMessage} style={{ padding: "8px 16px" }}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
