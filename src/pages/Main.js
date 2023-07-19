import React, { Component } from 'react'
import CreateRoomBtnComponent from '../components/CreateRoomBtnComponent';
import MainLabelComponent from '../components/MainLabelComponent';
import ParticipantRoomBtnComponent from '../components/ParticipantRoomBtnComponent';

class Main extends Component {
  constructor(props){
    super(props);
    this.state = {nickname:""};
  };

  handleInputChange = (event) => {
    this.setState({ nickname: event.target.value });
  }

  render() {
    return (
      <div>
        <MainLabelComponent/>
        <label>닉네임 : </label>
        <input type='text' onChange={this.handleInputChange}/>
        <CreateRoomBtnComponent nickname={this.state.nickname} />
        <ParticipantRoomBtnComponent nickname={this.state.nickname} />
      </div>
    )
  }
}

export default Main;
