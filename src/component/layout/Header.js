import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import
import styles from './Header.module.scss';
import dowadreamIcon from '../icon/dowadreamlogo.png'; // 이미지를 import
import { useAuth } from '../login/AuthContext';
import { useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate(); // useNavigate 훅 사용
  const { loggedIn } = useAuth();
  // 로그인 클릭 시 호출되는 함수
  const handleLoginClick = () => {
    if(!loggedIn) {
        navigate('/loginPage');
    }
    else {
        sessionStorage.removeItem("jwtToken");
        sessionStorage.removeItem("myRole");
        window.location.replace("/");
    }
  };
  const handleLogoClick = () => {
    navigate('/indexPage');
  }
  useEffect(() => {
   
}, []);

  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo}>
          <img 
            src={dowadreamIcon} 
            alt="DoWaDream Logo" 
            className={styles.iconImage} 
            style={{ width: "60px", height: "auto", marginLeft: "10px" }} 
            onClick={handleLogoClick}
          />
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>도와주세요</li>
            <li>도와줄게요</li>
            <li>해드릴게요</li>
            <li>고객센터</li>
          </ul>
        </nav>

        <div className={styles.profile}>
          <span onClick={handleLoginClick} style={{ cursor: 'pointer' }}>
            {loggedIn ? '로그아웃' : '로그인'}
          </span>
          <div className={styles.profileIcon}></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
