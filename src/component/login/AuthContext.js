import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 생성
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [myRole, setRole] = useState("");

    // 컴포넌트가 마운트될 때 localStorage에서 로그인 상태 저장
    useEffect(() => {
        checkAuth();
    }, []);
    
    const checkAuth = async () => {
        const storedLoggedIn = sessionStorage.getItem('jwtToken') !== null;
        console.log(storedLoggedIn+"입니다.")
        const storedRoleIn = sessionStorage.getItem('myRole');
        setLoggedIn(storedLoggedIn);
        console.log(loggedIn + "------------loggedIn----------");
        setRole(storedRoleIn);
      };
    
    // 로그인 상태 토글
    const toggleLogin = (status) => {
        setLoggedIn(status);
    };
    const toggleRole = (status) => {
        setRole(status);
        sessionStorage.setItem('myRole', status);
        };


    return (
        <AuthContext.Provider value={{ loggedIn, toggleLogin ,myRole, toggleRole,checkAuth }}>
            {children}
        </AuthContext.Provider>
    );
};