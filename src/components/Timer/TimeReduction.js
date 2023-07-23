import { Button } from '@mui/material';
import React from 'react';
import { timeReductionApi } from '../../public/api/axios';
import indexStore from '../../store/Store';

function TimeReduction(props) {
    const { id } = props;
    const { myInfoStore,  gameRoomInfoStore } = indexStore();

    const onClickTimeReductionHandler = (e) => {
        timeReductionApi(id, myInfoStore.nickname, gameRoomInfoStore.time);
    }

    return (
        <div>
            <Button variant="outlined" size="large" onClick={(e) => onClickTimeReductionHandler(e)} style={{background: 'white' }}>
                시간단축
            </Button>
        </div>
    )
}

export default TimeReduction
