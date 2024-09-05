import React from 'react';
import styles from './CategoryFilter.module.css';

const categories = ['집안일', '배달', '작업', '펫케어', '이사', '공부', '아르바이트', '기타'];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.categoryFilter}>
      {categories.map(category => (
        <button
          key={category}
          className={`${styles.categoryButton} ${selectedCategory === category ? styles.active : ''}`}
          onClick={() => onCategoryChange(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;