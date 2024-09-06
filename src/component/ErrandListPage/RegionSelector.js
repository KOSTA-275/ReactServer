import React from 'react';
import styles from './RegionSelector.module.css';

const regions = ['전국', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', 
                 '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

const RegionSelector = ({ selectedRegion, onRegionChange }) => {
  return (
    <div className={styles.regionSelector}>
      {regions.map((region) => (
        <button
          key={region}
          className={`${styles.regionButton} ${selectedRegion === region ? styles.active : ''}`}
          onClick={() => onRegionChange(region)}
        >
          {region}
        </button>
      ))}
    </div>
  );
};

export default RegionSelector;