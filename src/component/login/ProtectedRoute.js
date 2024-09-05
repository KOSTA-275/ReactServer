import React, { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const ProtectedRoute = ({ children }) => {
  const { loggedIn, checkAuth } = useAuth();
  const [authChecked, setAuthChecked] = useState(false);

  useEffect(() => {
    const verifyAuth = async () => {
      await checkAuth(); // 인증 확인 함수 호출
      setAuthChecked(true); // 인증 확인 완료
    };
    
    verifyAuth();
  }, [checkAuth]);

  if (!authChecked) {
    return <div>Loading...</div>; // 인증 확인 중 표시할 UI
  }

  if (!loggedIn) {
    alert('로그인이 필요합니다~!~!~');
    return <Navigate to="/indexPage" />;
  }

  return children;
};

export default ProtectedRoute;
