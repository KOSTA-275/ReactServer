import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './ErrandCard.module.css';

const ErrandCard = ({ errand }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/errand-detail/${errand.errandSeq}`);
  };

  return (
    <div className={styles.errandCard} onClick={handleClick}>
      <h3 className={styles.title}>{errand.title}</h3>
      <p className={styles.description}>{errand.description}</p>
      <div className={styles.details}>
        <span className={styles.price}>{errand.price}원</span>
        <span className={styles.location}>{errand.location}</span>
        <span className={styles.requester}>{errand.requesterNickname}</span>
      </div>
    </div>
  );
};

export default ErrandCard;