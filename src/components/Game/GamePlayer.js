import { Box, Typography } from '@mui/material';
import React from 'react';
import { voteApi } from '../../public/api/axios';
import GameVote from './GameVote';
import GamePlayerComponent from './GamePlayerComponent';

function GamePlayer(props) {
    const { id, voter, nickname, job, killed, voteAble, voteNum, alive } = props;

    const onClickVoteHander = () => {
        if (!voteAble || killed || alive) return;
        voteApi(id, voter, nickname);
    }

    return (
        <>
            <Box
                onClick={() => onClickVoteHander()}
            >
                <GamePlayerComponent 
                    nickname={nickname}
                    job={job}
                    killed={killed}
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
