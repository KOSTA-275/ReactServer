import React from 'react';
import styles from './Header.module.scss';
import dowadreamIcon from '../icon/dowadreamlogo.png'; // 이미지를 import

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo}>
          <img src={dowadreamIcon} alt="DoWaDream Logo" className={styles.iconImage} style={{width: "60px", height: "auto", marginLeft: "10px"}}  />
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
          <span>로그인</span>
          <div className={styles.profileIcon}></div>
        </div>
      </div>
    </header>
  );
}

export default Header;
