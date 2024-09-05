import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import styles from './LoginForm.module.scss';

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const userEmailInputRef = useRef(null);

  const navigate = useNavigate();
  const { toggleLogin } = useAuth();
  const { toggleRole } = useAuth();

  const handleSocialLogin = (provider) => {
    window.location.href = `http://localhost:8089/login/${provider}`;
  };

  const handleLoginFormSubmit = async (e) => {
    e.preventDefault();
    console.log('폼 제출됨', { userEmail, userPw });
  
    if (userEmail.trim() === '') {
      alert('메일주소를 입력해주세요.');
      userEmailInputRef.current.focus();
      return false;
    }
    // 첫 번째 요청
        axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/users/login', {
        email: userEmail,
        password: userPw
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
  .then((res) => {
    console.log('가져옴:', res);

    // res가 유효한지 확인 (예: res.status === 200, 데이터가 있는지 확인 등)
    if (res.status === 200 && res.data) {
      // res가 유효하면 두 번째 요청 실행
      toggleRole(res.data.role);
      return axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/jwt/login_success', {
          userEmail: res.data.email,
          role: res.data.role
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });
    } else {
      throw new Error('첫 번째 요청에서 유효한 데이터를 가져오지 못했습니다.');
    }
  })
  .then((secondRes) => {
    // 두 번째 요청이 성공적으로 완료된 경우 처리
    console.log('두 번째 요청에서 가져옴:', secondRes);
    // res가 유효한지 확인 (예: res.status === 200, 데이터가 있는지 확인 등)
    if (secondRes.status === 200 && secondRes.data) {
        setUserEmail('');
        setUserPw('');
        navigate('/');
        sessionStorage.setItem("jwtToken",secondRes.data);
        toggleLogin(true);
    } else {
      throw new Error('두 번째 요청에서 유효한 데이터를 가져오지 못했습니다.');
    }
  })
  .catch((err) => {
    console.log('에러 발생:', err);
  });
}
  return (
    <div className={styles.loginContainer}>
      <div className={styles.loginFormWrapper}>
        <h1 className={styles.title}>도와드림 로그인</h1>
        
        <div className={styles.socialLogin}>
          <button onClick={() => handleSocialLogin('GOOGLE')} className={styles.socialButton}>
            <img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/logo/Google.png" alt="google" />
            Google로 로그인
          </button>
          <button onClick={() => handleSocialLogin('KAKAO')} className={styles.socialButton}>
            <img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Kakao.png" alt="kakao" />
            Kakao로 로그인
          </button>
          <button onClick={() => handleSocialLogin('NAVER')} className={styles.socialButton}>
            <img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Naver.png" alt="naver" />
            Naver로 로그인
          </button>
        </div>

        <p className={styles.divider}>또는 이메일로 로그인</p>

        <form onSubmit={handleLoginFormSubmit} className={styles.loginForm}>
          <div className={styles.inputGroup}>
            <input
              name="userEmail"
              id="userEmail"
              type="email"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
              ref={userEmailInputRef}
              required
            />
            <label htmlFor="userEmail">이메일</label>
          </div>
          <div className={styles.inputGroup}>
            <input
              name="userPw"
              id="userPw"
              type="password"
              value={userPw}
              onChange={(e) => setUserPw(e.target.value)}
              required
            />
            <label htmlFor="userPw">비밀번호</label>
          </div>
          <button type="submit" className={styles.submitButton}>로그인</button>
        </form>

        <p className={styles.signupPrompt}>
          아직 회원이 아니신가요?
          <Link to="/join_page" className={styles.signupLink}>회원가입</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
