import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './css/ProfilePage.module.css';

const InquiryItem = ({ id, title, content, date }) => (
  <div className={styles.inquiryItem}>
    <div className={styles.inquiryHeader}>
      <h3>{title}</h3>
      <span className={styles.inquiryDate}>{date}</span>
    </div>
    <p className={styles.inquiryContent}>{content}</p>
  </div>
);

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState('profile');
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInquiries = async () => {
      if (activeTab === 'inquiries') {
        try {
          setLoading(true);
          // 실제 API 엔드포인트로 교체해야 합니다
          const response = await axios.get('YOUR_INQUIRIES_API_ENDPOINT');
          setInquiries(response.data);
          setLoading(false);
        } catch (err) {
          setError('문의사항을 불러오는 데 실패했습니다.');
          setLoading(false);
        }
      }
    };

    fetchInquiries();
  }, [activeTab]);

  return (
    <div className={styles.profilePage}>
      <div className={styles.profileHeader}>
        <img
          src="profile-image.jpg"
          alt="Profile"
          className={styles.profileImage}
        />
        {/* 프로필 헤더 내용 */}
      </div>
      <div className={styles.profileContent}>
        <div className={styles.sidebar}>
          <ul>
            <li
              className={activeTab === 'profile' ? styles.active : ''}
              onClick={() => setActiveTab('profile')}
            >
              프로필 현황
            </li>
            {/* 다른 메뉴 항목들 */}
            <li
              className={activeTab === 'inquiries' ? styles.active : ''}
              onClick={() => setActiveTab('inquiries')}
            >
              내 문의사항
            </li>
          </ul>
        </div>
        <div className={styles.mainContent}>
          {activeTab === 'profile' && (
            <div className={styles.profileInfo}>{/* 프로필 정보 내용 */}</div>
          )}
          {activeTab === 'inquiries' && (
            <div className={styles.inquiries}>
              <h2>내 문의사항</h2>
              {loading && <div className={styles.loading}>로딩 중...</div>}
              {error && <div className={styles.error}>{error}</div>}
              {!loading &&
                !error &&
                inquiries.map((inquiry) => (
                  <InquiryItem
                    key={inquiry.id}
                    id={inquiry.id}
                    title={inquiry.title}
                    content={inquiry.content}
                    date={inquiry.date}
                  />
                ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
