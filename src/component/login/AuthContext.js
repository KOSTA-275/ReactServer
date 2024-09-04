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
        const storedLoggedIn = sessionStorage.getItem('loggedIn') === 'true';
        setLoggedIn(storedLoggedIn);
    }, []);

    // 로그인 상태 토글
    const toggleLogin = (status) => {
        setLoggedIn(status);
        sessionStorage.setItem('loggedIn', status);  // 로그인 상태를 localStorage에 저장
    };
    const toggleRole = (status) => {
        setRole(status);
        sessionStorage.setItem('myRole', status);
    };

    console.log(loggedIn + "------------loggedIn----------");

    return (
        <AuthContext.Provider value={{ loggedIn, toggleLogin ,myRole, toggleRole }}>
            {children}
        </AuthContext.Provider>
    );
};