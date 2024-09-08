import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from './AuthContext';
import styles from './JoinForm.module.scss';

const JoinForm = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw] = useState('');
  const userEmailInputRef = useRef(null);

  const navigate = useNavigate();
  const { loggedIn, toggleLogin } = useAuth();

  const myJoinFormSubmit = async (e) => {
    e.preventDefault();
    if (userEmail.trim() === '') {
      alert('메일주소를 입력해주세요.');
      userEmailInputRef.current.focus();
      return false;
    }

    const formData = new FormData();
    formData.append('userEmail', userEmail);
    formData.append('userPw', userPw);
    formData.append('userName', userName);

    try {
      const res = await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/user/form_join_process', formData);
      if (res.status === 200) {
        setUserEmail('');
        setUserPw('');
        setUserName('');
        toggleLogin(false);
        navigate('/loginPage');
      } else {
        toggleLogin(false);
      }
    } catch (error) {
      toggleLogin(false);
      alert('회원가입에 실패했습니다. 다시 시도하세요');
      userEmailInputRef.current.focus();
      navigate('/join_page');
    }
  };

  return (
    <div className={styles['join-form-container']}>

      <div className={styles['form-wrapper']}>
        <div className={styles['form-header']}>
          <div className={styles['form-title']}>도와드림 회원가입</div>
        </div>
        
        <div className={styles['social-login']}>
          <a href="http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/user/login/GOOGLE">
            <img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/logo/Google.png" alt="google" />
          </a>
          <a href="http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/user/login/KAKAO">
            <img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Kakao.png" alt="kakao" />
          </a>
          <a href="http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/user/login/NAVER">
            <img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Naver.png" alt="naver" />
          </a>
        </div>

        <p className={styles['or-text']}>소셜계정으로 회원가입 하기</p>

        <form onSubmit={myJoinFormSubmit}>
          <div className={styles['input-group']}>
            <input
              name="userEmail"
              id="userEmail"
              type="email"
              placeholder="Email"
              onChange={(e) => setUserEmail(e.target.value)}
              ref={userEmailInputRef}
            />
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 1024 1024" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z" />
            </svg>
          </div>

          <div className={styles['input-group']}>
            <input
              name="userPw"
              id="userPw"
              type="password"
              placeholder="Password"
              onChange={(e) => setUserPw(e.target.value)}
            />
            <svg stroke="currentColor" fill="currentColor" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z" />
            </svg>
          </div>

          <div className={styles['input-group']}>
            <input
              name="userName"
              id="userName"
              type="text"
              placeholder="Username"
              onChange={(e) => setUserName(e.target.value)}
            />
            <svg stroke="currentColor" fill="none" viewBox="0 0 24 24" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" />
              <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12 16C14.309 16 16.4065 17.1812 17.6723 18.9878C16.1233 20.2459 14.1492 21 12 21Z" />
            </svg>
          </div>

          <button type="submit" className={styles['submit-button']}>회원가입</button>
        </form>

        <div className={styles['signup-prompt']}>
          <span>회원정보가 있으신가요?</span>
          <Link to="/loginPage" className={styles['signup-link']}>로그인 하러가기</Link>
        </div>
      </div>
    </div>
  );
};

export default JoinForm;
