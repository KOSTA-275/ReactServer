import React from 'react';
import styles from './CategorySelector.module.css';

const categories = [
  { id: 1, name: '청소해주기', icon: '🧹' },
  { id: 2, name: '배달해주기', icon: '🛵' },
  { id: 3, name: '물건사주기', icon: '🛒' },
  { id: 4, name: '서류업무', icon: '📄' },
  { id: 5, name: '줄서주기', icon: '🧍' },
  { id: 6, name: '돌봐주기', icon: '👥' },
  { id: 7, name: '수리해주기', icon: '🔧' },
  { id: 8, name: '이사돕기', icon: '📦' }
];

const CategorySelector = ({ onSelect }) => {
  return (
    <div className={styles.categoryGrid}>
      {categories.map(category => (
        <button
          key={category.id}
          className={styles.categoryItem}
          onClick={() => onSelect(category)}
        >
          <span className={styles.icon}>{category.icon}</span>
          <span>{category.name}</span>
        </button>
      ))}
    </div>
  );
};

export default CategorySelector;