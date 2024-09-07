import React, { useState } from 'react';
import styles from './ErrandForm.module.css';

const regions = ['전국', '서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

const ErrandForm = ({ category, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    price: '',
    estimatedTime: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { date, time, ...rest } = formData;
    const deadline = `${date} ${time}`;
    onSubmit({ ...rest, categoryId: category.id, deadline });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formHeader}>
        <h2>심부름 요청하기</h2>
        <p>선택한 카테고리: <strong>{category.name}</strong></p>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="title">제목</label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="심부름 제목을 입력해주세요"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="description">상세 내용</label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="심부름에 대한 상세 내용을 입력해주세요"
          required
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="location">위치</label>
          <select
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            required
          >
            <option value="">위치를 선택해주세요</option>
            {regions.map((region) => (
              <option key={region} value={region}>{region}</option>
            ))}
          </select>
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="price">금액 (원)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="금액을 입력해주세요"
            required
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <label htmlFor="date">날짜</label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">시간 (24시간제)</label>
          <input
            type="time"
            id="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="estimatedTime">예상 소요 시간 (분)</label>
        <input
          type="number"
          id="estimatedTime"
          name="estimatedTime"
          value={formData.estimatedTime}
          onChange={handleChange}
          placeholder="예상 소요 시간을 분 단위로 입력해주세요"
          required
        />
      </div>

      <button type="submit" className={styles.submitButton}>심부름 요청하기</button>
    </form>
  );
};

export default ErrandForm;