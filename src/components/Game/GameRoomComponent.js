import React, {useEffect, useRef} from 'react';
import './GameRoomComponent.css';
import JobDescription from './JobDescription';
import TabMenu from '../TabMenu';
import ParentComponent from '../Chat/ParentComponent';
import GameHeaderComponent from './GameHeaderComponent';
import GameFooterComponent from './GameFooterComponent';
import { useParams } from 'react-router-dom';
import indexStore from '../../store/Store';
import "./GameRoomComponent.css";
import { observer } from 'mobx-react';

const GameRoomComponent = observer(() => {
    //const job = { name: '마피아' };
    const { id, host } = useParams();
    const colorRef = useRef('white');

    const { gameRoomInfoStore } = indexStore(); // gameRoomInfoStore 가져오기

    useEffect(() => {
      console.log("!!!"+gameRoomInfoStore.dayNight);
      return () => {
        colorRef.current = gameRoomInfoStore.dayNight==='afternoon'?'white':'#5E5EBE'; // 컴포넌트 언마운트 시 타이머 정리
      };
    }, [gameRoomInfoStore.dayNight]);

    return (
      <div className="game-room-container" style={{background: colorRef.current }}>
        {/* 헤더 공간 */}
        <div className="header-area"> 
          < GameHeaderComponent id={id}/>
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
  });

export default GameRoomComponent;