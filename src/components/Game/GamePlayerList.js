import { Box, Container } from '@mui/material'
import React from 'react'
import indexStore from '../../store/Store';
import GamePlayer from './GamePlayer';
import { observer } from 'mobx-react-lite';
import { gameJobEventApi, voteApi } from '../../public/api/axios';

const GamePlayerList = observer(({ id }) => (
    <Container maxWidth="xs" sx={{ minWidth: '750px' }}>
        <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={3}>
                {
                    indexStore().usersStore.sortedUsers.map((user) =>
                        <Box gridColumn="span 3" key={user.nickname}
                            onClick={() => onClickGameEvent(
                                id,
                                indexStore().usersStore.findAliveByNickname(indexStore().nickNameStore.nickname),
                                user,
                                indexStore().gameRoomInfoStore.dayNight
                            )}>
                            <GamePlayer
                                id={id}
                                nickname={user.nickname}
                                job={user.job}
                                killed={user.killed}
                                host={user.host}
                                voteNum={indexStore().voteStore.findVoteNumByNickname(user.nickname)}
                                dateNight={indexStore().gameRoomInfoStore.dayNight}
                            />
                        </Box>
                    )
                }
            </Box>
        </Box>
    </Container>
));

const onClickGameEvent = (id, user, target, dateNight) => {
    if (target.killed || user.killed ) return;
    if(dateNight === 'afternoon') voteApi(id, user.nickname, target.nickname);
    if(dateNight === 'night' && user.nickname !== target.nickname) gameJobEventApi(id, user.nickname, target.nickname, user.job);
}
export default GamePlayerList
