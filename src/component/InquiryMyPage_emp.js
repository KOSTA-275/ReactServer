import React, { useEffect, useState } from 'react';
import Layout from './layout/Layout'
import LeftMenuTap_emp from './NotificationPage_emp/LeftMenuTap_emp'
import './InquiryMyPage_emp/InquiryMyPage_emp.css'
import InquiryMy_emp from './InquiryMyPage_emp/InquiryMy_emp'
import axios from 'axios';

const InquiryMyPage_emp = () => {



    const [inquiriesRes, setInquiriesRes] = useState(null);
    useEffect( () => {
    inquiries();
    }, [] );

    const inquiries = async () => {
      // 세션 스토리지에서 JWT 토큰을 가져오기
      const token = sessionStorage.getItem('jwtToken');

      // JWT 토큰이 있는지 확인
      if (true) {
        // 두 번째 비동기 요청
        // const inquiriesRes = await axios.get('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/customercare/noti_list', {
        const inquiriesRes = await axios.get('http://localhost:8032/customercare/inquiry_mylist', {
          params: { userSeq: 11 },
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        console.log(inquiriesRes.data);
        setInquiriesRes(inquiriesRes.data);
    }
  }
    return (
      <Layout>
        <div className="app-container">
          <LeftMenuTap_emp className="left-menu" />
          <div className="main-content">
            {/* Notification 컴포넌트에 notifications를 props로 전달 */}
            <InquiryMy_emp inquiries={inquiriesRes} />
          </div>
        </div>
      </Layout>
    );
}

export default InquiryMyPage_emp;