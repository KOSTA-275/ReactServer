import React, { useState } from 'react';
import { findId } from '../services/api';
import styles from '../css/FindId.module.css';

const FindId = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await findId(name, phone);
      setResult(`찾은 이메일: ${data.email}`);
    } catch (error) {
      setResult('아이디를 찾을 수 없습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2 className={styles.title}>아이디 찾기</h2>
        <p className={styles.subtitle}>실명과 휴대폰번호를 입력해주세요</p>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="실명을 입력해주세요"
          className={styles.input}
          required
        />
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="휴대폰 번호를 입력해주세요"
          className={styles.input}
          required
        />
        <button type="submit" className={styles.button}>
          이메일 주소 받기
        </button>
        {result && <p className={styles.result}>{result}</p>}
      </form>
    </div>
  );
};

export default FindId;
