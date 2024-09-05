import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Layout from './layout/Layout';
import { useAuth } from './login/AuthContext';

const regions = ['서울', '경기', '인천', '부산', '대구', '광주', '대전', '울산', '세종', '강원', '충북', '충남', '전북', '전남', '경북', '경남', '제주'];

const ErrandListPage = () => {
  const [errands, setErrands] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const { loggedIn } = useAuth();

  useEffect(() => {
    fetchErrands();
  }, [selectedRegion, currentPage]);

  const fetchErrands = async () => {
    try {
      const token = sessionStorage.getItem('jwtToken');
      const response = await axios.get(`http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/ErrandService/errands`, {
        params: {
          location: selectedRegion,
          page: currentPage - 1,
          size: 10
        },
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setErrands(response.data.content);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error('심부름 목록을 불러오는 중 오류 발생:', error);
    }
  };

  const handleRegionChange = (region) => {
    setSelectedRegion(region);
    setCurrentPage(1);
  };

  return (
    <Layout>
      <div>
        <h1>심부름 목록</h1>
        <div>
          {regions.map(region => (
            <button key={region} onClick={() => handleRegionChange(region)}>
              {region}
            </button>
          ))}
        </div>
        <ul>
          {errands.map(errand => (
            <li key={errand.errandSeq}>
              <h3>{errand.title}</h3>
              <p>{errand.description}</p>
              <p>요청자: {errand.requesterNickname}</p>
              <p>위치: {errand.location}</p>
              <p>가격: {errand.price}원</p>
            </li>
          ))}
        </ul>
        <div>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button key={page} onClick={() => setCurrentPage(page)}>
              {page}
            </button>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ErrandListPage;