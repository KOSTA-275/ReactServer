import styles from './Footer.module.scss'

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.contents}>
        <h2 className={styles.title}>
          Do what you love
        </h2>
      </div>
    </footer>
  )
}

export default Footer