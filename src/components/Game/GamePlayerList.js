import { Box, Container, Grid } from '@mui/material'
import React, { useState } from 'react'
import indexStore from '../../store/Store';
import GamePlayer from './GamePlayer';

function GamePlayerList(props) {
    const { id } = props;
    const [ voteAble, setVoteAble ] = useState(true);
    const { nickNameStore, usersStore, voteStore } = indexStore();
    
    return (
        <Container maxWidth="xs" sx={{ minWidth: '750px' }}>
            <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={3}>
                    {
                        usersStore.sortedUsers.map((user) =>
                            <Box gridColumn="span 3" key={user.nickname}>
                                <GamePlayer 
                                    id={id}
                                    voter={nickNameStore.nickname}
                                    nickname={user.nickname}
                                    job={user.job}
                                    killed={user.killed}
                                    voteNum={voteStore.findVoteNumByNickname(user.nickname)}
                                    voteAble={voteAble}
                                    alive={usersStore.findAliveByNickname(nickNameStore.nickname)}
                                />
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Container>
    )
}

export default GamePlayerList
