import React from 'react';
import styles from './CategoryFilter.module.css';

const categories = [
  { id: '', name: '전체' },
  { id: '21', name: '집안일' },
  { id: '22', name: '배달' },
  { id: '23', name: '작업' },
  { id: '24', name: '펫케어' },
  { id: '25', name: '이사' },
  { id: '26', name: '공부' },
  { id: '27', name: '아르바이트' },
  { id: '28', name: '기타' }
];

const CategoryFilter = ({ selectedCategory, onCategoryChange }) => {
  return (
    <div className={styles.categoryFilter}>
      {categories.map(category => (
        <button
          key={category.id}
          className={`${styles.categoryButton} ${selectedCategory === category.id ? styles.active : ''}`}
          onClick={() => onCategoryChange(category.id)}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;