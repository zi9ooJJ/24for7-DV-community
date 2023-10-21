import styled, { keyframes } from "styled-components";
import io from "socket.io-client";
import { useEffect, useState, useRef } from "react";

import chatBtn from "../../images/chat_btn.png";
import sendBtn from "../../images/send_btn.png";
import backBtn from "../../images/back_btn.png";
import miniBtn from "../../images/mini_btn.png";

import * as API from "../../utils/api";

const socket = io.connect(
  `${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_CHAT_PORT}`
);

function Chat() {
  const [modal, setModal] = useState(false);

  const [target, setTarget] = useState(false);
  const [targetData, setTargetData] = useState([]);
  const [roomNumber, setRoomNumber] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");
  const [lastRoomNumber, setLastRoomNumber] = useState("");
  const [chatLog, setChatLog] = useState([]);

  const scrollRef = useRef();

  const toggleModal = () => {
    console.log(localStorage.getItem("email"), localStorage.getItem("role"));
    const isLoggedIn =
      localStorage.getItem("email") && localStorage.getItem("role");
    if (!modal && !isLoggedIn) {
      alert("로그인이 필요한 기능입니다.");
      return;
    }
    setModal(!modal);
  };

  const exitChat = () => {
    setTarget(false);
    setChatLog([]);
  };

  const sendMessage = () => {
    const id = localStorage.getItem("email");
    const date = new Date();
    let log = {
      sendBy: id,
      message: message,
      createdAt: date.toLocaleString(),
    };
    setChatLog([...chatLog, log]);
    socket.emit("send_msg", { log, roomNumber });
    API.post("/chats/logs/" + roomNumber, {
      log: log,
    });
    setMessage("");
  };

  const joinRoom = () => {
    if (roomNumber === "") {
      return;
    } else {
      if (lastRoomNumber !== "") {
        socket.emit("leave_room", lastRoomNumber);
        setChatLog([]);
      }
      socket.emit("join_room", roomNumber);
      setLastRoomNumber(roomNumber);
      API.post("/chats/join/" + roomNumber, {
        roomId: roomNumber,
        supporterId: roomNumber.split("!!")[0].split(":")[1],
        userId: roomNumber.split("!!")[1].split(":")[1],
      })
        .then((res) => {
          setChatLog(res.data.logs);
        })
        .catch((error) => {
          console.log(error);
        });
      setTarget(true);
    }
  };

  const chatParser = (chatLog) => {
    const id = localStorage.getItem("email");
    if (chatLog === []) return <></>;
    let arr = [];
    for (let i = 1; i < chatLog.length; i++) {
      const { sendBy, message, createdAt } = chatLog[i];
      const time = createdAt.split(" ")[4].split(":");
      const hour = time[0];
      const minute = time[1];
      arr.push(
        <SingleMessage isMine={sendBy === id}>
          {/* <Name>{sendBy}</Name> */}
          <Content>{message}</Content>
          <Time>
            {hour}:{minute}
          </Time>
        </SingleMessage>
      );
    }
    return arr;
  };

  const searchTarget = () => {
    const id = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    let arr = [];
    if (role === "support") {
      for (let i = 0; i < targetData.length; i++) {
        arr.push(
          <div>
            <SingleList
              onClick={() => {
                if (roomNumber === "S:" + id + "!!U:" + targetData[i].userId) {
                  joinRoom();
                } else setRoomNumber("S:" + id + "!!U:" + targetData[i].userId);
              }}
            >
              {targetData[i].userId}
            </SingleList>
          </div>
        );
      }
    }
    if (role === "user") {
      for (let i = 0; i < targetData.length; i++) {
        arr.push(
          <SingleList
            onClick={() => {
              if (roomNumber === "S:" + targetData[i].email + "!!U:" + id) {
                joinRoom();
              } else setRoomNumber("S:" + targetData[i].email + "!!U:" + id);
            }}
          >
            {targetData[i].userName} 서포터
          </SingleList>
        );
      }
    }
    return arr;
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessageReceived(data);
    });
  }, [socket]);

  useEffect(() => {
    if (messageReceived !== "") {
      setChatLog([...chatLog, messageReceived]);
    }
  }, [messageReceived]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatLog]);

  useEffect(() => {
    joinRoom();
  }, [roomNumber]);

  useEffect(() => {
    const id = localStorage.getItem("email");
    const role = localStorage.getItem("role");
    if (modal && !target) {
      if (role === "support") {
        API.get("/chats/supporters/" + id)
          .then((res) => {
            setTargetData(res.data);
          })
          .catch((err) => console.log(err));
      }
      if (role === "user") {
        const token = "Bearer " + localStorage.getItem("token");
        API.get("/users/userRole/support")
          .then((res) => setTargetData(res.data))
          .catch((err) => {
            alert("로그아웃 되었습니다. 다시 로그인해주세요.");
            setModal(false);
          });
      }
    }
  }, [modal]);

  return (
    <>
      {!modal && <ChatButton toggle={modal} onClick={toggleModal} />}

      {modal && !target && (
        <ModalWrapper>
          <ModalHeader>
            실시간 상담
            <MinimizeButton onClick={toggleModal} />
          </ModalHeader>
          <ModalBody>
            <ListWrapper>{searchTarget()}</ListWrapper>
          </ModalBody>
          <ModalFooter>
            {localStorage.getItem("role") === "user"
              ? "서포터에게 고민을 상담해보세요!"
              : "유저와 채팅시, 매너를 지켜주세요"}
          </ModalFooter>
        </ModalWrapper>
      )}
      {modal && target && (
        <ModalWrapper>
          <ModalHeader>
            <BackButton onClick={exitChat} />
            {localStorage.getItem("role") === "user"
              ? roomNumber.split("!!")[0].split(":")[1]
              : roomNumber.split("!!")[1].split(":")[1]}
            <MinimizeButton onClick={toggleModal} />
          </ModalHeader>
          <ModalBody ref={scrollRef}>{chatParser(chatLog)}</ModalBody>
          <ModalFooter>
            <MessageInput
              placeholder="Message"
              value={message}
              onChange={(event) => {
                setMessage(event.target.value);
              }}
              onKeyPress={(event) => {
                if (event.key === "Enter" && message !== "") sendMessage();
              }}
            />
            <SendButton
              onClick={sendMessage}
              disabled={message === "" ? true : false}
            />
          </ModalFooter>
        </ModalWrapper>
      )}
    </>
  );
}

