import React from 'react';
import './GameRoomBodyComponent.css';
import ParentComponent from './ParentComponent';
import ChatComponent from './ChatComponent';
import TabMenu from './TabMenu';
import JobDescription from './JobDescription';

const GameRoomBodyComponent = () => {
    //const job = { name: '마피아' };

    return (
    <div className="game-room-container">
      <div className="left-area"> {/* 왼쪽 공간 */}
        <JobDescription job='마피아'/>
      </div>

      <div className="center-area"> {/* 가운데 공간 */}
        <TabMenu/>
      </div>

      <div className="right-area" style={{flex: 1, overflowY: 'auto'}}> {/* 오른쪽 공간 */}
        <ParentComponent/>
      </div>
    </div>
    );
};

export default GameRoomBodyComponent;