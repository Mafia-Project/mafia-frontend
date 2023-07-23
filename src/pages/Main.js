import React from 'react'

import CreateRoomBtnComponent from '../components/CreateRoomBtnComponent';
import MainLabelComponent from '../components/MainLabelComponent';
import ParticipantRoomBtnComponent from '../components/ParticipantRoomBtnComponent';
import indexStore  from '../store/Store';
import { useObserver } from 'mobx-react-lite';

//1. store에서 nickname은 바뀌지만, createRoomBtn에 설정된 Nickname은 바뀌지 않았다.
// 해당 부분을 바꾸려면, props로 넘겨주는 것이 아니라 store에서 값을 가져오는 것이 맞다. 
const Main = () => {
    const { nickNameStore }  = indexStore();

    const handleInputChange = (event) => {
        nickNameStore.setNickname(event.target.value);
        console.log(nickNameStore.nickname);
    }

    console.log(nickNameStore.nickname);

    return (
        <div>
            <MainLabelComponent />
            <label>닉네임 : </label>
            <input type='text'  onChange={handleInputChange} />
            <CreateRoomBtnComponent nickname={nickNameStore.nickname} />
            <ParticipantRoomBtnComponent nickname={nickNameStore.nickname} />
        </div>)
    ;
}

export default Main;
