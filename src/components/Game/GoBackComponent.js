import React, {useRef, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import indexStore from '../../store/Store';
import { Client } from '@stomp/stompjs';


export default function GoBackComponent(props) {
    const navigate = useNavigate();
    const stompClientRef = useRef(null);
    const { nickNameStore, usersStore, voteStore, gameRoomInfoStore } = indexStore();

    useEffect(()=>{
      connectToWebSocket();
      return () => {
        disconnectFromWebSocket();
      };
      }, []
    );

    const connectToWebSocket= () => {
      const socket = new WebSocket('ws://localhost:8080/connect');
      const stompClient = new Client({
          webSocketFactory: () => socket, debug: () => { },
      });

      stompClientRef.current = stompClient;
      stompClient.activate();
    }


    const sendLeaveMsg = () =>{
      const message = {
        nickname: nickNameStore.nickname,
        host: props.host
      };

      stompClientRef.current.publish({
        destination: `/pub/rooms/${props.id}/quit-game`,
        body: JSON.stringify(message),
      });

    }

    const goBackEvent = () => {
      sendLeaveMsg();
      navigate("/");
    }

    const disconnectFromWebSocket = () => {
      if (stompClientRef.current) {
        stompClientRef.current.deactivate();
      }
    };

  return (
    <div>
        <button onClick={goBackEvent}>뒤로 가기</button>
    </div>
  )
}
