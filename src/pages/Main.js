import React from 'react'

import CreateRoomBtnComponent from '../components/CreateRoomBtnComponent';
import MainLabelComponent from '../components/MainLabelComponent';
import ParticipantRoomBtnComponent from '../components/ParticipantRoomBtnComponent';
import indexStore  from '../store/Store';
import { useObserver } from 'mobx-react-lite';

import "./Main.css";


const Main = () => {
    const { nickNameStore }  = indexStore();

    const handleInputChange = (event) => {
        nickNameStore.setNickname(event.target.value);
    }

    return useObserver(() => (
        <div class="MainPage">
            <MainLabelComponent />
            <div class="NicknameField">
                <label>Nickname </label>
                <input type='text' value={nickNameStore.nickname} onChange={handleInputChange} />
            </div>
            <div class="ButtonField">
                <CreateRoomBtnComponent nickname={nickNameStore.nickname} />
                <ParticipantRoomBtnComponent nickname={nickNameStore.nickname} />
            </div>
        </div>
    ));
}

export default Main;
