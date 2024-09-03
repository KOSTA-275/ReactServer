import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from "./layout/Layout";
import CategorySelector from './ErrandInsertPage/CategorySelector';
import styles from './ErrandInsertPage/ErrandInsertPage.module.css';
import { useAuth } from './login/AuthContext';

const ErrandForm = ({ category, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    price: '',
    estimatedTime: '',
    deadlineDate: '',
    deadlineTime: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { deadlineDate, deadlineTime, ...rest } = formData;
    const deadline = `${deadlineDate} ${deadlineTime}`;
    onSubmit({ ...rest, categoryId: category.id, deadline });
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
        required
      />
      <textarea
        name="description"
        placeholder="상세 내용을 입력해주세요"
        value={formData.description}
        onChange={handleChange}
        className={styles.textarea}
        required
      />
      <input
        type="text"
        name="location"
        placeholder="위치를 입력해주세요"
        value={formData.location}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="금액을 입력해주세요"
        value={formData.price}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="number"
        name="estimatedTime"
        placeholder="예상 소요 시간 (분)"
        value={formData.estimatedTime}
        onChange={handleChange}
        className={styles.input}
        required
      />
       <input
        type="date"
        name="deadlineDate"
        value={formData.deadlineDate}
        onChange={handleChange}
        className={styles.input}
        required
      />
      <input
        type="time"
        name="deadlineTime"
        value={formData.deadlineTime}
        onChange={handleChange}
        className={styles.input}
        step="60"
        required
      />
      <button type="submit" className={styles.submitButton}>심부름 요청하기</button>
    </form>
  );
};

const ErrandInsertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const { loggedIn } = useAuth();

  useEffect(() => {
    if (!loggedIn) {
      navigate('/loginPage');
    }
  }, [loggedIn, navigate]);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleErrandSubmit = async (errandData) => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      
      //임시: 요청자 seq를 777로 설정
      const dataWithRequesterSeq = { ...errandData, requesterSeq: 777 };

      //실제 요청자 seq를 받아와야함 -> 담당자에게 문의해야함
      /*
      const userResponse = await axios.get('http://user-service-url/api/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const userSeq = userResponse.data.seq;
      const dataWithRequesterSeq = { ...errandData, requesterSeq: userSeq };
      */

      const response = await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands', 
        dataWithRequesterSeq,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      console.log('심부름이 생성되었습니다:', response.data);
      navigate('/'); // 심부름 생성 후 홈페이지로 이동
    } catch (error) {
      console.error('심부름 생성 중 오류 발생:', error);
      setError('심부름 생성 중 오류가 발생했습니다. 다시 시도해 주세요.');
    }
  };

  if (!loggedIn) {
    return null; // 로그인되지 않은 경우 아무것도 렌더링하지 않음
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1 className={styles.title}>어떤 일을 해주셨으면 하나요?</h1>
        <CategorySelector onSelect={handleCategorySelect} />
        {selectedCategory && <ErrandForm category={selectedCategory} onSubmit={handleErrandSubmit} />}
        {error && <p className={styles.error}>{error}</p>}
      </div>
    </Layout>
  );
};

export default ErrandInsertPage;