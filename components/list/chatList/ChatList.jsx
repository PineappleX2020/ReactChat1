import { useState, useEffect } from "react";
import "./chatlist.css";
import AddUser from "./addUser/addUser";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore"; // Ensure the correct import path
import { doc, onSnapshot, getDoc } from "firebase/firestore";
import { db } from "../../../lib/firebase";

const ChatList = () => {
    const [chats, setChats] = useState([]);
    const [addMode, setAddMode] = useState(false);

    const { currentUser } = useUserStore();
    const { changeChat } = useChatStore();

    useEffect(() => {
        if (!currentUser?.id) {
            console.log("Current user not found");
            return;
        }

        console.log("Fetching chats for user:", currentUser.id);

        const unSub = onSnapshot(doc(db, "userchats", currentUser.id), async (res) => {
            if (!res.exists()) {
                console.log("No chats found");
                setChats([]); // Clear chats if no document exists
                return;
            }

            const items = res.data().chats;
            console.log("Chats fetched:", items);

            const promises = items.map(async (item) => {
                const userDocRef = doc(db, "users", item.receiverId);
                const userDocSnap = await getDoc(userDocRef);
                const user = userDocSnap.data();
                return { ...item, user };
            });

            const chatData = await Promise.all(promises);
            console.log("Processed chat data:", chatData);

            setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        });

        return () => {
            unSub();
        };
    }, [currentUser.id]);

    const handleSelect = (chat) => {
        console.log("Selected chat:", chat);
        changeChat(chat.chatId, chat.user);
    };

    return (
        <div className="chatlist">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png" alt="Search Icon" />
                    <input type="text" placeholder="Search" />
                </div>
                <img 
                    src={addMode ? "./minus.png" : "./plus.png"} 
                    onClick={() => setAddMode((prev) => !prev)} 
                    alt={addMode ? "Minus" : "Plus"} 
                    className="add"
                />
            </div>
            {chats.length > 0 ? (
                chats.map(chat => (
                    <div className="item" key={chat.chatId} onClick={() => handleSelect(chat)}>
                        <img src={chat.user.avatar || "avatar.png"} alt="Avatar" />
                        <div className="texts">
                            <span>{chat.user.username}</span>
                            <p>{chat.lastMessage}</p>
                        </div>
                    </div>
                ))
            ) : (
                <div>No chats available</div>
            )}
            {addMode && <AddUser />}
        </div>
    );
};

export default ChatList;
