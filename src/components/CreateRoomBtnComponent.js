import React, { useState } from 'react';
import axios from 'axios';

export default function GameStartBtnComponent(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    nickname: "",
    playerNum: 4,
    useReporter: false,
    usePsychopath: false,
    isHost: true
  });
  
  const handleInputChange = (e) => {
    let newRoomInfo = roomInfo;
    newRoomInfo = {
      ...newRoomInfo
      [e.target.name]=Number(e.target.value)};

    setRoomInfo(newRoomInfo);
  }

  const handleCheckboxChange = (e) => {
    let newRoomInfo = roomInfo;
    newRoomInfo = {
      ...newRoomInfo
      [e.target.name]=e.target.checked};

    setRoomInfo(newRoomInfo);
  }

  const openPopupModal = () => {
    if(props.nickname.replace(/(\s*)/g, "")!==""){
      if (!isModalOpen) {
        setIsModalOpen(true);
        const modalWindow = window.open('', 'Modal', 'width=400,height=300');
        modalWindow.document.write(`
          <div>
            <h2>OPTION</h2>
            <button id="close">X</button>
            <label>플레이어 수 : </label>
            <input type="number" id="playerNum" name="playerNum" value="${roomInfo.playerNum}" min='4' max='19'/> <br/>
            <label>추가 직업 </label>
            <div>
              <label>기자 </label>
              <input type="checkbox" id="useReporter" name="useReporter" value="${roomInfo.useReporter}"/> <br/>
              <label>정신병자 </label>
              <input type="checkbox" id="usePsychopath" name="usePsychopath" value="${roomInfo.usePsychopath}"/> <br/>
            </div>    
            <button id="setting">설정</button>
          </div>
        `);

        modalWindow.document.getElementById('playerNum').onchange=handleInputChange;
        modalWindow.document.getElementById('useReporter').onchange=handleCheckboxChange;
        modalWindow.document.getElementById('usePsychopath').onchange=handleCheckboxChange;

        modalWindow.document.getElementById('setting').addEventListener('click', () => {   
          let newRoomInfo = {
            ...roomInfo,
            nickname:props.nickname
          }; 
          axios.post('http://localhost:8080/api/v1/createRoom', { newRoomInfo }).then((res) => {});
          setIsModalOpen(false);
          modalWindow.close();
        });

        modalWindow.document.getElementById('close').addEventListener('click', () => {
          setIsModalOpen(false);
          modalWindow.close();
        });
      }
    }
    else{
      alert('닉네임을 제대로 설정해주세요!');
    }
  };

  return (
    <div>
        <button onClick={openPopupModal}>방 생성</button>
    </div>
  );
}
