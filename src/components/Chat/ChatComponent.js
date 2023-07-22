import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { Button, List, ListItem, TextField } from '@mui/material';
import indexStore from '../../store/Store';


const ChatComponent = (props) => {
  const {id} = props;

  // mobx에서 가져온 데이터라고 가정
  //const [roomsNumber, setRoomsNumber] = useState('1'); // 방 고유번호
  //const [username, setUsername] = useState('test_user'); // 유저 이름
  //const [killed, setKilled] = useState(true); // 유저 생존 여부

  const { nickNameStore, usersStore, gameRoomInfoStore, myJobStore } = indexStore();

  const nickname = nickNameStore.nickname;      //닉네임
  const job = myJobStore.job; // 본인 직업
  const dayNight = gameRoomInfoStore.dayNight;  //낮, 밤
  //const killed = usersStore.findKilledByNickname(nickname);   // 죽음 유무
  const killed = false;

  const [commonMessages, setCommonMessages] = useState([]); // 공용 채팅 로그 메시지
  const [mafiaMessages, setMafiaMessages] = useState([]); // 마피아 채팅 로그 메시지
  const [jobMessages, setJobMessages] = useState([]); // 직업 전용 로그 메시지
  const [inputValue, setInputValue] = useState(''); // 채팅 입력 메시지

  const stompClientRef = useRef(null);
  //console.log(2, job, dayNight);

  useEffect(() => {
    connectToWebSocket();

    return () => {
      disconnectFromWebSocket();
    };
  }, [nickNameStore, usersStore, gameRoomInfoStore, myJobStore, nickname, job, dayNight, killed]);

  // WebSocket 연결
  const connectToWebSocket = () => {
    const socket = new WebSocket('ws://localhost:8080/connect');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: () => {}, // 디버그 메시지 출력 방지
    });

    stompClientRef.current = stompClient;

    stompClient.onConnect = () => {
      console.log('채팅 연결');
      stompClient.subscribe(`/sub/chat/rooms/${id}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log('채팅 메시지다', newMessage);
        saveMessage(newMessage);
      });

      console.log('연결');
      stompClient.subscribe(`/sub/rooms/${id}`, (message) => {
        const newMessage = JSON.parse(message.body);
        console.log(newMessage);
        saveMessage(newMessage);
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
    if(message.type === 'NIGHT_END' || message.type === 'END') {
      setCommonMessages((prevMessages) => [...prevMessages, message]);
    } else if(message.type === 'NIGHT_EVENT') {
      if(job === message.receiverJob) {
        setJobMessages((prevMessages) => [...prevMessages, message]);
      }
    }
    
    // 채팅 메시지
    if (dayNight === 'night') {
      setMafiaMessages((prevMessages) => [...prevMessages, message]);
      console.log(3, job, dayNight);
    }
    else if(dayNight === 'afternoon') {
      setCommonMessages((prevMessages) => [...prevMessages, message]);
      console.log(4, job, dayNight);
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
        roomsNumber: id,
        dayNight: dayNight,
        job: job,
        username: nickname,
        content: inputValue,
      };

      stompClientRef.current.publish({
        destination: `/pub/chat/rooms/${id}`,
        body: JSON.stringify(message),
      });
      setInputValue('');
    }
  };

  return (
    <div className="chat-window" style={{ bottom: 100}}>
        <List className="chat-log" style={{ maxHeight: '400px', overflowY: 'auto' }}>
          {(dayNight === 'night' && job === 'MAFIA'
            ? mafiaMessages
            : commonMessages
          ).map((v, index) => (
            <ListItem key={index}>
              <span className="username">{v.username}: </span>
              <span className="content">{v.content} </span>
            </ListItem>
          ))}
        </List>

        <List>
        { jobMessages.map((v, index) => (
            <ListItem key={index} style={{ backgroundColor: 'blue', color: 'white', padding: '8px', borderRadius: '8px' }}>
              <span className="username">[시스템]: </span>
              <span className="content">{v.message} </span>
            </ListItem>
          ))}
        </List>
      
      
      {/* 죽지 않았을 때만 렌더링 */}
      {!killed && (
        <div className="chat-input" style={{ position: 'fixed', bottom: 130, width: '19%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              label="메시지를 입력하세요."
              variant="outlined"
              fullWidth
              disabled={dayNight === 'night' && job !== 'MAFIA'}
              style={{ height: '40px' }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={dayNight === 'night' && job !== 'MAFIA'}
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
        <p>job 값: {job}</p>
      </div>
    </div>
  );
};

export default ChatComponent;