import React, { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Detail from "./components/detail/Detail";
import List from "./components/list/List";
import Login from "./components/login/login"; // Ensure the correct path and case
import Notification from "./components/notification/notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

const App = () => {
  const { currentUser, isLoading, fetchUserInfo, setUserLoading } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, async (user) => {

  fetchUserInfo(user?.uid);

      if (user) {
        try {
          setUserLoading(true);
          await fetchUserInfo(user.uid);
        } catch (error) {
          console.error("Failed to fetch user info:", error);
        } finally {
          setUserLoading(false);
        }
      } else {
        setUserLoading(false);
      }
    });

    return () => {
      unSub();
    };
  }, [auth, fetchUserInfo, setUserLoading]);

  console.log(currentUser);

  if (isLoading) return <div className="loading">Loading...</div>;

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId &&<Chat />}
          {chatId &&<Detail />}
        </>
      ) : (
        <Login />
      )}
      <Notification />
    </div>
  );
};

export default App;
