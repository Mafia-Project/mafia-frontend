import React, { useState } from 'react';
import ChatWindow from './ChatWindow';

const ParentComponent = () => {
  const [job, setJob] = useState('-');
  const [dayNight, setDayNight] = useState('-');

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

      <ChatWindow job={job} dayNight={dayNight} />
    </div>
  );
};

export default ParentComponent;