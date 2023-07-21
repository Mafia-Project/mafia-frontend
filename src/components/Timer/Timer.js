import React, { useEffect } from 'react';
import './Timer.css';
import { observer } from 'mobx-react';
import indexStore from '../../store/Store';

const Timer = observer(() => {
  const { gameRoomInfoStore } = indexStore(); // gameRoomInfoStore 가져오기

  useEffect(() => {
    if (gameRoomInfoStore.time > 0) {
      gameRoomInfoStore.startTimer();
    } else {
      gameRoomInfoStore.stopTimer();
    }

    return () => {
      gameRoomInfoStore.stopTimer(); // 컴포넌트 언마운트 시 타이머 정리
    };
  }, [gameRoomInfoStore]);

  const time = gameRoomInfoStore.time;
  const blinkClass = time <= 5 && time > 0 ? 'blink' : '';

  return (
    <svg width="80" height="80" className={blinkClass}>
      <circle cx="40" cy="40" r="35" stroke="red" strokeWidth="2" fill="transparent" />
      <text x="40" y="45" textAnchor="middle" fontSize="20" fontWeight="bold">
        {time.toString().padStart(2, '0')}
      </text>
    </svg>
  );
});

export default Timer;
