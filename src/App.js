import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import IndexPage from './component/IndexPage'; 
import LoginForm from './component/login/LoginForm'; 

import { AuthProvider } from './component/login/AuthContext'; 
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>  
        <Routes>
          <Route path="/" element={<IndexPage />} /> {/* Route 정의 */}
          <Route path="/loginPage" element={<LoginForm />} /> {/* Route 정의 */}
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
