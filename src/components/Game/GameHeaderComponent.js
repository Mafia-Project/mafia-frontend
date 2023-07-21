import React from 'react';
import Timer from '../Timer/Timer';
import GoBackComponent from './GoBackComponent';
import RoomCodeComponent from './RoomCodeComponent';

const GameHeaderComponent = (props) => {
    console.log(props.id);
    return (
        <div>
            <GoBackComponent id={props.id} host={props.host}/>
            <Timer/>
            <RoomCodeComponent id={props.id}/>
        </div>
    );
};

export default GameHeaderComponent;