import React, { useEffect, useRef } from 'react';
import './Timer.css'; // 이곳에서 애니메이션 스타일을 가져옵니다.

function Timer({ isTimeAble, time, setTime }) {
  const intervalRef = useRef(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (isTimeAble && time > 0) {
        setTime(time - 1);
      }
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }
  }, [isTimeAble, time]);

  const blinkClass = time <= 5 && time > 0 ? 'blink' : '';

  return (
    <svg width="80" height="80" className={blinkClass}>
      <circle 
        cx="40" 
        cy="40" 
        r="35" 
        stroke="red" 
        strokeWidth="2" 
        fill="transparent" 
      />
      <text x="40" y="45" textAnchor="middle" fontSize="20" fontWeight="bold">
        {time.toString().padStart(2, '0')}
      </text>
    </svg>
  );
}

export default Timer;
