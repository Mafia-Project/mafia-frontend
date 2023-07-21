import React from 'react';
import TimeReduction from '../Timer/TimeReduction';
import GameStart from './GameStart';

const GameFooterComponent = (props) => {
    const {id, host} = props;

    return (
        <div>
            <TimeReduction id={id}/>
            <GameStart id={id} host={host}/>
        </div>
    );
};

export default GameFooterComponent;