import React, { useState } from 'react';
import { signupUser } from '../services/api';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [nickname, setNickname] = useState('');
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (
      nickname.length < 2 ||
      nickname.length > 15 ||
      !/^[가-힣\s]+$/.test(nickname)
    ) {
      newErrors.nickname =
        '이름은 영문자, 한글, 공백포함 2글자부터 15글자까지 가능합니다.';
    }

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,20}$/.test(
        password
      )
    ) {
      newErrors.password =
        '비밀번호는 영문+숫자+특수문자를 포함한 8~20자여야 합니다';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      try {
        const data = await signupUser(email, password, name, nickname);
        console.log('Signup successful:', data);
      } catch (error) {
        console.error('Signup failed:', error.response?.data);
        setErrors(error.response?.data || {});
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        required
      />
      {errors.email && <p>{errors.email}</p>}

      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        required
      />
      {errors.password && <p>{errors.password}</p>}

      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        required
      />
      {errors.name && <p>{errors.name}</p>}

      <input
        type="text"
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder="Nickname"
        required
      />
      {errors.nickname && <p>{errors.nickname}</p>}

      <button type="submit">Sign Up</button>
    </form>
  );
};

export default Signup;
