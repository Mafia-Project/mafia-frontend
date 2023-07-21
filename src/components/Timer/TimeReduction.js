import { Button } from '@mui/material';
import React from 'react';
import { timeReductionApi } from '../../public/api/axios';
import indexStore from '../../store/Store';

function TimeReduction(props) {
    const { id } = props;
    const { nickNameStore,  gameRoomInfoStore } = indexStore();

    const onClickTimeReductionHandler = (e) => {
        timeReductionApi(id, nickNameStore.nickname, gameRoomInfoStore.time);
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
