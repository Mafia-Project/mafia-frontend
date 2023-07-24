
import React, {useEffect, useRef, useState} from 'react';
import './GameRoomComponent.css';
import JobDescription from './JobDescription';
import TabMenu from '../TabMenu';
import GameHeaderComponent from './GameHeaderComponent';
import { useParams } from 'react-router-dom';
import indexStore from '../../store/Store';
import "./GameRoomComponent.css";
import { observer } from 'mobx-react';
import Job from '../../public/common/Job';
import ChatComponent from '../Chat/ChatComponent';
import GameFooterComponent from './GameFooterComponent';

const GameRoomComponent = observer(() => {
    //const job = { name: '마피아' };
    const { gameRoomInfoStore, myInfoStore } = indexStore(); 
    const { id, host } = useParams();
    const [job, setJob] = useState(Job[0]);

    const colorRef = useRef('white');
    const textRef = useRef('black');

    useEffect(() => {
      return () => {
        colorRef.current = gameRoomInfoStore.dayNight==='afternoon'?'white':'black';
        textRef.current = gameRoomInfoStore.dayNight==='afternoon'?'black':'white';
      };
    }, [gameRoomInfoStore.dayNight]);

    const onClickJobThumnailHandler = (jobName) => {
      setJob(Job.find(job => job.job === jobName));
    }
  

    return (
      <div className="game-room-container" style={{background: colorRef.current }}>
      {/* 헤더 공간 */}
      <div className="header-area"> 
        < GameHeaderComponent id={id} color={textRef.current}/>
      </div>

      {/* 바디 공간 */}
      <div className="body-area" style={{background: 'white' }}>   
        <div className="left-area"> {/* 왼쪽 공간 */}
          <JobDescription job={job} />
        </div>
  
        <div className="center-area" > {/* 가운데 공간 */}
          <TabMenu id={id} host={host} onClickJobThumnailHandler={onClickJobThumnailHandler} />
        </div>
  
        <div className="right-area" style={{ flex: 1, overflowY: 'auto' }}> {/* 오른쪽 공간 */}
          <ChatComponent id={id} />
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