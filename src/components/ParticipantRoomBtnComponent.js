import React, { useState } from 'react';
import axios from 'axios';

export default function ParticipantRoomBtnComponent(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    nickname: "",
    roomCode: "",
    isHost: false
  });
  
  const handleInputChange = (e) => {
    let newRoomInfo = roomInfo;
    newRoomInfo = {
      ...newRoomInfo
      [e.target.name]=Number(e.target.value)};

    setRoomInfo(newRoomInfo);
  }

  const openPopupModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      const modalWindow = window.open('', 'Modal', 'width=400,height=300');
      modalWindow.document.write(`
        <div>
          <h2>PARTICIPANT</h2>
          <button id="close">X</button>
          <label>방 코드 : </label>
          <input type="text" id="roomCode" name="roomCode" value="${roomInfo.roomCode}"/> <br/>
          <button id="participant">참가</button>
        </div>
      `);

      modalWindow.document.getElementById('roomCode').onchange=handleInputChange;
      modalWindow.document.getElementById('participant').addEventListener('click', () => {
        let newRoomInfo = {
          ...roomInfo,
          nickname:props.nickname
        };
        
        axios.post('http://localhost:8080/api/v1/participantRoom', { newRoomInfo }).then((res) => {});
        setIsModalOpen(false);
        modalWindow.close();
      });

      modalWindow.document.getElementById('close').addEventListener('click', () => {
        setIsModalOpen(false);
        modalWindow.close();
      });
    }
  };

  return (
    <div>
        <button onClick={openPopupModal}>방 참가</button>
    </div>
  );
}
