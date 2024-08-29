import React from 'react';
import styles from './CharacterGallery.module.scss';

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
  const characters = [
    { imageUrl: require("../image/BannerList/1.png"), name: "삼무유어", description: "삼무 세트" },
    { imageUrl: require("../image/BannerList/2.png"), name: "삼무용사", description: "삼무 세트" },
    { imageUrl: require("../image/BannerList/3.png"), name: "삼무헌터", description: "삼무 세트" },
    { imageUrl: null, name: "", description: "" }
  ];

  return (
    <div className={styles['character-gallery']}>
      <h2>도화중개소</h2>
      <div className={styles['character-list']}>
        {characters.map((character, index) => (
          <CharacterCard key={index} {...character} />
        ))}
      </div>
    </div>
  );
};

export default CharacterGallery;
