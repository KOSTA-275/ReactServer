import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './component/IndexPage';
import NotificationPage from './component/NotificationPage';
import Login from './component/userPage/Login';
import LoginForm from './component/login/LoginForm';
import RoleRoute from './component/login/RoleRoute'; 
import ProtectedRoute from './component/login/ProtectedRoute'; 
import { AuthProvider } from './component/login/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationPage_emp from './component/NotificationPage_emp';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/Notification" element={<ProtectedRoute><RoleRoute redirectTo="/Notification_emp"><NotificationPage /></RoleRoute></ProtectedRoute>} />
          <Route path="/Notification_emp" element={<NotificationPage_emp />} />
          <Route path="/indexPage" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/loginPage" element={<LoginForm />} /> {/* Route 정의 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
