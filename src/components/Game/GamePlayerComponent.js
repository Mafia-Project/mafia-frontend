import React from 'react'
import { Box, Typography } from '@mui/material'

function GamePlayerComponent(props) {
    const { nickname, job, killed, host, image } = props;

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
                image={image}
            />
            <GamePlayerNickName nickname={nickname} host={host} />
            {killed && <GamePlayerOut />}
        </Box>
    )
}


function GamePlayerImage(props) {
    const { job, killed, image } = props;

    return (
        <Box
            component="img"
            src={image}
            alt="image"
            sx={{
                height: '75%',
                width: '100%',
                objectFit: 'cover',
            }}
        />
    )
}

function GamePlayerNickName(props) {
    const { nickname, host } = props;
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
                {host ? `👑 ${nickname}` : nickname}
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
