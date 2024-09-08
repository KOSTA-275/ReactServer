import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  
import { useAuth } from './AuthContext';
import styles from './JoinOauthForm.module.scss';

const JoinOauthForm = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const etoken = searchParams.get('etoken');

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName] = useState('');
  const userNameInputRef = useRef(null);
  const navigate = useNavigate();                 
  const { loggedIn, toggleLogin } = useAuth();

  useEffect(() => {
    console.log("etoken: " + etoken);
    axios.get(`http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/user/verifyToken?etoken=${etoken}`,  { withCredentials: true })
      .then(response => {
        setUserEmail(response.data.email);
      })
      .catch(error => {
        console.error("Failed to fetch user email", error);
        alert("회원 인증에 문제가 발생했습니다. 다시 시도하세요.");
        navigate('/join_page');
      });
  }, [etoken]);

  const myJoinFormSubmit = async (e) => {
    e.preventDefault();
    
    if (userName.trim() === '') {
      alert('이름을 입력해주세요.');
      userNameInputRef.current.focus();
      return false;
    }

    const formData = new FormData();
    formData.append('userEmail', userEmail);
    formData.append('userName', userName);

    const res = await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/user/oauth_join_process', formData, { withCredentials: true });
    console.log('FORM 전송:', { userEmail, userName });
    console.log(res.status);
    setUserName('');
    toggleLogin(false);
    navigate('/');
  };

  return (
    <div className={styles.container}>
      <video autoPlay muted loop className={styles.videoBackground}>
        <source src="/main-movie.mp4" type="video/mp4" />
      </video>

      <div className={styles.formContainer}>
        <div className={styles.formWrapper}>
          <Link to="/" className="nav-link">
            <h1 className={styles.title}>소셜 회원 가입</h1>
          </Link>

          <form onSubmit={myJoinFormSubmit}>
            <div className={styles.formGroup}>
              <input 
                type="email" 
                placeholder="이메일" 
                value={userEmail} 
                readOnly 
                className={styles.input}
              />
              <label className={styles.label}>Email</label>
            </div>

            <div className={styles.formGroup}>
              <input 
                type="text" 
                placeholder="이름" 
                value={userName} 
                onChange={(e) => setUserName(e.target.value)} 
                ref={userNameInputRef}
                className={styles.input}
              />
              <label className={styles.label}>Username</label>
            </div>

            <button type="submit" className={styles.button}>
              회원가입
            </button>
          </form>

          <p className={styles.signInPrompt}>
            기존 회원이신가요? 
            <Link to="/loginPage" className="nav-link">
              <span className={styles.link}>로그인</span>
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default JoinOauthForm;
