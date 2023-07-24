import React, { useEffect } from 'react';
import './Timer.css';
import { observer } from 'mobx-react';
import indexStore from '../../store/Store';
import { gameNightEndApi, gameVoteResultApi } from '../../public/api/axios';

const Timer = observer(({id, color}) => {
  const { gameRoomInfoStore } = indexStore();

  useEffect(() => {
    if (gameRoomInfoStore.time > 0) {
      gameRoomInfoStore.startTimer();
    }
  
    if (gameRoomInfoStore.time === 0 && gameRoomInfoStore.dayNight === 'night' && gameRoomInfoStore.apiAble) {
      gameNightEndApi(id);
    } else if (gameRoomInfoStore.time === 0 && gameRoomInfoStore.dayNight === 'afternoon' && gameRoomInfoStore.apiAble) {
      gameVoteResultApi(id);
    }
  
    return () => {
      gameRoomInfoStore.stopTimer();
    };
  }, [gameRoomInfoStore.time, gameRoomInfoStore.dayNight]);

  const time = gameRoomInfoStore.time;
  const blinkClass = time <= 5 && time > 0 ? 'blink' : '';

  return (
    <svg width="80" height="80" className={blinkClass}>
      <circle cx="40" cy="40" r="35" stroke="red" strokeWidth="2" fill="transparent" />
      <text x="40" y="45" textAnchor="middle" fontSize="20" fontWeight="bold" fill={color} >
        {time.toString().padStart(2, '0')}
      </text>
    </svg>
  );
});

export default Timer;
