import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import { Button, List, ListItem, TextField } from '@mui/material';
import indexStore from '../../store/Store';


const ChatComponent = (props) => {
  const { id } = props;
  const { myInfoStore, usersStore, gameRoomInfoStore } = indexStore();
  const systemMessageEndRef = useRef(null);
  const messageEndRef = useRef(null);

  const dayNight = gameRoomInfoStore.dayNight;  //낮, 밤
  const killed = false;

  const [commonMessages, setCommonMessages] = useState([]);
  const [mafiaMessages, setMafiaMessages] = useState([]); 
  const [systemMessage, setSystemMessage] = useState([]); 
  const [inputValue, setInputValue] = useState(''); 

  const stompClientRef = useRef(null);

  useEffect(() => {
    connectToWebSocket();

    return () => {
      disconnectFromWebSocket();
    };
  }, [myInfoStore, usersStore, gameRoomInfoStore, dayNight, killed]);

  const scrollToBottom = () => {
    systemMessageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollMessageToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [systemMessage]);
  useEffect(scrollMessageToBottom, [mafiaMessages, commonMessages]);

  const connectToWebSocket = () => {
    const socket = new WebSocket('ws://localhost:8080/connect');
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: () => { },
    });

    stompClientRef.current = stompClient;

    stompClient.onConnect = () => {
      stompClient.subscribe(`/sub/chat/rooms/${id}`, (message) => {
        const newMessage = JSON.parse(message.body);
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
    if (message.type === 'SYSTEM') {
      setSystemMessage((prevMessages) => [...prevMessages, message]);
    } else if (message.type === 'JOB' && message.jobType === myInfoStore.job) {
      setSystemMessage((prevMessages) => [...prevMessages, message]);
    } else if (message.type === 'JOB' && message.username === myInfoStore.nickname) {
      setSystemMessage((prevMessages) => [...prevMessages, message]);
    } else if (message.type === 'USER') {
      setCommonMessages((prevMessages) => [...prevMessages, message]);
    } else if (message.type === 'MAFIA_CHAT') {
      setMafiaMessages((prevMessages) => [...prevMessages, message]);
    }
  }

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '') {
      const message = {
        nickname: myInfoStore.nickname,
        content: inputValue,
        job: myInfoStore.job,
        dayNight: dayNight,
      };

      stompClientRef.current.publish({
        destination: `/pub/chat/rooms/${id}`,
        body: JSON.stringify(message),
      });
      setInputValue('');
    }
  };

  return (
    <div className="chat-window" style={{ bottom: 100 }}>
      <List className="chat-log" style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {(dayNight === 'night' && myInfoStore.job === 'MAFIA'
          ? mafiaMessages
          : commonMessages
        ).map((v, index) => (
          <ListItem key={index}>
            <span className="username">{v.username}: </span>
            <span className="content">{v.content} </span>
          </ListItem>
        ))}
        <div ref={messageEndRef} />
      </List>

      <List style={{ maxHeight: '150px', overflowY: 'auto' }}>
        {systemMessage.map((v, index) => (
          <ListItem key={index} style={{ backgroundColor: 'blue', color: 'white', padding: '8px', borderRadius: '8px', wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
            <span className="username">[시스템]: </span>
            <span className="content">{v.content} </span>
          </ListItem>
        ))}
        <div ref={systemMessageEndRef} />
      </List>


      {/* 죽지 않았을 때만 렌더링 */}
      {!killed && (
        <div className="chat-input" style={{ position: 'fixed', bottom: 200, width: '19%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <TextField
              type="text"
              value={inputValue}
              onChange={handleInputChange}
              label="메시지를 입력하세요."
              variant="outlined"
              fullWidth
              disabled={dayNight === 'night' && myInfoStore.job !== 'MAFIA'}
              style={{ height: '40px' }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  handleSendMessage();
                  e.preventDefault();
                }
              }}
            />
            <Button
              onClick={handleSendMessage}
              disabled={dayNight === 'night' && myInfoStore.job !== 'MAFIA'}
              variant="contained"
              color="primary"
              style={{ marginLeft: '10px', height: '40px' }}
            >
              전송
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;