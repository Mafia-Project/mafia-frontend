<<<<<<< HEAD
import React, { useState } from 'react';
=======
import React, {useEffect, useRef} from 'react';
>>>>>>> 3f5d283d6506b14f74797842489907d40cb02d1f
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
        <div className="center-area">
          <TabMenu id={id} host={host} onClickJobThumnailHandler={onClickJobThumnailHandler} />
        </div>

        <div className="right-area" style={{ flex: 1, overflowY: 'auto' }}>
          <ParentComponent />
        </div>
      </div>
    );
  });

export default GameRoomComponent;