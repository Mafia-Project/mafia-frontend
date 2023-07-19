import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TimeReduction from '../components/TimeReduction';
import { Client } from '@stomp/stompjs';
import Timer from '../components/Timer';
import indexStore from '../store/Store';

const GameRoom = () => {
    const { id } = useParams();
    const stompClientRef = useRef(null);
    const [time, setTime] = useState(70);
    const [isTimeAble, setIsTimeAble] = useState(true);
    const { nickNameStore, usersStore } = indexStore();

    useEffect(() => {
        connectToWebSocket();
        return () => {
            disconnectFromWebSocket();
        };
    }, []);


    const connectToWebSocket = () => {
        const socket = new WebSocket('ws://localhost:8080/connect');
        const stompClient = new Client({
            webSocketFactory: () => socket, debug: () => { },
        });

        stompClientRef.current = stompClient;
        stompClient.onConnect = () => {
            stompClient.subscribe(`/sub/rooms/${id}`, (message) => {
                if (message.body) {
                    const body = JSON.parse(message.body);
                    if (body.type === 'TIME_REDUCTION') {
                        setTime(body.time);
                    }
                }
            });
        };
        stompClient.activate();
    };

    const disconnectFromWebSocket = () => {
        if (stompClientRef.current) {
            stompClientRef.current.deactivate();
        }
    };

    return (
        <div>
            <TimeReduction
                id={id}
                nickname={nickNameStore.nickname}
                time={time}
            />

            <Timer
                isTimeAble={isTimeAble}
                time={time}
                setTime={setTime}
            />
        </div>
    );
}

export default GameRoom;