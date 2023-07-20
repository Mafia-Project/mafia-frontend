import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import TimeReduction from '../components/Timer/TimeReduction';
import { Client } from '@stomp/stompjs';
import Timer from '../components/Timer/Timer';
import indexStore from '../store/Store';
import GamePlayerList from '../components/Game/GamePlayerList';

const GameRoom = () => {
    const { id, host } = useParams();
    const stompClientRef = useRef(null);
    const [time, setTime] = useState(70);
    const [isTimeAble, setIsTimeAble] = useState(true);
    const { nickNameStore, usersStore, voteStore } = indexStore();

    useEffect(() => {
        connectToWebSocket();
        return () => {
            disconnectFromWebSocket();
        };
    }, []);

    const sendInitMsg = () => {
        const message = {
            nickname: nickNameStore.nickname,
            host: host
        };

        stompClientRef.current.publish({
            destination: `/pub/rooms/${id}/join-game`,
            body: JSON.stringify(message),
        });
    }

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
                    if(body.type === 'CURRENT_VOTE'){
                        voteStore.removeAll();
                        voteStore.addAll(body.currentVotes);
                    }
                    if(body.type === 'VOTE'){
                        voteStore.removeAll();
                    }
                    if(body.messageType === 'USER_INFO'){
                        usersStore.removeAll();
                        usersStore.addAll(body.playerInfo);
                    }
                }
            },
            sendInitMsg()
            );


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
            <div>
                <Timer
                    isTimeAble={isTimeAble}
                    time={time}
                    setTime={setTime}
                />
                
            </div>
            <div>
                <GamePlayerList id={id} />
            </div>
            <div>
                <TimeReduction
                    id={id}
                    nickname={nickNameStore.nickname}
                    time={time}
                />
            </div>
        </div>
    );
}

export default GameRoom;