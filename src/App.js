import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './component/IndexPage';
import Notification from './component/NotificationPage_emp';
import Login from './component/userPage/Login';
import { AuthProvider } from './component/login/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import Signup from './component/userPage/Signup';
import FindId from './component/userPage/FindId';
import PasswordReset from './component/userPage/PasswordReset';
import QnaPage from './component/userPage/QnaPage';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/myQnaPage" element={<QnaPage />} />
          <Route path="/passwordReset" element={<PasswordReset />} />
          <Route path="/findId" element={<FindId />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/notifications" element={<Notification />} />
          <Route path="/" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/loginPage" element={<Login />} /> {/* Route 정의 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
