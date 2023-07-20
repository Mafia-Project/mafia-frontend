import React, { useState } from 'react';
import ChatComponent from './ChatComponent';

const ParentComponent = () => {
  const [job, setJob] = useState('-');
  const [dayNight, setDayNight] = useState('-');

  // mobx에서 가져온 데이터라고 가정
  const [killed, setKilled] = useState('false');

  return (
    <div>
      <button onClick={() => {
        console.log('마피아 선택');
        setJob('마피아')}}>직업: 마피아</button>
      <button onClick={() => {
        console.log('시민 선택');
        setJob('시민')}}>직업: 시민</button>

      <button onClick={() => {
        console.log('낮 선택')
        setDayNight('afternoon')}}>상태: 낮</button>
      <button onClick={() => {
        console.log('밤 선택');
        setDayNight('night')}}>상태: 밤</button>

      
      <button onClick={() => {
        console.log(killed);
        setKilled(!killed)}}>죽음</button>

      <ChatComponent job={job} dayNight={dayNight} killed={killed} />
    </div>
  );
};

export default ParentComponent;