import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <div className={styles.leftSection}>
          <div className={styles.socialIcons}>
            <span className={styles.icon}>K</span>
            <span className={styles.icon}>G</span>
            <span className={styles.icon}>N</span>
          </div>
          <div className={styles.companyName}>자비냄비 고객센터</div>
          <div className={styles.publicNotice}>공지사항</div>
          <div className={styles.links}>
            <a href="#">채용 상담하기 &gt;</a>
            <a href="#">문의 등록하기 &gt;</a>
          </div>
        </div>
        <div className={styles.rightSection}>
          <div className={styles.companyInfo}>
            <p>지비 네밍타워(주) 대표이사 홍길동 | 사업자등록번호 236-0937-1001012 | 통신판매업신고번호 2021</p>
            <p>이메일 상담 one46055813@gmail.com | 유선 상담 010-4605-5813</p>
            <p>일부 상품과 광고는 누산판매중개자이며 통신판매의 당사자가 아닙니다.</p>
          </div>
          <div className={styles.logo}>
            <span className={styles.icon}>🚗</span>
            <span className={styles.text}>헤쳐세요</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer