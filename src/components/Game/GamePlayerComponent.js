import React from 'react'
import mafia from '../../public/image/mafia.PNG'
import citizen from '../../public/image/citizen.PNG'
import { Box, Typography } from '@mui/material'

function GamePlayerComponent(props) {
    const { nickname, job, killed } = props;

    return (
        <Box
            sx={{
                width: 100,
                height: 100,
                border: '2px solid black',
                flexDirection: 'column',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                position: 'relative',
                '&:hover': {
                    transform: 'scale(1.05)',
                },
            }}>
            <GamePlayerImage
                job={job}
                killed={killed}
            />
            <GamePlayerNickName nickname={nickname} />
            {killed && <GamePlayerOut />}
        </Box>
    )
}


function GamePlayerImage(props) {
    const { job, killed } = props;

    return (
        <Box
            component="img"
            src={citizen}
            alt="Mafia"
            sx={{
                height: '75%',
                width: '100%',
                objectFit: 'cover',
            }}
        />
    )
}

function GamePlayerNickName(props) {
    const { nickname } = props;

    return (
        <Box
            sx={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'transparent',
                borderTop: '2px solid black',
            }}
        >
            <Typography
                variant="body1"
                sx={{
                    color: 'black',
                    width: '100%',
                    textAlign: 'center',
                    fontWeight: 'bold',
                }}
            >
                {nickname}
            </Typography>
        </Box>
    )
}

function GamePlayerOut() {
    return (
        <>
            <Box
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
            >
                <Typography
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '5px',
                        backgroundColor: 'red',
                        transform: 'rotate(45deg)',
                        top: '50%',
                        left: '0',
                    }}
                />
                <Typography
                    sx={{
                        position: 'absolute',
                        width: '100%',
                        height: '5px',
                        backgroundColor: 'red',
                        transform: 'rotate(-45deg)',
                        top: '50%',
                        left: '0',
                    }}
                />
            </Box>
        </>

    )
}

export default GamePlayerComponent
