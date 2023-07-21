import React from 'react';
import Timer from '../Timer/Timer';

const GameHeaderComponent = (props) => {
    const { id } = props;
    return (
        <div>
            <Timer id={id}/>
        </div>
    );
};

export default GameHeaderComponent;