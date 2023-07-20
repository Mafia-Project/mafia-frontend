import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import indexStore from '../store/Store';

export default function ParticipantRoomBtnComponent(props) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    nickname: "",
    roomKey: "",
    isHost: false
  });
  const { nickNameStore, usersStore, voteStore } = indexStore();
  
  const handleInputChange = (e) => {
    let newRoomInfo = roomInfo;
    newRoomInfo = {
      ...newRoomInfo
      [e.target.name]=e.target.value};

    setRoomInfo(newRoomInfo);
  }

  const openPopupModal = () => {
    if (!isModalOpen) {
      setIsModalOpen(true);
      const modalWindow = window.open('', 'participantRoom', 'width=400,height=300');
      modalWindow.document.write(`
        <div>
          <h2>PARTICIPANT</h2>
          <button id="close">X</button>
          <label>방 코드 : </label>
          <input type="text" id="roomKey" name="roomKey" value="${roomInfo.roomKey}"/> <br/>
          <button id="participant">참가</button>
        </div>
      `);

      modalWindow.document.getElementById('roomKey').onchange=handleInputChange;
      modalWindow.document.getElementById('participant').addEventListener('click', () => {
        let newRoomInfo = {
          ...roomInfo,
          nickname:props.nickname
        };

        console.log(newRoomInfo.roomKey);
        
        axios.post(`http://localhost:8080/api/v1/joinRoom/${newRoomInfo.roomKey}`, { nickname:newRoomInfo.nickname })
        .then((res) => {
          console.log(res);
          switch(res.data.result){
            case "OK":
              nickNameStore.setNickname(props.nickname);
              navigate(`/rooms/${newRoomInfo.roomKey}/false`);
              break
            case "NICKNAME":
              alert("닉네임이 중복되었습니다.");
              break
            case "EXCEEDED":
              alert("해당 방의 정원이 가득 찼습니다.");
              break
            default:
              alert("유효하지 않은 방 코드입니다.");
              break
          }

          

          setIsModalOpen(false);
          modalWindow.close();
        }).catch((e)=>{
          console.log(e);
        });
        
        
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
