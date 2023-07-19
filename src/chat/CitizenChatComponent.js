import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';


const CitizenChatComponent = ({dayNight, job}) => {
  // 부모 컴포넌트?mobx?에서 가져온 데이터라고 가정
  const [roomsNumber, setRoomsNumber] = useState('1'); // 방 고유번호
  const [username, setUsername] = useState('test_user'); // 유저 이름

  const [commonMessages, setCommonMessages] = useState([]); // 공용 채팅 로그 메시지
  const [mafiaMessages, setMafiaMessages] = useState([]); // 공용 채팅 로그 메시지
  const [inputValue, setInputValue] = useState(''); // 채팅 입력 메시지

  const stompClientRef = useRef(null);
  console.log(2, job, dayNight);

  useEffect(() => {
    connectToWebSocket();

    return () => {
      disconnectFromWebSocket();
    };
  }, []);

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
      stompClient.subscribe(`/sub/chat/rooms/${roomsNumber}`, (message) => {
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
    const newMessage = { ...message, username: username };
    
    if (dayNight === 'night' && job === '마피아') {
      setMafiaMessages((prevMessages) => [...prevMessages, newMessage]);
      console.log(3, job, dayNight);
    } 
    else {
      setCommonMessages((prevMessages) => [...prevMessages, newMessage]);
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
        roomsNumber: roomsNumber,
        dayNight: dayNight,
        username: username,
        content: inputValue,
      };

      stompClientRef.current.publish({
        destination: `/pub/chat/rooms/${roomsNumber}`,
        body: JSON.stringify(message),
      });
      setInputValue('');
    }
  };

  return (
    <div className="chat-window">
      <div className="chat-log">
        {(dayNight === 'night' && job === '마피아'
          ? mafiaMessages
          : commonMessages
        ).map((message, index) => (
          <div key={index} className="message">
            <span className="username">{message.username}: </span>
            {message.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="메시지를 입력하세요."
          disabled={dayNight === 'night' && job !== '마피아'}   // 밤이면 채팅 입력창 비활성화
        />
        <button
        onClick={handleSendMessage}
        disabled={dayNight === 'night'  && job !== '마피아'}   // 밤이면 채팅 전송 비활성화
        >전송</button>
      </div>
    </div>
  );
};

export default CitizenChatComponent;