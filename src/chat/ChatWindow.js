import React from 'react';
import CitizenChatComponent from './CitizenChatComponent';

const ChatWindow = ({ job, dayNight }) => {
  console.log(1, job, dayNight);

  return (
    <div>
    <CitizenChatComponent job={job} dayNight={dayNight} />
    </div>
  );
};

export default ChatWindow;