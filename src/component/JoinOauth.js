import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import JoinOauthForm from './login/JoinOauthForm';

const JoinOauth = () => {

  return (
    <div className="d-flex">
      {/* 중앙 : 컨텐츠 */}
        <JoinOauthForm />
    </div>
  );
};

export default JoinOauth; 