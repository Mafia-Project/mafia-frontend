import React from 'react';
import './GameRoomComponent.css';
import JobDescription from './JobDescription';
import TabMenu from '../TabMenu';
import ParentComponent from '../Chat/ParentComponent';
import GameHeaderComponent from './GameHeaderComponent';
import GameFooterComponent from './GameFooterComponent';
import { useParams } from 'react-router-dom';
import indexStore from '../../store/Store';

const GameRoomComponent = () => {
    //const job = { name: '마피아' };
    const { id, host } = useParams();
    const { nickNameStore, usersStore, voteStore, gameRoomInfoStore } = indexStore();


    return (
      <div className="game-room-container">
        {/* 헤더 공간 */}
        <div className="header-area"> 
          < GameHeaderComponent />
        </div>
  
        {/* 바디 공간 */}
        <div className="body-area">   
          <div className="left-area"> {/* 왼쪽 공간 */}
            <JobDescription job="마피아" />
          </div>
    
          <div className="center-area"> {/* 가운데 공간 */}
            <TabMenu id={id} host={host}/>
          </div>
    
          <div className="right-area" style={{ flex: 1, overflowY: 'auto' }}> {/* 오른쪽 공간 */}
            <ParentComponent />
          </div>
        </div>
  
        {/* 푸터 공간 */}
        <div className="footer-area"> 
          <GameFooterComponent id={id} host={host}/>
        </div>
      </div>
    );
  };

export default GameRoomComponent;