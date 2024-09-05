import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './component/IndexPage';
import NotificationPage from './component/NotificationPage';
import Login from './component/userPage/Login';
import LoginForm from './component/login/LoginForm';
import RoleRoute from './component/login/RoleRoute'; 
import ProtectedRoute from './component/login/ProtectedRoute'; 
import { AuthProvider } from './component/login/AuthContext';
import ErrandInsertPage from './component/ErrandInsertPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import NotificationPage_emp from './component/NotificationPage_emp';
import ErrandListPage from './component/ErrandListPage';
import RoleNotRoute from './component/login/RoleNotRoute';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/Notification" element={<ProtectedRoute><RoleRoute redirectTo="/Notification_emp"><NotificationPage /></RoleRoute></ProtectedRoute>} />
          <Route path="/errand-insert" element={<ErrandInsertPage />} />
          <Route path="/errand-list" element={<ErrandListPage />} />
          <Route path="/Notification_emp" element={<ProtectedRoute><RoleNotRoute redirectTo="/indexPage"><NotificationPage_emp /></RoleNotRoute></ProtectedRoute>} />
          <Route path="/indexPage" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/loginPage" element={<LoginForm />} /> {/* Route 정의 */}
          <Route path="/loginPage1" element={<Login />} /> {/* Route 정의 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;