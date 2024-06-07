import React, { useState } from "react";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./login.css";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import {doc, setDoc} from "firebase/firestore";
import upload from '../../lib/upload';
const Login = () => {
  const [avatar, setAvatar] = useState({
    file: null,
    url: "",
  });

  const[loading, setLoading] = useState(false)

  const handleAvatar = (e) => {
    if (e.target.files[0]) {
      setAvatar({
        file: e.target.files[0],
        url: URL.createObjectURL(e.target.files[0]),
      });
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.target);
    const { username, email, password } = Object.fromEntries(formData.entries());
  
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
  
      const avatarFile = avatar.file;
      if (avatarFile) {
        const imgUrl = await upload(avatarFile);
        await setDoc(doc(db, "users", res.user.uid), {
          username: username,
          email,
          avatar: imgUrl,
          id: res.user.uid,
          blocked: [],
        });
      }
  
      await setDoc(doc(db, "userchats", res.user.uid), {
        chats: [],
      });
  
      toast.success("Account created successfully! You can login now!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData.entries());
  
    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast.success("Logged in successfully!");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }finally{
      setLoading(false);
    }
  };

  return (
    <div className="login">
      <ToastContainer />
      <div className="item">
        <h2>Welcome back,</h2>
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" disabled={loading}>{loading ? "Loading" : "Sign in"}</button>
        </form>
      </div>
      <div className="separator"></div>
      <div className="item">
        <h2>Create an Account</h2>
        <form onSubmit={handleRegister}>
          <label htmlFor="file">
            <img src={avatar.url || "./avatar.png"} alt="Avatar" />
            Upload an image
          </label>
          <input
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleAvatar}
          />
          <input type="text" placeholder="Username" name="username" />
          <input type="text" placeholder="Email" name="email" />
          <input type="password" placeholder="Password" name="password" />
          <button type="submit" disabled={loading}>{loading ? "Loading" : "Sign up"}</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
