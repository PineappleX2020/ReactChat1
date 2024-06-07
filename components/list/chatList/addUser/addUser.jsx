import React, { useState } from "react";
import "./addUser.css";
import { db } from "../../../../lib/firebase";
import { collection, getDocs, query, where, doc, setDoc, updateDoc, serverTimestamp, arrayUnion } from "firebase/firestore";
import { useUserStore } from "../../../../lib/userStore";

const AddUser = ({ onUserSelect }) => {
    const [user, setUser] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    const { currentUser } = useUserStore();

    const handleSearch = async (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const username = formData.get("username");
        try {
            const userRef = collection(db, "users");
            const q = query(userRef, where("username", "==", searchTerm));
            const querySnapShot = await getDocs(q);

            if (!querySnapShot.empty) {
                const foundUser = querySnapShot.docs[0].data();
                setUser(foundUser);
            } else {
                setUser(null);
            }
        } catch (err) {
            console.error("Error finding user:", err);
        }
    };

    const handleAdd = async () => {
        const chatRef = collection(db, "chats");
        const userChatsRef = collection(db, "userchats");
        try {
            const newChatRef = doc(chatRef);
            await setDoc(newChatRef, {
                createdAt: serverTimestamp(),
                messages: [],
            });

            const chatData = {
                chatId: newChatRef.id,
                lastMessage: "",
                receiverId: user.id,
                updatedAt: Date.now(),
            };

            await updateDoc(doc(userChatsRef, currentUser.id), {
                chats: arrayUnion(chatData)
            });

            await updateDoc(doc(userChatsRef, user.id), {
                chats: arrayUnion({
                    ...chatData,
                    receiverId: currentUser.id,
                })
            });

            // Optionally, you can call onUserSelect or handle any other post-add actions here
        } catch (err) {
            console.error("Error adding chat:", err);
        }
    };

    return (
        <div className='addUser'>
            <form onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Username"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    name="username"
                />
                <button type="submit">Search</button>
            </form>
            {user && (
                <div className="user">
                    <div className="detail">
                        <img src={user.avatar || "./avatar.png"} alt="User Avatar" />
                        <span>{user.username}</span>
                    </div>
                    <button onClick={handleAdd}>Add User</button>
                </div>
            )}
        </div>
    );
};

export default AddUser;
