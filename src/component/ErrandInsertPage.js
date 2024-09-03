import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from "./layout/Layout";
import styles from './ErrandInsertPage/ErrandInsertPage.module.css';

const CategorySelector = ({ categories, onSelect }) => {
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

const ErrandForm = ({ category, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    estimatedTime: '',
    deadline: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, categoryId: category.id });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        type="text"
        name="title"
        placeholder="제목"
        value={formData.title}
        onChange={handleChange}
        className={styles.input}
      />
      <textarea
        name="description"
        placeholder="상세 내용을 입력해주세요"
        value={formData.description}
        onChange={handleChange}
        className={styles.textarea}
      />
      <input
        type="text"
        name="location"
        placeholder="위치를 입력해주세요"
        value={formData.location}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="number"
        name="price"
        placeholder="금액을 입력해주세요"
        value={formData.price}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="number"
        name="estimatedTime"
        placeholder="예상 소요 시간 (분)"
        value={formData.estimatedTime}
        onChange={handleChange}
        className={styles.input}
      />
      <input
        type="datetime-local"
        name="deadline"
        value={formData.deadline}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.submitButton}>심부름 요청하기</button>
    </form>
  );
};

const ErrandInsertPage = () => {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const response = await axios.get('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/categories', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        setCategories(response.data);
        setLoading(false);
      } catch (err) {
        console.error('카테고리 로딩 중 오류 발생:', err);
        setError(err);
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleErrandSubmit = async (errandData) => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      const response = await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands', errandData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      console.log('심부름이 생성되었습니다:', response.data);
      navigate('/'); // 심부름 생성 후 홈페이지로 이동
    } catch (error) {
      console.error('심부름 생성 중 오류 발생:', error);
      // 에러 처리 로직 (예: 사용자에게 에러 메시지 표시)
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>어떤 일을 해주셨으면 하나요?</h1>
        <CategorySelector categories={categories} onSelect={handleCategorySelect} />
        {selectedCategory && <ErrandForm category={selectedCategory} onSubmit={handleErrandSubmit} />}
      </div>
    </Layout>
  );
};

export default ErrandInsertPage;