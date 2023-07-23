import React from 'react'

import CreateRoomBtnComponent from '../components/CreateRoomBtnComponent';
import MainLabelComponent from '../components/MainLabelComponent';
import ParticipantRoomBtnComponent from '../components/ParticipantRoomBtnComponent';
import indexStore  from '../store/Store';
import { useObserver } from 'mobx-react-lite';

import "./Main.css";


const Main = () => {
    const { myInfoStore }  = indexStore();

    const handleInputChange = (event) => {
        myInfoStore.setNickname(event.target.value);
    }

    return useObserver(() => (
        <div class="MainPage">
            <MainLabelComponent />
            <div class="NicknameField">
                <label>Nickname </label>
                <input type='text' value={myInfoStore.nickname} onChange={handleInputChange} class="mainInput" />
            </div>
            <div class="ButtonField">
                <CreateRoomBtnComponent nickname={myInfoStore.nickname} />
                <ParticipantRoomBtnComponent nickname={myInfoStore.nickname} />
            </div>
        </div>
    ));
}

export default Main;
