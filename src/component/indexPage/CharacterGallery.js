import React from 'react';
import styles from './CharacterGallery.module.scss';

// 이미지 파일 import
import image1 from '../image/BannerList/1.png';
import image2 from '../image/BannerList/2.png';
import image3 from '../image/BannerList/3.png';

const CharacterCard = ({ imageUrl, name, description }) => (
  <div className={styles['character-card']}>
    <div className={styles['character-image']}>
      {imageUrl ? (
        <img src={imageUrl} alt={name} />
      ) : (
        <div className={styles['no-image']}>No Image</div>
      )}
    </div>
    <div className={styles['character-info']}>
      <h3>{name || '이름 없음'}</h3>
      <p>{description || '설명 없음'}</p>
    </div>
  </div>
);

const CharacterGallery = () => {
  const handleTextClick = () => {
    console.log("텍스트 클릭됨");
  };

  const characters = [
    { imageUrl: image1, name: "삼무유어", description: "삼무 세트" },
    { imageUrl: image2, name: "삼무용사", description: "삼무 세트" },
    { imageUrl: image3, name: "삼무헌터", description: "삼무 세트" },
    { imageUrl: null, name: "", description: "" }
  ];

  return (
    <div className={styles['character-gallery']}>
      <h2>
        <span onClick={handleTextClick} className={styles['clickable-text']}>
          도와줄게요
        </span>
      </h2>
      <div className={styles['character-list']}>
        {characters.map((character, index) => (
          <CharacterCard key={index} {...character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterGallery;
