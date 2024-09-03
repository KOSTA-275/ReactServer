import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const RoleNotRoute = ({ children, redirectTo }) => {
  const { myRole } = useAuth();

  if (myRole != "ADMIN") {
    if (redirectTo) {
      return <Navigate to={redirectTo} />;
    } else {
      console.log("리디렉션 경로가 설정되지 않았습니다.");
    }
  } else {
    console.log("어드민이 아닙니다.");
  }

  return children; // 로그인되어 있으면 children을 렌더링
};

export default RoleNotRoute;
