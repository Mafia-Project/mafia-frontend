import React, { useEffect, useRef, useState } from 'react';
import { Client } from '@stomp/stompjs';
import indexStore from '../store/Store';
import GamePlayerList from '../components/Game/GamePlayerList';

const GameRoom = (props) => {
    const { id, host } = props;
    const stompClientRef = useRef(null);
    const { nickNameStore, usersStore, voteStore, gameRoomInfoStore } = indexStore();

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
                    console.log(body);
                    if (body.type === 'TIME_REDUCTION') {
                        console.log(body.time);
                        gameRoomInfoStore.setTime(body.time);
                    }
                    if(body.type === 'CURRENT_VOTE'){
                        voteStore.removeAll();
                        voteStore.addAll(body.currentVotes);
                    }
                    if(body.type === 'VOTE'){
                        voteStore.removeAll();
                    }
                    if(body.type === 'USER_INFO'|| body.type === 'NIGHT_END'){
                        usersStore.removeAll();
                        usersStore.addAll(body.playerInfo);
                    }
                    if(body.type === 'START'){
                        usersStore.removeAll();
                        usersStore.addAll(body.playerInfo);
                        gameRoomInfoStore.setDayNight('night');
                        gameRoomInfoStore.setTime(body.playerInfo.length * 20);
                        gameRoomInfoStore.startTimer();
                    }
                    if(body.type === 'VOTE_RESULT'){
                        voteStore.removeAll();
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
            <GamePlayerList id={id} />
        </div>
    );
}

export default GameRoom;