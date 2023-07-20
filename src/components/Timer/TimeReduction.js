import { Button } from '@mui/material';
import React from 'react';
import { timeReductionApi } from '../../public/api/axios';

function TimeReduction(props) {
    const { id, nickname, time } = props;

    const onClickTimeReductionHandler = (e) => {
        timeReductionApi(id, nickname, time);
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
