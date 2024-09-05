// LeftMenuTap.js
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './LeftMenuTap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom'; // useNavigate 훅 import

const LeftMenuTap = () => {

  const navigate = useNavigate(); // useNavigate 훅 사용
  const handleNotifiClick = () => {
    navigate('/Notification');
  };
  const handleFaqClick = () => {
    navigate('/FaqPage');
  };
  const handleInqClick = () => {
    navigate('/InquiryPage');
  };
  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-column customNav"
    >
      <Nav.Link className="first-link">고객센터</Nav.Link>
      <Nav.Link eventKey="link-1"onClick = {handleNotifiClick}>공지사항</Nav.Link>
      <Nav.Link eventKey="link-2">채팅상담</Nav.Link>
      <Nav.Link eventKey="link-3"onClick = {handleFaqClick}>자주 묻는 질문</Nav.Link>
      <Nav.Link eventKey="link-4"onClick = {handleInqClick}>문의 등록하기</Nav.Link>
    </Nav>
  );
}

export default LeftMenuTap;
