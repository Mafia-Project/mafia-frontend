import { Button } from '@mui/material';
import React from 'react';
import { gameStartApi } from '../../public/api/axios';

const GameStart = (props) => {
    const {id, host} = props;

    const onClickGameStart = () => {
      gameStartApi(id);
    };
  
    return (
      <div>
        <Button variant="outlined" size="large" onClick={() => onClickGameStart()} style={{background: 'white' }}>
          게임 시작
        </Button>
      </div>
    );
  };

export default GameStart;