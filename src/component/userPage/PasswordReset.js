import React, { useState } from 'react';
import {
  requestVerificationCode,
  verifyCodeAndResetPassword,
} from '../../api/api';
import styles from '../userPage/css/PasswordReset.module.css';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [message, setMessage] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);

  const handleRequestCode = async (e) => {
    e.preventDefault();
    try {
      const response = await requestVerificationCode(email);
      setMessage(response);
      setIsCodeSent(true);
    } catch (error) {
      setMessage('인증 코드 요청에 실패했습니다.');
    }
  };

  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await verifyCodeAndResetPassword(
        email,
        verificationCode
      );
      setMessage(response);
    } catch (error) {
      setMessage('인증 코드 확인에 실패했습니다.');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>비밀번호 찾기</h2>
      <form
        onSubmit={isCodeSent ? handleVerifyCode : handleRequestCode}
        className={styles.form}
      >
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="이메일을 입력해주세요"
          className={styles.input}
          required
        />
        {isCodeSent && (
          <input
            type="text"
            value={verificationCode}
            onChange={(e) => setVerificationCode(e.target.value)}
            placeholder="인증코드를 입력해주세요"
            className={styles.input}
            required
          />
        )}
        <button type="submit" className={styles.button}>
          {isCodeSent ? '비밀번호 재설정' : '인증 코드 받기'}
        </button>
      </form>
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default PasswordReset;
