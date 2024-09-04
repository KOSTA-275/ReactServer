import React, { useState } from 'react';
import styles from './ErrandForm.module.css';

const ErrandForm = ({ category }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // 폼 제출 로직
    console.log(formData);
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
      <div className={styles.dateTimeContainer}>
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={styles.input}
        />
      </div>
      <input
        type="number"
        name="price"
        placeholder="금액을 입력해주세요"
        value={formData.price}
        onChange={handleChange}
        className={styles.input}
      />
      <button type="submit" className={styles.submitButton}>심부름 요청하기</button>
    </form>
  );
};

export default ErrandForm;