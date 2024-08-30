import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './component/IndexPage'; 
// AuthProvider import
import { AuthProvider } from './component/login/AuthContext';   // AuthProvider 가져오기
import ProtectedRoute from './component/login/ProtectedRoute';  // ProtectedRoute 가져오기 : 인증으로 컴포넌트 렌더링 보호
const App = () => {
  return (
    <IndexPage />
  );
};
export default App;
