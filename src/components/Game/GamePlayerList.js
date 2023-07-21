import { Box, Container, Grid } from '@mui/material'
import React from 'react'
import indexStore from '../../store/Store';
import GamePlayer from './GamePlayer';
import { observer } from 'mobx-react-lite';

const GamePlayerList = observer(({ id }) => (
    <Container maxWidth="xs" sx={{ minWidth: '750px' }}>
        <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={3}>
                {
                    indexStore().usersStore.sortedUsers.map((user) =>
                        <Box gridColumn="span 3" key={user.nickname}>
                            <GamePlayer
                                id={id}
                                voter={indexStore().nickNameStore.nickname}
                                nickname={user.nickname}
                                job={user.job}
                                killed={user.killed}
                                host={user.host}
                                voteNum={indexStore().voteStore.findVoteNumByNickname(user.nickname)}
                                alive={indexStore().usersStore.findAliveByNickname(indexStore().nickNameStore.nickname)}
                            />
                        </Box>
                    )
                }
            </Box>
        </Box>
    </Container>
));

export default GamePlayerList
