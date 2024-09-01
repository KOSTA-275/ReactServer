import React, { useState, useEffect, useRef } from 'react';
import Modal from '@mui/material/Modal';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Notification_emp.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Notification_emp = ({ data = [], onDataUpdate }) => {
  // 날짜를 'YYYY/MM/DD' 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0'); // 날짜가 한 자리일 때 앞에 '0' 추가

    return `${year}/${month}/${day}`;
  };

  // 모달 표시 여부를 관리하는 상태
  const [openModal, setOpenModal] = useState(false);

  // 모달을 열기 위한 핸들러
  const handleOpenModal = () => {
    setOpenModal(true);
  };

  // 모달을 닫기 위한 핸들러
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); // 기본 제출 동작 방지
    // 폼 데이터 수집
    const formData = new FormData(event.target);

    try {
      await axios.post('http://localhost:8032/customercare/noti_insert', formData);
      onDataUpdate(); // 상위 컴포넌트에 데이터 업데이트 알림
      handleCloseModal(); // 모달 닫기
    } catch (error) {
      console.error('폼 제출 오류:', error);
    }
  };

  // 삭제 핸들러
  const handleDelete = async (notiSeq) => {
    try {
      await axios.delete('http://localhost:8032/customercare/noti_delete', { params:{notiSeq : notiSeq} });
      onDataUpdate(); // 상위 컴포넌트에 데이터 업데이트 알림
    } catch (error) {
      console.error('삭제 오류:', error);
    }
  };

  // 클릭 시 호출되는 핸들러
  const handleClickDelete = (notiSeq) => () => {
    handleDelete(notiSeq);
  };


  return (
    <>
      <div style={{
        textAlign: 'left',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginLeft: '70px',
        color: '#28a7e1',
        marginTop: '5px'
      }}>
        공지사항 관리
      </div>
      <Button className="notiInsertBtn" onClick={handleOpenModal}>공지사항 추가</Button>
      <br/>

      {/* 모달 컴포넌트 */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content">
          <h2 id="modal-title">공지사항 추가</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>공지사항 제목</Form.Label>
              <Form.Control type="text" name="notiTitle" placeholder="제목을 입력하세요~" />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>공지사항 내용</Form.Label>
              <Form.Control as="textarea" name="notiContent" placeholder="내용을 입력하세요~" rows={3} />
            </Form.Group>
            <input type="hidden" name="userSeq" value={11} />
            <Button className='notiModalInsertBtn' type='submit'>추가</Button>
          </Form>
        </div>
      </Modal>

      <Accordion defaultActiveKey="0" className="accordion-custom">
        {data.length > 0 ? (
          data.map((notification) => (
            <Accordion.Item key={notification.notiSeq} eventKey={`${notification.notiSeq}`}>
              <Accordion.Header>{notification.notiTitle}</Accordion.Header>
              <Accordion.Body>
                {notification.notiContent}
                <br />
                <br />
                {formatDate(notification.notiRegdate)}
                <br />
                <br />
                <Button className="notiUpdateBtn">수정</Button>&nbsp;&nbsp;
                <Button className="notiDeleteBtn" onClick={() => handleDelete(notification.notiSeq)}>삭제</Button>
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div>공지사항이 없습니다.</div>
        )}
      </Accordion>
    </>
  );
};

export default Notification_emp;