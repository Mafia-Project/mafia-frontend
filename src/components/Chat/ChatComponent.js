import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { Button, List, ListItem, TextField } from '@mui/material';
import indexStore from '../../store/Store';


// const ChatComponent = ({job, dayNight, killed}) => {
const ChatComponent = () => {
  const { nickNameStore, usersStore, voteStore, gameRoomInfoStore } = indexStore();

  const roomKey = gameRoomInfoStore.roomKey;
  const nickname = nickNameStore.nickname;      //이름
  console.log('chatcomponent 닉네임', nickname);
  const myJob = usersStore.findJobByNickname(nickname); // 본인 직업
  console.log('chatcomponent 직업', myJob);
  const dayNight = gameRoomInfoStore.dayNight;  //낮, 밤
  const killed = usersStore.findKilledByNickname(nickname);

  // mobx에서 가져온 데이터라고 가정
  //const [roomsNumber, setRoomsNumber] = useState('1'); // 방 고유번호
  //const [username, setUsername] = useState('test_user'); // 유저 이름
  //const [killed, setKilled] = useState(true); // 유저 생존 여부
  

  const [commonMessages, setCommonMessages] = useState([]); // 공용 채팅 로그 메시지
  const [mafiaMessages, setMafiaMessages] = useState([]); // 마피아 채팅 로그 메시지
  const [jobMessages, setJobMessages] = useState([]); // 본인 직업 전용 시스템 메시지
  const [inputValue, setInputValue] = useState(''); // 채팅 입력 메시지

  const stompClientRef = useRef(null);
  console.log(2, myJob, dayNight);

  useEffect(() => {
    connectToWebSocket();

    return () => {
      disconnectFromWebSocket();
    };
  }, [nickname, myJob, dayNight, killed]);

  // WebSocket 연결
  const connectToWebSocket = () => {
    const socket = new WebSocket('ws://localhost:8080/connect');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: () => {}, // 디버그 메시지 출력 방지
    });

    stompClientRef.current = stompClient;

    stompClient.onConnect = () => {
      console.log('연결');
      stompClient.subscribe(`/sub/chat/rooms/${roomKey}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log(newMessage);
        saveMessage(newMessage);
      });

      stompClient.subscribe(`/sub/rooms/${roomKey}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log('시스템메시지받기', newMessage);
        if(newMessage.type === 'NIGHT_END' || newMessage.type === 'END' || newMessage.type === 'NIGHT_EVENT') {
          saveMessage(newMessage);
        }
        
      });
    };

    stompClient.activate();
  };

  // WebSocket 해제
  const disconnectFromWebSocket = () => {
    if (stompClientRef.current) {
      stompClientRef.current.deactivate();
    }
  };

  // 메시지 저장
  const saveMessage = (message) => {
    //const newMessage = { ...message, username: username };
    
    // 시스템 메시지
    if(message.type === 'NIGHT_END') {
      setCommonMessages((prevMessages) => [...prevMessages, message]);
      console.log('시스템메시지', message);
    } else if(message.type === 'END') {
      setCommonMessages((prevMessages) => [...prevMessages, message]);
      console.log('시스템메시지', message);
    } else if(message.type === 'NIGHT_EVENT') {
      if(myJob === message.receiverJob) {
        setJobMessages((prevMessages) => [...prevMessages, message]);
        console.log('시스템메시지', message);
      }
    }

    // 채팅 메시지
    if (dayNight === 'night' && myJob === 'MAFIA') {
      setMafiaMessages((prevMessages) => [...prevMessages, message]);
      console.log(111, message);
      console.log(3, myJob, dayNight);
    }
    else if(dayNight === 'afternoon') {
      setCommonMessages((prevMessages) => [...prevMessages, message]);
      console.log(4, myJob, dayNight);
    }

  }

  // 채팅 입력창
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // 채팅 전송 버튼 클릭 시
  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const message = {
        roomsNumber: gameRoomInfoStore.roomKey,
        dayNight: dayNight,
        job: myJob,
        username: nickNameStore.nickname,
        content: inputValue,
      };

      stompClientRef.current.publish({
        destination: `/pub/chat/rooms/${gameRoomInfoStore.roomKey}`,
        body: JSON.stringify(message),
      });
      setInputValue('');
    }
  };

  return (
    <div className="chat-window">
        <List className="chat-log">
          {(dayNight === 'night' && myJob === 'MAFIA'
            ? mafiaMessages
            : commonMessages
          ).map((message, index) => (
            <ListItem key={index}>
              <span className="username">{message.username}: </span>
              <span className="content">{message.content} </span>
            </ListItem>
          ))}

        { jobMessages.map((v, index) => (
          <ListItem key={index}>
            <span className="username">[시스템]: </span>
            <span className="content">{v.message} </span>
          </ListItem>
          ))}

        </List>
      
      
      {/* 죽지 않았을 때만 렌더링 */}
      {!killed && (
        <div className="chat-input">
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              label="메시지를 입력하세요."
              variant="outlined"
              fullWidth
              disabled={dayNight === 'night' && myJob !== 'MAFIA'}
              style={{ height: '40px' }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={dayNight === 'night' && myJob !== 'MAFIA'}
              variant="contained"
              color="primary"
              style={{ marginLeft: '10px', height: '40px' }}
            >
              전송
            </Button>
          </div>
        </div>
      )}

      <div>
        <p>dayNight 값: {dayNight}</p>
        <p>job 값: {myJob}</p>
      </div>
    </div>
  );
};

export default ChatComponent;