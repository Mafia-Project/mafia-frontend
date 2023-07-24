import { Button } from '@mui/material';
import React, {useEffect, useState} from 'react';
import { timeReductionApi } from '../../public/api/axios';
import indexStore from '../../store/Store';
import { observer } from 'mobx-react';

const TimeReduction = observer((props)=> {
    const { id } = props;
    const { myInfoStore,  gameRoomInfoStore, timeReductionStore } = indexStore();
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    // 버튼 클릭 여부 상태를 저장하기 위한 useState 훅 사용
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    useEffect(()=> {
        if(gameRoomInfoStore.dayNight === 'afternoon') {
            setIsButtonClicked(false);
        }
    }, [timeReductionStore.flag]) 

    const onClickTimeReductionHandler = (e) => {
        if (!isButtonClicked) { // 버튼이 클릭되지 않은 경우에만 API 요청 수행
            timeReductionApi(id, myInfoStore.nickname, gameRoomInfoStore.time);
            setIsButtonClicked(true); // 버튼을 클릭 상태로 변경
        }
    }

    useEffect(() => {
      setIsButtonDisabled(!myInfoStore.alive);
    }, [myInfoStore.alive]);

    return (
        <div>
            <Button id="reductionTimeBtn" variant="outlined" size="large" style={{background: 'white' }} onClick={(e) => onClickTimeReductionHandler(e)} disabled={timeReductionStore.getFlag() || isButtonClicked || isButtonDisabled}>
                시간단축
            </Button>
        </div>
    )
});

export default TimeReduction
