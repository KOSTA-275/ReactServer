import React from 'react';
import styles from './YellowBox.module.scss';

const YellowBox = ({ title, imageSrc }) => {
  return (
    <div className={styles.yellowBox}>
      <h3 className={styles.title}>{title}</h3>
      <img src={imageSrc} alt={title} className={styles.image} />
    </div>
  );
};

export default YellowBox;