import React, { useState, useEffect, useRef } from 'react';
import Modal from '@mui/material/Modal';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Faq_emp.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const Faq_emp = ({ data = [], onDataUpdate }) => {
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
  const [selectedFaq, setSelectedFaq] = useState(null); // 현재 선택된 공지사항 정보

  // 모달을 열기 위한 핸들러
  const handleOpenModal = (faq) => {
    setSelectedFaq(faq); // 현재 선택된 공지사항 정보 설정
    setOpenModal(true);
  };

  // 모달을 닫기 위한 핸들러
  const handleCloseModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (event) => {
    event.preventDefault(); 
    const formData = new FormData(event.target);
    const token = sessionStorage.getItem('jwtToken');

    try {
      // 수정 모드인지 확인
      if (selectedFaq) { // 수정할 공지사항이 선택된 경우
        // 수정 모드일 때, 'noti_update' 엔드포인트로 PUT 요청 전송
         await axios.put('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/customercare/faq_update', {
         // await axios.put('http://localhost:8032/customercare/noti_update', {
          faqSeq: selectedFaq.faqSeq, // 공지사항 번호 포함
          faqTitle: formData.get('faqTitle'),  // 수정된 제목
          faqContent: formData.get('faqContent'),  // 수정된 내용
          userSeq: 11
        }, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
      } else {
        // 새 공지사항 추가 모드일 때, 'noti_insert' 엔드포인트로 POST 요청 전송
         await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/customercare/faq_insert', 
         //await axios.post('http://localhost:8032/customercare/noti_insert',
         formData, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
      }

      onDataUpdate(); 
      handleCloseModal(); 
    } catch (error) {
      console.error('폼 제출 오류:', error);
    }
  };

  // 삭제 핸들러
  const handleDelete = async (faqSeq) => {
    const token = sessionStorage.getItem('jwtToken');
    try {
       await axios.delete('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/customercare/faq_delete',
      //await axios.delete('http://localhost:8032/customercare/noti_delete',
      { params:{faqSeq : faqSeq} }, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
      onDataUpdate(); // 상위 컴포넌트에 데이터 업데이트 알림
    } catch (error) {
      console.error('삭제 오류:', error);
    }
  };

 const handleUpdate = (faq) => {
    handleOpenModal(faq); // 수정 모드로 변경 (모달 열기)
  };


  return (
    <>
      <div style={{
        textAlign: 'left',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginLeft: '10%',
        color: '#28a7e1',
        marginTop: '5px'
      }}>
        공지사항 관리
        </div>
      <Button className="notiInsertBtn" onClick={() => handleOpenModal(null)}>공지사항 추가</Button>
      <br/>

      {/* 모달 컴포넌트 */}
      <Modal
        open={openModal}
        onClose={handleCloseModal}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="modal-content">
          <h2 id="modal-title">{selectedFaq ? '공지사항 수정' : '공지사항 추가'}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>공지사항 제목</Form.Label>
              <Form.Control
              type="text"
              name="faqTitle"
              placeholder="제목을 입력하세요~"
              defaultValue={selectedFaq ? selectedFaq.faqTitle : ''}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>공지사항 내용</Form.Label>
              <Form.Control
                as="textarea"
                name="faqContent"
                placeholder="내용을 입력하세요~"
                rows={3}
                defaultValue={selectedFaq ? selectedFaq.faqContent : ''}  // 수정 모드일 때 기존 내용 표시
              />
            </Form.Group>
            <input type="hidden" name="userSeq" value={11} />
            <Button className='notiModalInsertBtn' type='submit'>{selectedFaq ? '수정' : '추가'}</Button>
          </Form>
        </div>
      </Modal>
      <div claasName='container'>
      <Accordion defaultActiveKey="0" className="accordion-custom">
        {data.length > 0 ? (
          data.map((faq) => (
            <Accordion.Item key={faq.faqSeq} eventKey={`${faq.faqSeq}`}>
              <Accordion.Header>{faq.faqTitle}</Accordion.Header>
              <Accordion.Body>
                {faq.faqContent}
                <br />
                <br />
                {formatDate(faq.faqRegdate)}
                <br />
                <br />
                <Button className="notiUpdateBtn" onClick={() => handleUpdate(faq)}>수정</Button>&nbsp;&nbsp;
                <Button className="notiDeleteBtn" onClick={() => handleDelete(faq.faqSeq)}>삭제</Button>
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div>공지사항이 없습니다.</div>
        )}
      </Accordion>
      </div>
    </>
  );
};

export default Faq_emp;