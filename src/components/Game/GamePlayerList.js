import { Box, Container } from '@mui/material'
import React from 'react'
import indexStore from '../../store/Store';
import GamePlayer from './GamePlayer';
import { observer } from 'mobx-react-lite';
import { gameJobEventApi, voteApi } from '../../public/api/axios';
import Job from '../../public/common/Job';
import citizen from '../../public/image/citizen.PNG';

const GamePlayerList = observer(({ id }) => (
    <Container maxWidth="xs" sx={{ minWidth: '750px' }}>
        <Box sx={{ width: 1 }}>
            <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={3}>
                {
                    indexStore().usersStore.sortedUsers.map((user) =>
                        <Box gridColumn="span 3" key={user.nickname}
                            onClick={() => onClickGameEvent(
                                id,
                                indexStore().myInfoStore.nickname,
                                indexStore().myInfoStore.job,
                                indexStore().myInfoStore.alive,
                                user,
                                indexStore().gameRoomInfoStore.dayNight,
                                indexStore().gameRoomInfoStore.voteAble,
                                indexStore().gameRoomInfoStore.abilityAble,
                                indexStore
                            )}>
                            <GamePlayer
                                nickname={user.nickname}
                                job={user.job}
                                killed={user.killed}
                                host={user.host}
                                voteNum={indexStore().voteStore.findVoteNumByNickname(user.nickname)}
                                dateNight={indexStore().gameRoomInfoStore.dayNight}
                                image={Job.find(job => job.job === user.job) ? Job.find(job => job.job === user.job).image : citizen }
                                isOpen={user.isOpen}
                            />
                        </Box>
                    )
                }
            </Box>
        </Box>
    </Container>
));

const onClickGameEvent = (id, voterNickname, voterJob, voterAlive, target, dateNight, voteAble, abilityAble, indexStore) => {
    if (target.killed || !voterAlive ) return;
    if(dateNight === 'afternoon' && voteAble) voteApi(id, voterNickname, target.nickname);
    if(dateNight === 'night' && abilityAble ) {
        gameJobEventApi(id, voterNickname, target.nickname, voterJob);
        indexStore().gameRoomInfoStore.setAbilityAble(false);
        if(voterJob === 'REPORTER'){
            indexStore().myInfoStore.setJob('CITIZEN');
        }
    }
}
export default GamePlayerList