//styled

const slideUp = keyframes`
from {
    /* transform: translateY(210px); */
     transform: translateY(-20px); 
}`;

const fadeOut = keyframes`
from {
    opacity: 1;
}
to {
    opacity: 0.5;
}
`;

const SingleList = styled.div`
  margin: 10px;
  width: auto;
  height: 40px;
  background-color: #f1f1f1;
  border-radius: 10px;
  border: solid 1px;
  line-height: 40px;
  text-align: 5px;
  text-indent: 1em;
  cursor: pointer;

  &:hover {
    background-color: #e1e1e1;
  }
`;

// const Email = styled.button`

// `;

const ListWrapper = styled.div``;

const ChatButton = styled.div`
  background: url(${chatBtn});
  background-repeat: no-repeat;
  background-size: 40px;
  background-position: center;
  background-color: #609966;
  height: 60px;
  width: 60px;
  border-radius: 10px;
  font-size: 30px;
  line-height: 45px;
  text-align: center;
  cursor: pointer;

  animation-duration: 1s;
  animation-timing-function: ease-out;
  animation-name: ${slideUp};
  animation-fill-mode: forwards;

  &:hover {
    transform: scale(1.1);
  }

  &:active {
    animation-duration: 0.1s;
    animation-timing-function: ease-out;
    animation-name: ${fadeOut};
    animation-fill-mode: forwards;
  }
`;

// animation-duration: 1s;
// animation-timing-function: ease-out;
// animation-name: ${slideUp};
// animation-fill-mode: forwards;

const ModalWrapper = styled.div``;

const ModalHeader = styled.div`
  background-color: #609966;
  height: 40px;
  width: 300px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-align: center;
  line-height: 40px;
  font-weight: 900;
`;

const ModalBody = styled.div`
  background-color: #edf1d6;
  height: 400px;
  width: 300px;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
`;

const ModalFooter = styled.div`
  background-color: #609966;
  height: 50px;
  width: 300px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  text-align: center;
  line-height: 50px;
`;

const BackButton = styled.button`
  background: url(${backBtn});
  background-repeat: no-repeat;
  background-size: 20px 25px;
  border: none;
  float: left;
  height: 30px;
  width: 30px;
  margin-top: 7px;
  margin-left: 10px;
  cursor: pointer;
`;

const MinimizeButton = styled.button`
  background: url(${miniBtn});
  background-repeat: no-repeat;
  background-size: 20px;
  border: none;
  float: right;
  height: 30px;
  width: 30px;
  margin-top: 10px;
  margin-right: 5px;
  cursor: pointer;
`;

const MessageInput = styled.input`
  margin-top: 0;
  margin-left: 10px;
  width: 235px;
  height: 20px;
`;

const SendButton = styled.button`
  background: url(${sendBtn});
  background-repeat: no-repeat;
  background-size: 25px;
  border: none;
  float: right;
  height: 25px;
  width: 25px;
  margin-top: 15px;
  margin-right: 10px;
  cursor: pointer;
`;

const SingleMessage = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
  max-width: 300px;
  margin: 10px;
  border-radius: 10px;
  background-color: ${(props) => (props.isMine ? "#acda86" : "#afb4ab")};
  ${(props) => (props.isMine ? "margin-left:auto" : "margin-right:auto")};
`;
const Name = styled.div`
  text-align: left;
  margin: 10px 20px;
  font: bold 0.8em 돋움체;
`;
const Content = styled.div`
  margin-top: 10px;
  font: bold 1em 돋움체;
`;
const Time = styled.div`
  text-align: right;
  margin: 5px 10px;
  font: bold 0.8em 돋움체;
`;

export default Chat;
