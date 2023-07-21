import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import indexStore from '../store/Store';

export default function GameStartBtnComponent(props) {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [roomInfo, setRoomInfo] = useState({
    nickname: "",
    playerNum: 4,
    useReporter: false,
    usePsychopath: false,
    isHost: true
  });
  const { nickNameStore, usersStore, voteStore } = indexStore();
  
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
        const modalWindow = window.open('', 'createRoom', 'width=350,height=400');
        modalWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
              <title>Create Room</title>
              <style>
                * {
                  margin: 0;
                  padding: 0;
                }

                .OptionContainer{
                  display:flex;
                  flex-direction: column;
                  align-items: center;
                  justify-content: center;
                  height: 100vh;
                }
                #close {
                  background-color: black;
                  color: #ffffff;
                  border: none;
                  border-radius: 50%;
                  padding: 5px 10px;
                  font-size: 18px;
                  cursor: pointer;
                  margin-top: -15px;
                  margin-right: -15px;
                  align-self: flex-end;
                }
                
                
              
              </style>
            </head>
            <body>
              <div class="OptionContainer">
                <h2>OPTION</h2>
                <button id="close">X</button>
                <div class="player">
                  <label>플레이어 수 : </label>
                  <input type="number" id="playerNum" name="playerNum" value="${roomInfo.playerNum}" min='4' max='19'/> <br/>
                </div>
                <div class="jobs">
                  <label>추가 직업 </label>
                  <div class="job1">
                    <label>기자 </label>
                    <input type="checkbox" id="useReporter" name="useReporter" value="${roomInfo.useReporter}"/> <br/>
                  </div>
                  <div class="job2">
                    <label>정신병자 </label>
                    <input type="checkbox" id="usePsychopath" name="usePsychopath" value="${roomInfo.usePsychopath}"/> <br/>
                  </div>    
                </div>
                <button id="setting">설정</button>    
              </div>
            </body>
            </html>
        `);

        modalWindow.document.getElementById('playerNum').onchange=handleInputChange;
        modalWindow.document.getElementById('useReporter').onchange=handleCheckboxChange;
        modalWindow.document.getElementById('usePsychopath').onchange=handleCheckboxChange;

        modalWindow.document.getElementById('setting').addEventListener('click', () => {   
          let newRoomInfo = {
            ...roomInfo,
            nickname:props.nickname
          }; 

          nickNameStore.setNickname(props.nickname);

          axios.post('http://localhost:8080/api/v1/createRoom', { 
            nickname: newRoomInfo.nickname,
            playerNum : newRoomInfo.playerNum,
            useReporter : newRoomInfo.useReporter,
            usePsychopath : newRoomInfo.usePsychopath,
            isHost : newRoomInfo.isHost
          }).then((res) => {
            navigate(`/rooms/${res.data.roomKey}/${newRoomInfo.isHost}`);
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
