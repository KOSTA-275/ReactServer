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
import FaqPage_emp from './component/FaqPage_emp';
import FaqPage from './component/FaqPage';
import RoleNotRoute from './component/login/RoleNotRoute';
import InquiryPage from './component/InquiryPage';
import InquiryPage_emp from './component/InquiryPage_emp';
import InquiryMyPage_emp from './component/InquiryMyPage_emp';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/FaqPage" element={<ProtectedRoute><RoleRoute redirectTo="/FaqPage_emp"><FaqPage /></RoleRoute></ProtectedRoute>} />
          <Route path="/FaqPage_emp" element={<ProtectedRoute><RoleNotRoute redirectTo="/indexPage"><FaqPage_emp /></RoleNotRoute></ProtectedRoute>} />
          
          <Route path="/Notification" element={<ProtectedRoute><RoleRoute redirectTo="/Notification_emp"><NotificationPage /></RoleRoute></ProtectedRoute>} />
          <Route path="/Notification_emp" element={<ProtectedRoute><RoleNotRoute redirectTo="/indexPage"><NotificationPage_emp /></RoleNotRoute></ProtectedRoute>} />
          <Route path="/" element={<IndexPage />} /> {/* Route 정의 */}
          
          <Route path="/InquiryPage" element={<ProtectedRoute><RoleRoute redirectTo="/InquiryPage_emp"><InquiryPage /></RoleRoute></ProtectedRoute>} />
          <Route path="/InquiryPage_emp" element={<ProtectedRoute><RoleNotRoute redirectTo="/indexPage"><InquiryPage_emp /></RoleNotRoute></ProtectedRoute>} />

          <Route path="/InquiryMyPage_emp" element={<ProtectedRoute><RoleNotRoute redirectTo="/indexPage"><InquiryMyPage_emp /></RoleNotRoute></ProtectedRoute>} />

          <Route path="/indexPage" element={<IndexPage />} /> {/* Route 정의 */}
          {/* <Route path="/" element={<IndexPage />} /> Route 정의 */}
          <Route path="/loginPage" element={<LoginForm />} /> {/* Route 정의 */}
          <Route path="/loginPage1" element={<Login />} /> {/* Route 정의 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
