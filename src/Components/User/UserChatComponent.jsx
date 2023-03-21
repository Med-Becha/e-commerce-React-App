import { useEffect, useState } from "react";
import socketIOClient from "socket.io-client";
import { useSelector } from "react-redux";

const UserChatComponent = () => {
  const [socket, setSocket] = useState(false);
  //   let chat = [
  //       {"client": "msg"},
  //       {"client": "msg"},
  //       {"admin": "msg"},
  //   ]
  const [chat, setChat] = useState([]);
  const [messageReceived, setMessageReceived] = useState(false);
  const [chatConnectionInfo, setChatConnectionInfo] = useState(false);
  const [reconnect, setReconnect] = useState(false);

  const userInfo = useSelector((state) => state.userRegisterLogin.userInfo);

  useEffect(() => {
    if (!userInfo.isAdmin) {
        setReconnect(false);
         var audio = new Audio("/audio/chat-msg.mp3");
      const socket = socketIOClient();
      socket.on("no admin", (msg) => {
          setChat((chat) => {
              return [...chat, { admin: "no admin here now" }];
          })
      })
      socket.on("server sends message from admin to client", (msg) => {
          setChat((chat) => {
              return [...chat, { admin: msg }];
          })
          setMessageReceived(true);
          audio.play();
          const chatMessages = document.querySelector(".cht-msg");
          chatMessages.scrollTop = chatMessages.scrollHeight;
      })
      setSocket(socket);
      socket.on("admin closed chat", () => {
         setChat([]); 
         setChatConnectionInfo("Admin closed chat. Type something and submit to reconnect");
         setReconnect(true);
      })
      return () => socket.disconnect();
    }
  }, [userInfo.isAdmin, reconnect]);

  const clientSubmitChatMsg = (e) => {
    if (e.keyCode && e.keyCode !== 13) {
      return;
    }
    setChatConnectionInfo("");
    setMessageReceived(false);
    const msg = document.getElementById("clientChatMsg");
    let v = msg.value.trim();
    if (v === "" || v === null || v === false || !v) {
      return;
    }
    socket.emit("client sends message", v);
    setChat((chat) => {
      return [...chat, { client: v }];
    });
    msg.focus();
    setTimeout(() => {
         msg.value = "";
         const chatMessages = document.querySelector(".cht-msg");
         chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 200)
  };

  return !userInfo.isAdmin ? (
    <>
      <input type="checkbox" id="check" />
      <label className="chat-btn" htmlFor="check">
        <i className="bi bi-chat-dots comment"></i>
        {messageReceived && <span className="position-absolute top-0 start-10 translate-middle p-2 bg-danger border border-light rounded-circle"></span>}
        
        <i className="bi bi-x-circle close"></i>
      </label>
      <div className="chat-wrapper">
        <div className="chat-header">
          <h6>Let's Chat - Online</h6>
        </div>
        <div className="chat-form">
          <div className="cht-msg">
              <p>{chatConnectionInfo}</p>
            {chat.map((item, id) => (
              <div key={id}>
                {item.client && (
                  <p>
                    <b>You wrote:</b> {item.client}
                  </p>
                )}
                {item.admin && (
                  <p className="bg-primary p-3 ms-4 text-light rounded-pill">
                    <b>Support wrote:</b> {item.admin}
                  </p>
                )}
              </div>
            ))}
          </div>
          <textarea
            onKeyUp={(e) => clientSubmitChatMsg(e)}
            id="clientChatMsg"
            className="form-control"
            placeholder="Your Text Message"
          ></textarea>

          <button
            onClick={(e) => clientSubmitChatMsg(e)}
            className="btn btn-success btn-block"
          >
            Submit
          </button>
        </div>
      </div>
    </>
  ) : null;
};

export default UserChatComponent;

