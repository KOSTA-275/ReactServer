import axios from 'axios';

const API_URL = 'http://localhost:8098/users';
const PASSWORD_URL = 'http://localhost:8098/password-reset';
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(
      `${API_URL}/login`,
      { email, password },
      {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error('Login error:', error.response?.data || error.message);
    throw error;
  }
};
export const signupUser = async (
  email,
  password,
  name,
  nickname,
  phoneNumber
) => {
  const response = await axios.post(`${API_URL}/join`, {
    email,
    password,
    name,
    nickname,
    phoneNumber,
  });
  return response.data;
};
export const findId = async (name, phone) => {
  try {
    const response = await axios.post(`${API_URL}/find-id`, {
      name,
      phone,
    });
    return response.data;
  } catch (error) {
    console.error('Find ID error:', error.response?.data || error.message);
    throw error;
  }
};
export const requestVerificationCode = async (email) => {
  try {
    const response = await axios.post(`${PASSWORD_URL}/request-code`, null, {
      params: { email },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Verification code request error:',
      error.response?.data || error.message
    );
    throw error;
  }
};

export const verifyCodeAndResetPassword = async (email, code) => {
  try {
    const response = await axios.post(`${PASSWORD_URL}/verify-code`, null, {
      params: { email, code },
    });
    return response.data;
  } catch (error) {
    console.error(
      'Code verification error:',
      error.response?.data || error.message
    );
    throw error;
  }
};
