import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './layout/Layout';
import styles from './ErrandDetailPage/ErrandDetailPage.module.css';

const ErrandDetailPage = () => {
  // 상태 관리
  const [errand, setErrand] = useState(null); // 심부름 정보를 저장
  const [loading, setLoading] = useState(true); // 로딩 상태
  const [error, setError] = useState(null); // 에러 상태

  // URL 파라미터에서 심부름 ID를 가져옴
  const { id } = useParams();
  const navigate = useNavigate();

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

  useEffect(() => {
    fetchErrandDetail();
  }, [id]);

  const handleAccept = async () => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      await axios.put(`http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands/${id}/accept`, 
        {
          runnerSeq: 999,
          runnerNickname: "테스트러너",
          status: "IN_PROGRESS"
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      alert('심부름을 수락했습니다.');
      fetchErrandDetail();
    } catch (err) {
      alert('심부름 수락에 실패했습니다.');
      console.error(err);
    }
  };

  // 로딩 중일 때 표시할 내용
  if (loading) return <Layout><div className={styles.loading}>로딩 중...</div></Layout>;
  
  // 에러 발생 시 표시할 내용
  if (error) return <Layout><div className={styles.error}>{error}</div></Layout>;
  
  // 심부름 정보가 없을 때 표시할 내용
  if (!errand) return <Layout><div className={styles.error}>심부름 정보를 찾을 수 없습니다.</div></Layout>;

  // 심부름 상세 정보 렌더링
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
          <p><strong>상태:</strong> {errand.status}</p>
        </div>
        <div className={styles.description}>
          <h2>상세 설명</h2>
          <p>{errand.description}</p>
        </div>
        {/* 심부름 상태가 'REQUESTED'일 때만 수락 버튼 표시 */}
        {errand.status === 'REQUESTED' && (
          <button className={styles.acceptButton} onClick={handleAccept}>
            수락하기
          </button>
        )}
        {/* 심부름 상태가 'IN_PROGRESS'일 때 진행 중 메시지 표시 */}
        {errand.status === 'IN_PROGRESS' && (
          <p className={styles.inProgress}>진행 중인 심부름입니다.</p>
        )}
      </div>
    </Layout>
  );
};

export default ErrandDetailPage;