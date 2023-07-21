import { Box } from '@mui/material';
import React from 'react';
import GameVote from './GameVote';
import GamePlayerComponent from './GamePlayerComponent';

function GamePlayer(props) {
    const { nickname, job, killed, voteNum, host, dateNight, image } = props;
    console.log(image);
    return (
        <>
            <Box>
                <GamePlayerComponent 
                    nickname={nickname}
                    job={job}
                    killed={killed}
                    host={host}
                    image={image}
                />
            </Box>
            <Box
                sx={{
                    height: '45px',
                    overflowY: 'auto',
                    display: 'flex',
                    alignItems: 'center'
                }}
            >
                <GameVote voteNum={voteNum} />
            </Box>
        </>
    )
}

export default GamePlayer;
