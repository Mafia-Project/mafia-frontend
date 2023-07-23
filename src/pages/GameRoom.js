import React, { useEffect, useRef } from 'react';
import { Client } from '@stomp/stompjs';
import indexStore from '../store/Store';
import GamePlayerList from '../components/Game/GamePlayerList';

const GameRoom = (props) => {
    const { id, host } = props;
    const stompClientRef = useRef(null);
    const { myInfoStore, usersStore, voteStore, gameRoomInfoStore } = indexStore();

    useEffect(() => {
        connectToWebSocket();
        return () => {
            disconnectFromWebSocket();
        };
    }, []);

    const sendInitMsg = () => {
        const message = {
            nickname: myInfoStore.nickname,
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
                        gameRoomInfoStore.setTime(body.time);
                    }
                    if(body.type === 'CURRENT_VOTE'){
                        voteStore.removeAll();
                        voteStore.addAll(body.currentVotes);
                    }
                    if(body.type === 'VOTE'){
                        voteStore.removeAll();
                    }
                    if(body.type === 'USER_INFO' || body.type === 'START' || body.type === 'NIGHT_END' || body.type === 'VOTE_RESULT'){
                        usersStore.removeAll();
                        usersStore.addAll(body.playerInfo);
                    }
                    if(body.type === 'START'){ 
                        voteStore.removeAll();
                        gameRoomInfoStore.setStart(body.playerInfo);
                        myInfoStore.setMyInfo(body.playerInfo.find(user => user.nickname === myInfoStore.nickname));
                    }
                    if(body.type === 'NIGHT_END'){
                        gameRoomInfoStore.setNIGHTEND(body.playerInfo);
                        myInfoStore.setMyInfo(body.playerInfo.find(user => user.nickname === myInfoStore.nickname));
                    }
                    if(body.type === 'VOTE_RESULT'){
                        console.log("voteResult");
                        voteStore.removeAll();
                        gameRoomInfoStore.setVoteResult(body.playerInfo);
                        myInfoStore.setMyInfo(body.playerInfo.find(user => user.nickname === myInfoStore.nickname));
                    }
                    if(body.type === 'END'){
                        gameRoomInfoStore.setApiAble(false);
                        setTimeout(() => {
                            voteStore.removeAll();
                            gameRoomInfoStore.setEnd();
                        },1000);
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