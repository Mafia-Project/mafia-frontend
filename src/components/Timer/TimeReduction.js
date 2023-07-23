import { Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { timeReductionApi } from '../../public/api/axios';
import indexStore from '../../store/Store';
import { observer } from 'mobx-react';

const TimeReduction = observer((props)=> {
    const { id } = props;
    const { myInfoStore,  gameRoomInfoStore } = indexStore();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const onClickTimeReductionHandler = (e) => {
        timeReductionApi(id, myInfoStore.nickname, gameRoomInfoStore.time);
    }

    useEffect(() => {
      setIsButtonDisabled(!myInfoStore.alive);
    }, [myInfoStore.alive]);

    return (
        <div>
            <Button id="reductionTimeBtn" variant="outlined" size="large" onClick={(e) => onClickTimeReductionHandler(e)} disabled={isButtonDisabled}>
                시간단축
            </Button>
        </div>
    )
});

export default TimeReduction
