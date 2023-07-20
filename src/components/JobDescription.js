import React from 'react';

const JobDescription = ({job}) => {
  // 여기서 job 객체로부터 직업 이미지 URL과 설명을 가져온다고 가정합니다.
  const jobImageURL = process.env.PUBLIC_URL + '/mafia.png';
  const jobDescription = '직업 설명';

  return (
    <div className="job-description-container">
      <div className="job-image">
        <img src={jobImageURL} alt="직업 이미지" style={{ width: '200px', height: '200px' }} />
      </div>
      <div className="job-info">
        <h2>{job}</h2>
        <p>{jobDescription}</p>
      </div>
    </div>
  );
};

export default JobDescription;