import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function OAuth2RedirectHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const error = searchParams.get('error');
    const token = searchParams.get('token');

    if (error) {
      console.error('OAuth 로그인 실패:', error);
      navigate('/login', { state: { error: error } });
    } else if (token) {
      console.log('OAuth 로그인 성공');
      localStorage.setItem('token', token);
      navigate('/profile');
    } else {
      console.error('토큰이 없습니다.');
      navigate('/login', { state: { error: '인증 토큰이 없습니다.' } });
    }
  }, [location, navigate]);

  return <div>처리 중...</div>;
}

export default OAuth2RedirectHandler;
