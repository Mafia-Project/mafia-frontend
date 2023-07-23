import { Button } from '@mui/material';
import React, { useState } from 'react';
import { gameStartApi } from '../../public/api/axios';

const GameStart = (props) => {
    const {id, host} = props;

    const isHostActive = host === 'true';   //값이 boolean형으로 인식이 안되서 이렇게..

    const [buttonClicked, setButtonClicked] = useState(false);

    //console.log('방장이냐', host);
    const onClickGameStart = () => {
      if (!buttonClicked) {
        gameStartApi(id);
        setButtonClicked(true);
      }
    };
  
    return (
      <div>
        {console.log('방장이냐', host)}
        <Button variant="outlined" size="large" onClick={() => onClickGameStart()} disabled={!isHostActive || buttonClicked}>
          게임 시작
        </Button>
      </div>
    );
  };

export default GameStart;