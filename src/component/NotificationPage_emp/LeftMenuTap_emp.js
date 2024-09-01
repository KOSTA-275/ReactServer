// LeftMenuTap.js
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import './LeftMenuTap_emp.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const LeftMenuTap_emp = () => {
  return (
    <Nav
      defaultActiveKey="/home"
      className="flex-column customNav"
    >
      <Nav.Link href="/home" className="first-link">고객센터</Nav.Link>
      <Nav.Link eventKey="link-1">공지사항</Nav.Link>
      <Nav.Link eventKey="link-2">채팅상담</Nav.Link>
      <Nav.Link eventKey="link-3">자주 묻는 질문</Nav.Link>
      <Nav.Link eventKey="link-4">문의 등록하기</Nav.Link>
    </Nav>
  );
}

export default LeftMenuTap_emp;
