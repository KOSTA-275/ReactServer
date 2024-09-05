import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './layout/Layout';
import styles from './ErrandDetailPage/ErrandDetailPage.module.css';

const ErrandDetailPage = () => {
  const [errand, setErrand] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchErrandDetail = async () => {
      try {
        const token = sessionStorage.getItem('jwtToken');
        const response = await axios.get(`http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands/${id}`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setErrand(response.data);
        setLoading(false);
      } catch (err) {
        setError('심부름 정보를 불러오는데 실패했습니다.');
        setLoading(false);
      }
    };

    fetchErrandDetail();
  }, [id]);

  const handleApply = async () => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      await axios.post(`http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands/${id}/apply`, {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      alert('심부름 신청이 완료되었습니다.');
      navigate('/errand-list');
    } catch (err) {
      alert('심부름 신청에 실패했습니다.');
    }
  };

  if (loading) return <Layout><div className={styles.loading}>로딩 중...</div></Layout>;
  if (error) return <Layout><div className={styles.error}>{error}</div></Layout>;
  if (!errand) return <Layout><div className={styles.error}>심부름 정보를 찾을 수 없습니다.</div></Layout>;

  return (
    <Layout>
      <div className={styles.errandDetailPage}>
        <h1 className={styles.title}>{errand.title}</h1>
        <div className={styles.info}>
          <p><strong>요청자:</strong> {errand.requesterNickname}</p>
          <p><strong>위치:</strong> {errand.location}</p>
          <p><strong>가격:</strong> {errand.price}원</p>
          <p><strong>예상 소요 시간:</strong> {errand.estimatedTime}분</p>
          <p><strong>마감 기한:</strong> {new Date(errand.deadline).toLocaleString()}</p>
        </div>
        <div className={styles.description}>
          <h2>상세 설명</h2>
          <p>{errand.description}</p>
        </div>
        <button className={styles.applyButton} onClick={handleApply}>
          신청하기
        </button>
      </div>
    </Layout>
  );
};

export default ErrandDetailPage;