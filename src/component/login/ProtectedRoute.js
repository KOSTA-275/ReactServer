import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();

  if (!loggedIn) {
    alert('로그인이 필요합니다~!~!~');
    return <Navigate to="/indexPage" />; // 로그인되지 않았으면 로그인 페이지로 리다이렉트
  }

  return children; // 로그인되어 있으면 children을 렌더링
};

export default ProtectedRoute;
