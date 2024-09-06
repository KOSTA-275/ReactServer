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
      <select
        value={selectedCategory}
        onChange={(e) => onCategoryChange(e.target.value)}
        className={styles.categorySelect}
      >
        {categories.map(category => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategoryFilter;