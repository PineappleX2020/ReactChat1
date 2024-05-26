import "./userInfo.css"

const Userinfo = () => {
    return(
        <div className="userInfo">
            <div className="user">
                <img src="avatar.png"></img>
                <h2>John Doe</h2>
            </div>
            <div className="icons">
                <img src="./more.png"></img>
                <img src="./video.png"></img>
                <img src="./edit.png"></img>

            </div>
            
        </div>
    )
}

export default Userinfo