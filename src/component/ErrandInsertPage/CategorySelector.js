import React from 'react';
import styles from './CategorySelector.module.css';

// 이미지 파일 import
import image1 from '../image/CategoryList/1.png';
import image2 from '../image/CategoryList/2.png';
import image3 from '../image/CategoryList/3.png';
import image4 from '../image/CategoryList/4.png';
import image5 from '../image/CategoryList/5.png';
import image6 from '../image/CategoryList/6.png';
import image7 from '../image/CategoryList/7.png';
import image8 from '../image/CategoryList/8.png';

const categories = [
  { id: 1, name: '집안일', icon: image1 },
  { id: 2, name: '배달', icon: image2 },
  { id: 3, name: '작업', icon: image3 },
  { id: 4, name: '펫케어', icon: image4 },
  { id: 5, name: '이사', icon: image5 },
  { id: 6, name: '공부', icon: image6 },
  { id: 7, name: '아르바이트', icon: image7 },
  { id: 8, name: '기타', icon: image8 }
];

const CategoryItem = ({ category, onSelect }) => (
  <button
    className={styles.categoryItem}
    onClick={() => onSelect(category)}
  >
    <div className={styles.categoryImage}>
      {category.icon ? (
        <img src={category.icon} alt={category.name} />
      ) : (
        <div className={styles.noImage}>No Image</div>
      )}
    </div>
    <span>{category.name}</span>
  </button>
);

const CategorySelector = ({ onSelect }) => {
  return (
    <div className={styles.categoryGrid}>
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} onSelect={onSelect} />
      ))}
    </div>
  );
};

export default CategorySelector;