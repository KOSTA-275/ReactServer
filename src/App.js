import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './component/IndexPage';
import Login from './component/userPage/Login';

import { AuthProvider } from './component/login/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationPage_emp from './component/NotificationPage_emp';
import NotificationPage from './component/NotificationPage';
import InquiryPage_emp from './component/InquiryPage_emp';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/notification" element={<NotificationPage />} />
          <Route path="/notification_emp" element={<NotificationPage_emp />} />
          {/* <Route path="/inquiry" element={<InquiryPage />} /> */}
          <Route path="/inquiry_emp" element={<InquiryPage_emp />} />
          <Route path="/" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/loginPage" element={<Login />} /> {/* Route 정의 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
