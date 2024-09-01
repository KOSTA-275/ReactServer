import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './component/IndexPage';
import Notification from './component/NotificationPage_emp';
import Login from './component/userPage/Login';

import { AuthProvider } from './component/login/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/notifications" element={<Notification />} />
          <Route path="/" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/loginPage" element={<Login />} /> {/* Route 정의 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
