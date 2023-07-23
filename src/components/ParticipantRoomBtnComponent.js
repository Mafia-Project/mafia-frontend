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
  const { myInfoStore } = indexStore();
  
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
      const modalWindow = window.open('', 'participantRoom', 'width=600,height=400');
      modalWindow.document.write(`
      <!DOCTYPE html>
        <html>
          <head>
            <title>Participant Room</title>
            <style>
              * {
                margin: 0;
                padding: 0;
                background-color:black;
                color: white;
              }

              .OptionContainer{
                display:flex;
                flex-direction: column;
                align-items: left;
                margin-left:30%;
                justify-content: center;
                height: 90vh;
              } 
              
              h2{
                margin-bottom:30px;
              }

              #close, #participant{
                background-color: gray;
                float: right;
                color: #ffffff;
                border: none;
                border-radius: 20%;
                padding: 5px 10px;
                font-size: 18px;
                cursor: pointer;
                margin-right: 5px;
                align-self: flex-end;
              }

              #close:hover,#participant:hover{
                background-color: darkgray;
              }
            </style>
          </head>
          <body>
            <button id="close">X</button>
            <div class="OptionContainer">
              <h2>PARTICIPANT</h2>
              <div>
                <label>방 코드 : </label>
                <input type="text" id="roomKey" name="roomKey" value="${roomInfo.roomKey}"/>
              </div>
            </div>
            <button id="participant">참가</button>
          </body>
        </html>
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
              myInfoStore.setNickname(props.nickname);
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
        <button onClick={openPopupModal} class="mainBtn">방 참가</button>
    </div>
  );
}
