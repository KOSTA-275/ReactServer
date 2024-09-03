import Layout from "./layout/Layout"
import CategorySelector from "./ErrandInsertPage/CategorySelector";
import ErrandForm from "./ErrandInsertPage/ErrandForm";
import styles from './ErrandInsertPage/ErrandInsertPage.module.css';
import axios from "axios";
import { useState, useEffect } from "react";

const ErrandInsertPage = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [notifications, setNotifications] = useState([]); // notificationRes를 저장할 상태 추가

  useEffect(() => {
    const fetchData = async () => {
      try {
        // 첫 번째 비동기 요청
        const res = await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/jwt/login_success', {
          userName: '원성진',
          role: 'ADMIN'
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        console.log('성공:', res);
        // 세션에 토큰 저장
        sessionStorage.setItem('jwtToken', res.data);

        // 세션 스토리지에서 JWT 토큰을 가져오기
        const token = sessionStorage.getItem('jwtToken');

        // JWT 토큰이 있는지 확인
        if (token) {
          // 두 번째 비동기 요청
          const notificationRes = await axios.get('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/categories', {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          });

          console.log('가져옴:', notificationRes);
          // notificationRes.data를 상태에 저장
          setNotifications(notificationRes.data);
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

    fetchData(); // 비동기 함수 호출
  }, []); // 빈 배열을 의존성으로 지정하여 컴포넌트 마운트 시 한 번만 실행

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <Layout>
        <div>{notifications.data}</div>
    </Layout>
  );
};



    // return (
    // <Layout>
    //   <div className={styles.container}>
    //   <h1 className={styles.title}>어떤 일을 해주셨으면 하나요?</h1>
    //   <CategorySelector onSelect={setSelectedCategory} />
    //   {selectedCategory && <ErrandForm category={selectedCategory} />}
    // </div>

    // </Layout>
    // )


export default ErrandInsertPage