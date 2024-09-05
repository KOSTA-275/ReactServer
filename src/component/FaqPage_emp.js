import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout';
import LeftMenuTap_emp from './NotificationPage_emp/LeftMenuTap_emp';
import Faq_emp from './FaqPage_emp/Faq_emp';
import './FaqPage_emp/FaqPage_emp.css';
import axios from 'axios';

const FaqPage_emp = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [faqs, setFaqs] = useState([]); // notificationRes를 저장할 상태 추가

    const fetchData = async () => {
      try {
        // // 첫 번째 비동기 요청
        // const res = await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/jwt/login_success', {
        //   userName: '원성진',
        //   role: 'ADMIN'
        // }, {
        //   headers: {
        //     'Content-Type': 'application/json'
        //   }
        // });

        // console.log('성공:', res);
        // // 세션에 토큰 저장
        // sessionStorage.setItem('jwtToken', res.data);

        // 세션 스토리지에서 JWT 토큰을 가져오기
        const token = sessionStorage.getItem('jwtToken');

        // JWT 토큰이 있는지 확인
        if (token) {
          // 두 번째 비동기 요청
           const faqRes = await axios.get('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/customercare/faq_list', {
           // const notificationRes = await axios.get('http://localhost:8032/customercare/noti_list', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('가져옴:', faqRes);
          // notificationRes.data를 상태에 저장
          setFaqs(faqRes.data);
        } else {
          console.log('JWT 토큰이 세션 스토리지에 없습니다.');
        }
      } catch (err) {
        console.log('에러 발생:', err);
        setError(err); // 에러 상태 업데이트
      } finally {
        setLoading(false); // 로딩 상태 업데이트
      }
    };

  useEffect(() => {
    fetchData(); // 비동기 함수 호출
  }, []); // 빈 배열을 의존성으로 지정하여 컴포넌트 마운트 시 한 번만 실행

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;


  // // 데이터 패칭 함수
  // const fetchNotifications = async () => {
  //   try {
  //     setLoading(true); // 로딩 시작
  //     const response = await axios.get('http://localhost:8032/customercare/noti_list');
  //     setNotifications(response.data); // 데이터 업데이트
  //   } catch (err) {
  //     setError(err); // 에러 처리
  //   } finally {
  //     setLoading(false); // 로딩 종료
  //   }
  // };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>Error: {error.message}</div>;

  // 데이터가 업데이트되었음을 알리는 함수
  const handleDataUpdate = () => {
    fetchData(); // 데이터 다시 패칭
  };


  return (
    <Layout>
      <div className="app-container">
        <LeftMenuTap_emp className="left-menu" />
        <div className="main-content">
          {/* Notification 컴포넌트에 notifications를 props로 전달 */}
          <Faq_emp
            data={faqs}
            onDataUpdate={handleDataUpdate} // 데이터 업데이트 알림 함수 전달 
          />
        </div>
      </div>
    </Layout>
  );
};

export default FaqPage_emp;