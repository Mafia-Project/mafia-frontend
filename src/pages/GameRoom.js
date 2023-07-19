import React from 'react';
import { useParams } from 'react-router-dom';
import TimeReduction from '../components/TimeReduction';
import { Client } from '@stomp/stompjs';
import Timer from '../components/Timer';

class GameRoom extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            time: 10,
            nickname: '정우진',
            isTimeAble: true,
            
        };

        this.client = new Client({
            brokerURL: 'ws://localhost:8080/connect',
            debug: function (str) {
                console.log(str);
            },
            reconnectDelay: 5000,
            heartbeatIncoming: 4000,
            heartbeatOutgoing: 4000,
        });
    }

    componentDidMount() {
        this.client.onConnect = (frame) => {
            this.client.subscribe(`/sub/rooms/${this.props.id}`, (message) => {
                if (message.body) {
                    const body = JSON.parse(message.body);

                    if (body.type === 'TIME_REDUCTION') {
                        this.onFetchStateTimeHandler(body.time);
                    }
                }
            });
        };
        this.client.activate();
    }

    componentWillUnmount() {
        this.client.deactivate();
    }

    onFetchStateTimeHandler = (time) => {
        this.setState({time : time})
    }

    render() {
        const { id } = this.props;
        const { time, nickname, isTimeAble } = this.state;

        return (
            <div>

                <TimeReduction 
                    id = {id}
                    nickname ={nickname}
                    time={time}
                />

                <Timer
                    isTimeAble={isTimeAble} 
                    time={time} 
                    setTime={this.onFetchStateTimeHandler}
                />
            </div>
        );
    }
}

function GameRoomWrapper() {
    const { id } = useParams();

    return <GameRoom id={id} />;
}

export default GameRoomWrapper;