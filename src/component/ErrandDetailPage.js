import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Layout from './layout/Layout';
import styles from './ErrandDetailPage/ErrandDetailPage.module.css';
import { FaMapMarkerAlt, FaMoneyBillWave, FaClock, FaCalendarAlt, FaUser } from 'react-icons/fa';

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
      navigate('/errand-list'); // 수락 후 목록 페이지로 이동
    } catch (err) {
      alert('심부름 수락에 실패했습니다.');
      console.error(err);
    }
  };

  if (loading) return <Layout><div className={styles.loading}>로딩 중...</div></Layout>;
  if (error) return <Layout><div className={styles.error}>{error}</div></Layout>;
  if (!errand) return <Layout><div className={styles.error}>심부름 정보를 찾을 수 없습니다.</div></Layout>;

  return (
    <Layout>
      <div className={styles.errandDetailPage}>
        <h1 className={styles.title}>{errand.title}</h1>
        <div className={styles.statusBadge} data-status={errand.status}>
          {errand.status}
        </div>
        <div className={styles.infoCard}>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <span>위치: {errand.location}</span>
          </div>
          <div className={styles.infoItem}>
            <FaMoneyBillWave className={styles.icon} />
            <span className={styles.price}>가격: {errand.price}원</span>
          </div>
          <div className={styles.infoItem}>
            <FaClock className={styles.icon} />
            <span>예상 소요 시간: {errand.estimatedTime}분</span>
          </div>
          <div className={styles.infoItem}>
            <FaCalendarAlt className={styles.icon} />
            <span className={styles.deadline}>마감 기한: {new Date(errand.deadline).toLocaleString()}</span>
          </div>
        </div>
        <div className={styles.descriptionCard}>
          <h2>상세 설명</h2>
          <p>{errand.description}</p>
        </div>
        <div className={styles.requesterCard}>
          <h2>요청자 정보</h2>
          <div className={styles.infoItem}>
            <FaUser className={styles.icon} />
            <span>{errand.requesterNickname}</span>
          </div>
        </div>
        {errand.status === 'REQUESTED' && (
          <button className={styles.acceptButton} onClick={handleAccept}>
            수락하기
          </button>
        )}
        {errand.status === 'IN_PROGRESS' && (
          <p className={styles.inProgress}>진행 중인 심부름입니다.</p>
        )}
      </div>
    </Layout>
  );
};

export default ErrandDetailPage;