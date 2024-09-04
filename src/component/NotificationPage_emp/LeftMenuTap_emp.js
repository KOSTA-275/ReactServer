// LeftMenuTap.js
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './LeftMenuTap_emp.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';

const LeftMenuTap_emp = () => {
  const navigate = useNavigate();
  const navigateToNoti = () => { navigate('/notification_emp'); };
  const navigateToInq = () => { navigate('/inquiry_emp'); };

  return (
    <>
      <Nav
        className="flex-column customNav"
      >
        <Nav.Link className="first-link">고객센터</Nav.Link>
        <Nav.Link eventKey="link-1" onClick={navigateToNoti}>공지사항 관리</Nav.Link>
        <Nav.Link eventKey="link-2">채팅상담</Nav.Link>
        <Nav.Link eventKey="link-3">자주 묻는 질문 수정</Nav.Link>
        <Nav.Link eventKey="link-4" onClick={navigateToInq}>문의 답변하기</Nav.Link>
      </Nav>
    </>
  );
}

export default LeftMenuTap_emp;
