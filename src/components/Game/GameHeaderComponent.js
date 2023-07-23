import React from 'react';
import Timer from '../Timer/Timer';
import GoBackComponent from './GoBackComponent';
import RoomCodeComponent from './RoomCodeComponent';

const GameHeaderComponent = (props) => {
    const {id, host, color} = props;

    return (
        <div className='headerComponents'>
            <div className='headerFirstSection'>
                <GoBackComponent />
                <Timer id={id} color={color} />
            </div>
            <div className='headerSecondSection'>
                <RoomCodeComponent id={id} color={color} />
            </div>
            <div>

            </div>
        </div>
    );
};

export default GameHeaderComponent;