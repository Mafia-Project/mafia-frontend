import React from 'react';
import TimeReduction from '../Timer/TimeReduction';
import GameStart from './GameStart';

const GameFooterComponent = () => {
    return (
        <div>
            <TimeReduction/>
            <GameStart />
        </div>
    );
};

export default GameFooterComponent;