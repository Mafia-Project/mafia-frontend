import { Button } from '@mui/material'
import React from 'react'

function TimeReduction(props) {
    const { id, nickname, time } = props;

    const onClickTimeReductionHandler = (e) => {
        fetch(`http://localhost:8080/api/v1/rooms/${id}/games/time-reduction`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nickname,
                time
            }),
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }

    return (
        <div>
            <Button variant="outlined" size="large" onClick={(e) => onClickTimeReductionHandler(e)}>
                시간단축
            </Button>
        </div>
    )
}

export default TimeReduction
