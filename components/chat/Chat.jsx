import React, { useState, useEffect, useRef } from "react";
import "./chat.css";
import EmojiPicker from "emoji-picker-react";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../lib/firebase";
import { useChatStore } from "../../lib/chatStore";

const Chat = () => {
  const [chat, setChat] = useState();
  const [open, setOpen] = useState(false);
  const [text, setText] = useState("");

  const {chatId} = useChatStore();
  const [messages, setMessages] = useState([
    { id: 1, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", own: true, timestamp: "1 min ago" },
    { id: 2, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", own: false, timestamp: "1 min ago" },
    { id: 3, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", own: true, timestamp: "1 min ago", image: "https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg" },
    { id: 4, text: "Lorem ipsum dolor sit amet consectetur adipisicing elit.", own: false, timestamp: "1 min ago" }
  ]);

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", chatId), (res) => {
      setChat(res.data());
    });
    return () => {
      unSub();
    };
  }, [chatId]);

  // Log the chat object in a readable format
  useEffect(() => {
    if (chat) {
      console.log(JSON.stringify(chat, null, 2));
    }
  }, [chat]);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = () => {
    if (text.trim()) {
      setMessages([...messages, { id: Date.now(), text, own: true, timestamp: "Just now" }]);
      setText("");
    }
  };

  return (
    <div className="chat">
      <div className="top">
        <div className="user">
          <img src="avatar.png" alt="Avatar" />
          <div className="texts">
            <span>Jane Doe</span>
            <p>Okbro</p>
          </div>
        </div>
        <div className="icons">
          <img src="phone.png" alt="Phone" />
          <img src="video.png" alt="Video" />
          <img src="info.png" alt="Info" />
        </div>
      </div>

      <div className="center">
        {chat?.messages.map((message) => (
          <div className={`message ${msg.own ? "own" : ""}`} key={msg.id}>
            {!msg.own && <img src="avatar.png" alt="Avatar" />}
            <div className="texts">
              {msg.image && <img src={msg.image} alt="Attachment" />}
              <p>{msg.text}</p>
            </div>
            <span>{msg.timestamp}</span>
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      <div className="bottom">
        <div className="icons">
          <img src="img.png" alt="Image" />
          <img src="camera.png" alt="Camera" />
          <img src="mic.png" alt="Microphone" />
        </div>
        <input
          type="text"
          placeholder="Type a message..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="emoji">
          <img src="emoji.png" alt="Emoji" onClick={() => setOpen((prev) => !prev)} />
          <div className="picker">
            {open && <EmojiPicker onEmojiClick={handleEmoji} />}
          </div>
        </div>
        <button className="sendButton" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
