import React from 'react';
import Timer from '../Timer/Timer';
import GoBackComponent from './GoBackComponent';
import RoomCodeComponent from './RoomCodeComponent';

const GameHeaderComponent = (props) => {
    console.log(props.id);

    return (
        <div className='headerComponents'>
            <div className='headerFirstSection'>
                <GoBackComponent id={props.id} host={props.host} />
                <Timer id={props.id} />
            </div>
            <div className='headerSecondSection'>
                <RoomCodeComponent id={props.id} />
            </div>
            <div>

            </div>
        </div>
    );
};

export default GameHeaderComponent;