import React, { createContext, useContext, useState, useEffect } from 'react';

// Context 생성
const AuthContext = createContext();

export const useAuth = () => {
    return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);

    // 컴포넌트가 마운트될 때 localStorage에서 로그인 상태 저장
    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('loggedIn') === 'true';
        setLoggedIn(storedLoggedIn);
    }, []);

    // 로그인 상태 토글
    const toggleLogin = (status) => {
        setLoggedIn(status);
        localStorage.setItem('loggedIn', status);  // 로그인 상태를 localStorage에 저장
    };

    console.log(loggedIn + "------------loggedIn----------");

    return (
        <AuthContext.Provider value={{ loggedIn, toggleLogin }}>
            {children}
        </AuthContext.Provider>
    );
};



// import React, { createContext, useContext, useState } from 'react';

// // Context 생성
// const AuthContext = createContext();

// export const AuthProvider = ({ children }) => {
//     const [loggedIn, setLoggedIn] = useState(false);

//     // 로그인 상태 토글
//     const toggleLogin = (status) => {
//       setLoggedIn(status);
//     };
//     console.log(loggedIn + "------------loggedIn----------");
//     return (
//       <AuthContext.Provider value={{ loggedIn, toggleLogin }}>
//         {children}
//       </AuthContext.Provider>
//     );
// };
// //----------------------------------------------------------------------------
// // App.js 컴포넌트에 Context Provider 추가
// //----------------------------------------------------------------------------
// // Context를 사용하는 훅
// // AuthContext의 useAuth 훅을 통해 loggedIn(상태값읽기), toggleLogin(상태값변경) 
// // component/login/LoginForm에서 Context 사용
// //       : const { loggedIn, toggleLogin } = useAuth();
// //----------------------------------------------------------------------------
// export const useAuth = () => useContext(AuthContext);