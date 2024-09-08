import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import JoinForm from './login/JoinForm';

const Join = () => {

  return (
    <div className="d-flex">
      {/* 중앙 : 컨텐츠 */}
        <JoinForm />
    </div>
  );
};

export default Join; 