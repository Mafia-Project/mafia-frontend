import { Button } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import indexStore from '../../store/Store';
import { Client } from '@stomp/stompjs';

const GameStart = () => {
    const { usersStore, gameRoomInfoStore } = indexStore();
    const stompClientRef = useRef(null);
  
    const handleStartGame = () => {
          stompClientRef.current.publish({
            
            destination: `/pub/rooms/${gameRoomInfoStore.roomKey}/start-game`,
          });
      };

    useEffect(() => {
      connectToWebSocket();
      return () => {
        disconnectFromWebSocket();
      };
    }, []);
  
    const connectToWebSocket = () => {
      const socket = new WebSocket('ws://localhost:8080/connect');
      const stompClient = new Client({
        webSocketFactory: () => socket,
        debug: () => {},
      });
  
      stompClient.onConnect = () => {
        stompClient.subscribe(`/sub/rooms/${gameRoomInfoStore.roomKey}`, (message) => {
          if (message.body) {
            const data = JSON.parse(message.body);
            if (data.messageType === 'START') {
              usersStore.removeAll();
              usersStore.addAll(data.playerInfo);
              
              console.log('서버로부터 받은 데이터:', data);
            }
            
          }

        });
      };
  
      stompClient.activate();
      stompClientRef.current = stompClient;
    };
  
    const disconnectFromWebSocket = () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };
  
    return (
      <div>
        <Button variant="outlined" size="large" onClick={handleStartGame}>
          게임 시작
        </Button>
      </div>
    );
  };

export default GameStart;