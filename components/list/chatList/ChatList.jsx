import { useState } from "react"
import "./chatlist.css"
import AddUser from "./addUser/addUser" 

const ChatList = () => {
    const [addMode, setAddMode] = useState(false)
    return(
        <div className="chalist">
            <div className="search">
                <div className="searchBar">
                    <img src="./search.png"></img>
                    <input type="text" placeholder="Search"></input>
                </div>
                <img 
                    src={addMode ? "./minus.png" : "./plus.png" } 
                    onClick={() => setAddMode(prev => !prev)} 
                    alt={addMode ? "Minus" : "Plus"} // Adding alt attribute is a good practice for accessibility
                />

            </div>
            <div className="item">
                <img src = "avatar.png" />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src = "avatar.png" />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src = "avatar.png" />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src = "avatar.png" />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src = "avatar.png" />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>

            </div>
            <div className="item">
                <img src = "avatar.png" />
                <div className="texts">
                    <span>Jane Doe</span>
                    <p>Hello</p>
                </div>

            </div>
            {addMode && <AddUser/>}
        </div>
    )
}

export default ChatList