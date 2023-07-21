import React, { useState } from 'react';
import './GameRoomComponent.css';
import JobDescription from './JobDescription';
import TabMenu from '../TabMenu';
import ParentComponent from '../Chat/ParentComponent';
import GameHeaderComponent from './GameHeaderComponent';
import GameFooterComponent from './GameFooterComponent';
import { useParams } from 'react-router-dom';
import Job from '../../public/common/Job';


const GameRoomComponent = () => {
  const { id, host } = useParams();
  const [job, setJob] = useState(Job[0]);

  const onClickJobThumnailHandler = (jobName) => {
    setJob(Job.find(job => job.job === jobName));
  }

  return (
    <div className="game-room-container">
      <div className="header-area">
        < GameHeaderComponent />
      </div>
      <div className="body-area">
        <div className="left-area">
          <JobDescription job={job} />
        </div>
        <div className="center-area">
          <TabMenu id={id} host={host} onClickJobThumnailHandler={onClickJobThumnailHandler} />
        </div>

        <div className="right-area" style={{ flex: 1, overflowY: 'auto' }}>
          <ParentComponent />
        </div>
      </div>
      <div className="footer-area">
        <GameFooterComponent id={id} host={host} />
      </div>
    </div>
  );
};

export default GameRoomComponent;