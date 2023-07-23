import { Box, Container } from '@mui/material';
import React from 'react'
import GamePlayer from './GamePlayer';
import indexStore from '../../store/Store';
import Job from '../../public/common/Job';

function GameJobInfoList(props) {
    const { onClickJobThumnailHandler } = props;
    const { gameRoomInfoStore } = indexStore();

    return (
        <Container maxWidth="xs" sx={{ minWidth: '750px' }}>
            <Box sx={{ width: 1 }}>
                <Box display="grid" gridTemplateColumns="repeat(15, 1fr)" gap={3}>
                    {
                        Job.map((job) =>
                            <Box gridColumn="span 3" key={job.job}
                                onClick={() => onClickJobThumnailHandler(job.job)}>
                                <GamePlayer
                                    nickname={job.jobName}
                                    job={job.job}
                                    killed={false}
                                    host={false}
                                    dateNight={gameRoomInfoStore.dayNight}
                                    image={job.image}
                                    isOpen={true}
                                />
                            </Box>
                        )
                    }
                </Box>
            </Box>
        </Container>
    )
}

export default GameJobInfoList
