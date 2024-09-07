import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from "./layout/Layout";
import CategorySelector from './ErrandInsertPage/CategorySelector';
import ErrandForm from './ErrandInsertPage/ErrandForm';
import styles from './ErrandInsertPage/ErrandInsertPage.module.css';
import { useAuth } from './login/AuthContext';

const ErrandInsertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/loginPage');
    } else {
      const fetchUserData = async () => {
        try {
          const token = sessionStorage.getItem('jwtToken');
          const response = await axios.post(
            'http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/users/userSelectEmail',
            null,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );
          console.log('User data response:', response.data);
        } catch (error) {
          console.error('Error fetching user data:', error.response ? error.response.data : error.message);
        }
      };
  
      fetchUserData();
    }
  }, [loggedIn, navigate]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleErrandSubmit = async (errandData) => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      
      const dataWithRequesterInfo = { 
        ...errandData, 
        requesterSeq: 777,
        requesterNickname: "테스트요청자"
      };

      const response = await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands', 
        dataWithRequesterInfo,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('심부름이 생성되었습니다:', response.data);
      navigate('/');
    } catch (error) {
      console.error('심부름 생성 중 오류 발생:', error);
      setError('심부름 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  if (!loggedIn) {
    return null;
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>어떤 일을 해주셨으면 하나요?</h1>
        <CategorySelector onSelect={handleCategorySelect} />
        {selectedCategory && (
          <div className={styles.formContainer}>
            <ErrandForm category={selectedCategory} onSubmit={handleErrandSubmit} />
          </div>
        )}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Layout>
  );
};

export default ErrandInsertPage;