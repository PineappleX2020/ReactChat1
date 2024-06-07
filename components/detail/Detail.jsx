import React from 'react';
import { auth } from '../../lib/firebase'; // Adjust the import path as necessary
import './detail.css';

const Detail = () => {
  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log('User signed out');
      })
      .catch(error => {
        console.error('Sign out error', error);
      });
  };

  return (
    <div className="detail">
      <div className="user">
        <img src="./avatar.png" alt="Avatar" />
        <h2>Jane Doe</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat Settings</span>
            <img src="./arrowUp.png" alt="Arrow" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="Arrow" />
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="Arrow" />
          </div>
          <div className="photos">
            <div className="photoItem">
              <img
                src="https://images.pexels.com/photos/19155212/pexels-photo-19155212/free-photo-of-roof-on-a-yellow-building.jpeg"
                alt="Shared"
              />
              <span>Photo_2024_2.png</span>
              <img src="download.png" alt="Download" className="icon" />
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title">
            <span>Shared Files</span>
            <img src="./arrowUp.png" alt="Arrow" />
          </div>
        </div>
      </div>
      <button>Block User</button>
      <button className="Logout" onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Detail;
