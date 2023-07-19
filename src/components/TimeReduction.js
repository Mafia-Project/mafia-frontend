import { Button } from '@mui/material';
import React from 'react';
import axios from 'axios';

function TimeReduction(props) {
    const { id, nickname, time } = props;

    const onClickTimeReductionHandler = (e) => {
        axios.post(`http://localhost:8080/api/v1/rooms/${id}/games/time-reduction`, {
            nickname,
            time
        })
        .catch(error => {
            console.error(error);
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
