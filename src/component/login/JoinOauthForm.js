import React, { useEffect, useState, useRef } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';  
import { useAuth } from './AuthContext';



const JoinOauthForm = () => {
  
  //etoken(userEmail) 토큰 가져오기 
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const etoken = searchParams.get('etoken');
  console.log("etoken: " + etoken);

  const [userEmail, setUserEmail] = useState('');
  const [userName, setUserName]   = useState('');
  const userNameInputRef        = useRef(null);
  const navigate = useNavigate();                 // useNavigate 훅을 사용하여 페이지 전환
  const { loggedIn, toggleLogin } = useAuth();      //Context에서 로그인 상태 및 로그인 상태 변경 함수 가져오기


  useEffect(() => {
    axios.get(`http://localhost:8089/verifyToken?etoken=${etoken}`,  { withCredentials: true })
      .then(response => {
        setUserEmail(response.data.email);
      })
      .catch(error => {
        console.error("Failed to fetch user email", error);
        alert("회원 인증에 문제가 발생했습니다. 다시 시도하세요.");
        navigate('/join_page');
      });
  }, [etoken]); 


  console.log(userEmail + "<--- oauth")
   //-------------------------------------------------------------------------
  //Oauth를 통한 회원가입 폼 전송
  // POST http://localhost:8089/oauth_join_process -d userEmail userPw userName
  //-------------------------------------------------------------------------
  const myJoinFormSubmit = async (e) => {
      e.preventDefault();
    
      if (userName.trim() === '') {
        alert('이름을 입력해주세요.');
        userNameInputRef.current.focus();
        return false;
      }

      const formData = new FormData();
      formData.append('userEmail', userEmail);
      formData.append('userName', userName);

      const res = await axios.post('http://localhost:8089/oauth_join_process'
        , formData
        ,  { withCredentials: true }
      );
      console.log('FORM 전송:', { userEmail, userName});
      console.log(res.status);
      setUserName('');
      toggleLogin(false);
      navigate('/');  
  };

  
  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
          {/* 비디오 */}
          <video autoPlay muted loop 
                style={{ 
                  position: 'absolute', 
                  top: '10', 
                  bottom : '10',
                  left: '0', 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'cover', 
                  opacity: '1.2', 
                  zIndex: '-1' 
                }}>
            <source src="/main-movie.mp4" type="video/mp4" />
          </video>

          {/* 회원가입폼 */}
          <div className="flex items-center justify-center min-h-screen" 
              style={{ 
                position: 'relative', 
                zIndex: '5', 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                color: 'white', 
                padding: '20px', 
                borderRadius: '8px' 
              }}>
                  <div className="px-4 py-2 rounded-xl max-w-xl w-full min-h-[500px] text-white/70 absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                  
                    <div className="flex flex-col items-center mb-5">
                      <div className="text-[50px] font-semibold mb-1 mx-auto text-center md:text-left">
                        <Link to="/" className="nav-link">
                        <div className="text-primary leading-none mb-4 text-center">MOVIEFLEX 회원 가입(추가정보)</div>
                        </Link>
                      </div>
                     
                      <p className="text-lg"><font style={{color:'red'}}>[*필수]</font> 이름을 입력하세요</p>
                    </div>


                      <form onSubmit={myJoinFormSubmit}>
                      
                      <div className="relative mb-6">
                        <input name="userEmail" id="userEmail" type="email" placeholder="이메일" value={userEmail}
                        className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white" readOnly
                        />
                        <label  className="absolute left-5 text-gray-400 transition duration-500 pointer-events-none -translate-y-1/2 visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out">Email</label>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                          viewBox="0 0 1024 1024" className="absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                          <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
                      </div>
                      <div className="relative mb-6">
                          <input name="userName" id="userName" type="text" placeholder="이름" 
                            className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white" 
                            onChange={(e) => setUserName(e.target.value)} ref={userNameInputRef} 
                            />
                          <label className="absolute left-5 text-gray-400 transition duration-500 pointer-events-none translate-y-[-50%] visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out">Username</label>
                          <svg stroke="currentColor" fill="none" strokeWidth="0" viewBox="0 0 24 24" className="absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M16 9C16 11.2091 14.2091 13 12 13C9.79086 13 8 11.2091 8 9C8 6.79086 9.79086 5 12 5C14.2091 5 16 6.79086 16 9ZM14 9C14 10.1046 13.1046 11 12 11C10.8954 11 10 10.1046 10 9C10 7.89543 10.8954 7 12 7C13.1046 7 14 7.89543 14 9Z" fill="currentColor"></path>
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 1C5.92487 1 1 5.92487 1 12C1 18.0751 5.92487 23 12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1ZM3 12C3 14.0902 3.71255 16.014 4.90798 17.5417C6.55245 15.3889 9.14627 14 12.0645 14C14.9448 14 17.5092 15.3531 19.1565 17.4583C20.313 15.9443 21 14.0524 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12ZM12 21C9.84977 21 7.87565 20.2459 6.32767 18.9878C7.59352 17.1812 9.69106 16 12.0645 16C14.4084 16 16.4833 17.1521 17.7538 18.9209C16.1939 20.2191 14.1881 21 12 21Z" fill="currentColor"></path>
                          </svg>
                          <p className="absolute top-[95%] left-[3%] text-red-600"></p>
                        </div>
                      <button type="submit" className="px-12 py-3 bg-primary rounded-full text-lg text-white uppercase absolute left-1/2 -translate-x-1/2 hover:bg-[#4161cc] transition duration-300">회원가입</button>
                    </form>
                    
                    <p className="text-xl flex gap-2 mt-32 justify-center">
                      <span>기존 회원이신가요?</span>
                      <Link to={`/login_page`} className="nav-link"  >
                      <button className="text-primary/90 underline">로그인</button>
                      </Link>
                    </p>
                  </div>
          </div>

    </div>
  );
};

export default JoinOauthForm;
