import React, { useState } from 'react';
import axios from 'axios';
import styles from '../userPage/css/Sign.module.css';

const Signup = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    passwordCheck: '',
    name: '',
    nickname: '',
    phone: '',
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // 이메일 검증
    if (
      !formData.email.match(/^[a-zA-Z0-9+-\_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/)
    ) {
      newErrors.email = '이메일 형식을 맞춰야합니다';
    }

    // 비밀번호 검증
    if (
      !formData.password.match(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\d~!@#$%^&*()+|=]{7,16}$/
      )
    ) {
      newErrors.password =
        '비밀번호는 영문+숫자+특수문자를 포함한 8~20자여야 합니다';
    }

    // 비밀번호 확인
    if (formData.password !== formData.passwordCheck) {
      newErrors.passwordCheck = '비밀번호가 일치하지 않습니다';
    }

    // 이름 검증
    if (!formData.name.match(/^[a-zA-Z가-힣\s]{2,15}$/)) {
      newErrors.name =
        '이름은 영문자, 한글, 공백포함 2글자부터 15글자까지 가능합니다.';
    }

    // 닉네임 검증
    if (!formData.nickname.match(/^[a-zA-Z가-힣\s]{2,15}$/)) {
      newErrors.nickname =
        '닉네임은 영문자, 한글, 공백포함 2글자부터 15글자까지 가능합니다.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const response = await axios.post('/api/users/signup', formData);
        console.log('회원가입 성공:', response.data);
        // 회원가입 성공 후 처리 (예: 로그인 페이지로 리다이렉트)
      } catch (err) {
        console.error('회원가입 에러:', err.response.data);
        setErrors({ submit: '회원가입에 실패했습니다. 다시 시도해주세요.' });
      }
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.title}>회원가입</h2>
        {errors.submit && <p className={styles.error}>{errors.submit}</p>}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="이메일을 입력해주세요"
          className={styles.input}
          required
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="비밀번호를 입력해주세요"
          className={styles.input}
          required
        />
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        <input
          type="password"
          name="passwordCheck"
          value={formData.passwordCheck}
          onChange={handleChange}
          placeholder="비밀번호를 다시 입력해주세요"
          className={styles.input}
          required
        />
        {errors.passwordCheck && (
          <p className={styles.error}>{errors.passwordCheck}</p>
        )}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="이름을 입력해주세요"
          className={styles.input}
          required
        />
        {errors.name && <p className={styles.error}>{errors.name}</p>}

        <input
          type="text"
          name="nickname"
          value={formData.nickname}
          onChange={handleChange}
          placeholder="닉네임을 입력해주세요"
          className={styles.input}
          required
        />
        {errors.nickname && <p className={styles.error}>{errors.nickname}</p>}

        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="전화번호를 입력해주세요"
          className={styles.input}
        />

        <button type="submit" className={styles.button}>
          회원가입
        </button>
      </form>
    </div>
  );
};

export default Signup;
