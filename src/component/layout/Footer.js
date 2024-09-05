import React from 'react';
import styles from './Footer.module.scss';
import dowadreamIcon from '../icon/dowadreamlogo.png'; // 이미지를 import
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

const Footer = () => {
  const navigate = useNavigate(); // useNavigate 훅 사용
  const handleNotifiClick = () => {
    navigate('/Notification');
  };
  const handleFaqClick = () => {
    navigate('/FaqPage');
  };
  const handleInqClick = () => {
    navigate('/InquiryPage');
  };
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <div className={styles.leftSection}>
          <div className={styles.socialIcons}>
            <a href="/login/GOOGLE">
              <img 
                src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/logo/Google.png" 
                style={{border: "1px solid #bbbbbb", borderRadius: "15%", width: "36px"}} 
                alt="Google Login"
              />
            </a>
            <a href="/login/KAKAO">
              <img 
                src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Kakao.png" 
                style={{width: "36px", height: "auto", marginLeft: "10px"}} 
                alt="Kakao Login"
              />
            </a>
            <a href="/login/NAVER">
              <img 
                src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Naver.png" 
                style={{width: "36px", height: "auto", marginLeft: "10px"}} 
                alt="Naver Login"
              />
            </a>
          </div>
          <div className={styles.companyName}>자바네명 고객센터</div>
          <span onClick={handleNotifiClick} style={{ cursor: 'pointer' }}>공지사항</span>
          <br></br>
          <div className={styles.links}>
          <span onClick={handleFaqClick} style={{ cursor: 'pointer' }}>자주 묻는 질문</span>
          <span onClick={handleInqClick} style={{ cursor: 'pointer' }}>문의 등록하기</span>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.companyInfo}>
            <p>지비 네밍타워(주) 대표이사 홍길동 | 사업자등록번호 236-0937-1001012 | 통신판매업신고번호 2021</p>
            <p>이메일 상담 one46055813@gmail.com | 유선 상담 010-4605-5813</p>
            <p>일부 상품과 광고는 누산판매중개자이며 통신판매의 당사자가 아닙니다.</p>
          </div>
          <div className={styles.logo}>
          <img src={dowadreamIcon} alt="DoWaDream Logo" className={styles.iconImage} style={{width: "60px", height: "auto", marginLeft: "10px"}}  />
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
