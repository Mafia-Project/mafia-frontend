import React from 'react'
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function RoomCodeComponent(props) {
    const copyToClipboard = ()=>{
      navigator.clipboard.writeText(
        `마피아 게임에 참여하세요!\n방코드 : ${props.id}\nURL : http://localhost:3000/`)
        .then(() =>toast.success('초대 링크가 클립보드에 복사되었습니다.'))
        .catch((error) => {
          console.error('클립보드 복사 실패:', error);
        });
    }
    return (
    <div onClick={copyToClipboard} className='roomCodeComponent'>
      <h1>{props.id}</h1>
      <span>방 코드 복사</span>
      <ToastContainer position="top-center" autoClose={1000}/>
    </div>
  )
}
