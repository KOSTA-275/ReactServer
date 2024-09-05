import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../../api/api';
import styles from './css/Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const data = await loginUser(email, password);
      console.log('Login successful:', data);
      navigate('/');
    } catch (error) {
      setError('로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요.');
      console.error('Login error:', error);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>도워드림</h2>
        {error && <p className={styles.error}>{error}</p>}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해 주세요."
          className={styles.input}
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호를 입력해 주세요."
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          로그인
        </button>
        <div className={styles.findLinks}>
          <Link to="/findId" className={styles.findLink}>
            아이디 찾기
          </Link>
          <Link to="/passwordReset" className={styles.findLink}>
            비밀번호 찾기
          </Link>
        </div>
        <div className={styles.snsLogin}>
          <p>SNS 간편 로그인</p>
          <div className={styles.snsIcons}>
            <a
              href="http://localhost:8098/oauth2/authorization/google"
              className={styles.snsIcon}
            >
              Google
            </a>
            <a
              href="http://localhost:8098/oauth2/authorization/naver"
              className={styles.snsIcon}
            >
              Naver
            </a>
            <a
              href="http://localhost:8098/oauth2/authorization/kakao"
              className={styles.snsIcon}
            >
              Kakao
            </a>
          </div>
        </div>
        <div className={styles.links}>
          <Link to="/signup" className={styles.link}>
            회원가입
          </Link>
          <Link to="/" className={styles.link}>
            홈으로 돌아가기
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
