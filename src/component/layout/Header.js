import styles from './Header.module.scss'

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.contents}>
        <div className={styles.logo}>
          <span className={styles.icon}>🚗</span>
          <span className={styles.text}>헤쳐세요</span>
        </div>

        <nav className={styles.navigation}>
          <ul>
            <li>도와주세요</li>
            <li>도와줄게요</li>
            <li>헤드헌터</li>
            <li>고객센터</li>
          </ul>
        </nav>

        <div className={styles.profile}>
          <span>로그인</span>
          <div className={styles.profileIcon}></div>
        </div>
      </div>
    </header>
  )
}

export default Header