import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import dowadreamIcon from '../icon/dowadreamlogo.png';
import { useAuth } from '../login/AuthContext';

const Header = () => {
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  const handleLoginClick = () => {
    if(!loggedIn) {
      navigate('/loginPage');
    } else {
      sessionStorage.removeItem("jwtToken");
      sessionStorage.removeItem("myRole");
      window.location.replace("/");
    }
  };

  const handleLogoClick = () => {
    navigate('/indexPage');
  }

  const handleNavClick = (path) => {
    navigate(path);
  }

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
            <li onClick={() => handleNavClick('/errand-insert')}>도와주세요</li>
            <li onClick={() => handleNavClick('/errand-list')}>도와줄게요</li>
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