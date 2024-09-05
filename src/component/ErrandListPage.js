import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout/Layout';
import { useAuth } from './login/AuthContext';
import RegionSelector from './ErrandListPage/RegionSelector';
import CategoryFilter from './ErrandListPage/CategoryFilter';
import ErrandCard from './ErrandListPage/ErrandCard';
import styles from './ErrandListPage/ErrandListPage.module.css';

const ErrandListPage = () => {
  const [errands, setErrands] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('전국');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loggedIn } = useAuth();

  useEffect(() => {
    fetchErrands();
  }, [selectedRegion, selectedCategory, currentPage]);

  const fetchErrands = async () => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      const response = await axios.get(`http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands/filter`, {
        params: {
          location: selectedRegion === '전국' ? '' : selectedRegion,
          categoryId: selectedCategory,
          page: currentPage - 1,
          size: 10
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setErrands(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('심부름 목록을 불러오는 중 오류 발생:', error);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div className={styles.errandListPage}>
        <h1 className={styles.title}>심부름 목록</h1>
        <RegionSelector selectedRegion={selectedRegion} onRegionChange={handleRegionChange} />
        <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />
        <div className={styles.errandList}>
          {errands.map(errand => (
            <ErrandCard key={errand.errandSeq} errand={errand} />
          ))}
        </div>
        <div className={styles.pagination}>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`${styles.pageButton} ${currentPage === page ? styles.active : ''}`}
              onClick={() => setCurrentPage(page)}
            >
              {page}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ErrandListPage;