import React from 'react'

import CreateRoomBtnComponent from '../components/CreateRoomBtnComponent';
import MainLabelComponent from '../components/MainLabelComponent';
import ParticipantRoomBtnComponent from '../components/ParticipantRoomBtnComponent';
import indexStore  from '../store/Store';
import { useObserver } from 'mobx-react-lite';


const Main = () => {
    const { nickNameStore }  = indexStore();

    const handleInputChange = (event) => {
        nickNameStore.setNickname(event.target.value);
    }

    return useObserver(() => (
        <div>
            <MainLabelComponent />
            <label>닉네임 : </label>
            <input type='text' value={nickNameStore.nickname} onChange={handleInputChange} />
            <CreateRoomBtnComponent nickname={nickNameStore.nickname} />
            <ParticipantRoomBtnComponent nickname={nickNameStore.nickname} />
        </div>
    ));
}

export default Main;
