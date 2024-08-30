import React, { useState, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { useAuth } from './AuthContext';

const LoginForm = () => {
  const [userEmail, setUserEmail] = useState('');
  const [userPw, setUserPw]     = useState('');
  const userEmailInputRef        = useRef(null);

  const navigate = useNavigate();                 // useNavigate 훅을 사용하여 페이지 전환
  const { loggedIn, toggleLogin } = useAuth();   //Context에서 로그인 상태 및 로그인 상태 변경 함수 가져오기



  //-------------------------------------------------------------------------
  //구글로 로그인 클릭 시 
  // POST http://localhost:8089/form_login_process -d userEmail userPw
  //-------------------------------------------------------------------------
  const myHandleGoogleLogin = () => {
    window.location.href = 'http://localhost:8089/login/GOOGLE';
  };



  //-------------------------------------------------------------------------
  //로그인 폼 전송
  // POST http://localhost:8089/form_login_process -d userEmail userPw
  //-------------------------------------------------------------------------
  const myLoginFormSubmit = async (e) => {
    e.preventDefault();
    if (userEmail.trim() === '') {
      alert('메일주소를 입력해주세요.');
      userEmailInputRef.current.focus();
      return false;
    }

    const formData = new FormData();
    formData.append('userEmail', userEmail);
    formData.append('userPw', userPw);

    try {
      const res = await axios.post('http://localhost:8089/form_login_process'
        , formData
        ,  { withCredentials: true }
      );
      console.log('FORM 전송:', { userEmail, userPw});


      if (res.status === 200) { 
          setUserEmail('');
          setUserPw('');  
          toggleLogin(true);
          navigate('/');
          //window.location.replace('/');  //메인페이지로 이동
      } else {
          toggleLogin(false);
          navigate('/');
      }    
    } catch (error) {
          toggleLogin(false);
          alert('잘못된 회원정보 입니다. 다시 시도하세요');
          navigate('/login_page');
      }
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

          {/* 로그인폼 */}
          <div className="flex items-center justify-center min-h-screen" 
              style={{ 
                position: 'relative', 
                zIndex: '1', 
                backgroundColor: 'rgba(0, 0, 0, 0.8)', 
                color: 'white', 
                padding: '20px', 
                borderRadius: '8px' 
              }}>
                <div  className="px-4 py-2 rounded-xl max-w-xl w-full min-h-[500px] text-white/70 tw-absolute-center">
                    <div className="flex flex-col items-center mb-5">
                      <div className="text-[50px] font-semibold mb-1 mx-auto">
                        <Link to="/" className="nav-link">
                        <div className="text-primary leading-none mb-4 text-center" >MOVIEFLEX 회원 로그인</div>
                        </Link>
                      </div>
                      <div className="flex gap-2 mb-8">
                        
                        <button onClick={myHandleGoogleLogin}><img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/logo/Google.png" style={{border: '1px solid #aaaabb', borderRadius: '15%'}} alt="google"/></button>
                        <a href="http://localhost:8089/login/KAKAO"><img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Kakao.png" width='73' alt="kakao"/></a>
                        <a href="http://localhost:8089/login/NAVER"><img src="https://test.codemshop.com/wp-content/plugins/mshop-mcommerce-premium-s2/lib/mshop-members-s2/assets/images/social/icon_1/Naver.png" width='73' alt="naver"/></a>
	
                      </div>
                      <p className="text-lg">or use your email account:</p>
                    </div>

                    <form onSubmit={myLoginFormSubmit}>
                      <div className="relative mb-6">
                        <input name="userEmail" id="userEmail" type="email" placeholder="Email" 
                        className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white" 
                        onChange={(e) => setUserEmail(e.target.value)} ref={userEmailInputRef} 
                        />
                        <label  className="absolute left-5 text-gray-400 transition duration-500 pointer-events-none -translate-y-1/2 visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out">Email</label>
                        <svg stroke="currentColor" fill="currentColor" strokeWidth="0"
                          viewBox="0 0 1024 1024" className="absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg">
                          <path d="M928 160H96c-17.7 0-32 14.3-32 32v640c0 17.7 14.3 32 32 32h832c17.7 0 32-14.3 32-32V192c0-17.7-14.3-32-32-32zm-40 110.8V792H136V270.8l-27.6-21.5 39.3-50.5 42.8 33.3h643.1l42.8-33.3 39.3 50.5-27.7 21.5zM833.6 232L512 482 190.4 232l-42.8-33.3-39.3 50.5 27.6 21.5 341.6 265.6a55.99 55.99 0 0 0 68.7 0L888 270.8l27.6-21.5-39.3-50.5-42.7 33.2z"></path></svg>
                      </div>
                      <div className="relative mb-12">
                        <input name="userPw" id="userPw" type="password" placeholder="Password" 
                        className="w-full bg-dark-lighten px-5 py-4 pr-12 rounded-xl outline-none peer text-white" 
                        onChange={(e) => setUserPw(e.target.value)}
                        />
                          <label className="absolute left-5 text-gray-400 transition duration-500 pointer-events-none translate-y-[-50%] visible peer-placeholder-shown:opacity-0 peer-placeholder-shown:invisible peer-placeholder-shown:translate-y-[-10%] ease-in-out">Password</label>
                          <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" className="absolute top-1/2 -translate-y-1/2 right-4" height="25" width="25" xmlns="http://www.w3.org/2000/svg"><g>
                          <path fill="none" d="M0 0h24v24H0z"></path>
                          <path d="M18 8h2a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1h2V7a6 6 0 1 1 12 0v1zM5 10v10h14V10H5zm6 4h2v2h-2v-2zm-4 0h2v2H7v-2zm8 0h2v2h-2v-2zm1-6V7a4 4 0 1 0-8 0v1h8z"></path></g>
                          </svg>
                      </div>
                      <button type="submit" className="px-12 py-3 bg-primary rounded-full text-lg text-white uppercase absolute left-1/2 -translate-x-1/2 hover:bg-[#4161cc] transition duration-300">로그인</button>
                    </form>


                    <p className="text-xl flex gap-2 mt-32 justify-center">
                      <span>아직 회원이 아니신가요?</span>
                      <Link to={`/join_page`} className="nav-link"  >
                      <button className="text-primary/90 underline">회원가입</button>
                      </Link>
                    </p>
                  </div>        
          </div>

    </div>
  );
};

export default LoginForm;
