import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './InquiryMy_emp.css'; // CSS 파일을 임포트
import axios from 'axios';

const Inquiry_emp = ({ inquiries = [] }) => {
  const [showModal, setShowModal] = useState(false); // 모달 열림/닫힘 상태
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 현재 선택된 문의

  // 날짜를 'YYYY/MM/DD' 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0'); // 날짜가 한 자리일 때 앞에 '0' 추가

    return `${year}/${month}/${day}`;
  };


  const handleShowModal = (inquiry) => {
    setSelectedInquiry(inquiry); // 클릭된 문의 저장
    setShowModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
    setSelectedInquiry(null); // 선택된 문의 초기화
  };

const handleSendReply = async (event) => {
  event.preventDefault(); 
  const formData = new FormData(event.target);
  const token = sessionStorage.getItem('jwtToken');
  try {
    await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/customercare/inquiry_insert', 
      // await axios.post('http://localhost:8032/customercare/answer_insert',
      formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    alert("문의에 답변하였습니다!");
    // navigate("/InquiryMyPage");
  } catch (error) {
    console.error('폼 제출 오류:', error);
  }
}

  return (
    <div className="inquiry-list-container">
      <div className="centered-text">11님의 문의 답변 리스트</div>
      {/* inquiries가 유효한 배열인지 확인하고 map을 사용 */}
      
      {Array.isArray(inquiries) && inquiries.length > 0 ? (
        inquiries.map((inquiry, index) => (
          <Card key={index} className="inquiry-card">
            <Card.Body className="inquiry-card-body">
              <div>
                <Card.Title>{inquiry.inqTitle}</Card.Title>
                <Card.Text>문의 날짜 : {formatDate(inquiry.inqRegdate)}</Card.Text>
              </div>
              <Button className='inqBtn' onClick={() => handleShowModal(inquiry)}>
                내 답변 확인하기
              </Button>
            </Card.Body>
          </Card>
        ))
      ) : (
        <div>문의사항이 없습니다.</div>
      )}

      {/* 모달 컴포넌트 */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>문의 확인</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-body-content">
          {selectedInquiry && (
            <Form>
              <Form.Group controlId="inquiryTitle">
                <Form.Label>문의 제목</Form.Label>
                <Form.Control type="text" defaultValue={selectedInquiry.inqTitle} readOnly />
              </Form.Group>
              <Form.Group controlId="inquiryContent">
                <Form.Label>문의 내용</Form.Label>
                <Form.Control as="textarea" rows={3} defaultValue={selectedInquiry.inqContent} readOnly />
              </Form.Group>
              <Form.Group controlId="inquiryFiles">
                <Form.Label>첨부파일</Form.Label>
                {Array.isArray(selectedInquiry.inqFile) && selectedInquiry.inqFile.length > 0 ? (
                  selectedInquiry.inqFile.map((file, i) => (
                    <div key={i}>{file.oname}</div>
                  ))
                ) : (
                  <div>첨부파일이 없습니다~!</div>
                )}
              </Form.Group>
              <hr />
              <Form.Group controlId="replyContent">
              <Form.Label>문의 답변</Form.Label>
                <Form.Control
                  as="textarea"
                  name="inqAnswer"
                  rows={3}
                  defaultValue={selectedInquiry?.inqAnswer?.inqAnswer || ''} // 안전하게 접근하고 기본값 제공
                  readOnly
                />
              </Form.Group>
              <Form.Group controlId="formFileMultiple" className="mb-3">
                <Form.Label>첨부파일</Form.Label>
                {Array.isArray(selectedInquiry.inqAnswer.inqFile) && selectedInquiry.inqAnswer.inqFile.length > 0 ? (
                  selectedInquiry.inqAnswer.inqFile.map((file, i) => (
                    <div key={i}>{file.oname}</div>
                  ))
                ) : (
                  <div>첨부파일이 없습니다~!</div>
                )}
              </Form.Group>
              <input type="hidden" name="inqSeq" value={selectedInquiry.inqSeq}/>
              <input type="hidden" name="userSeq" value={11} />
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button className='modalCloseBtn' onClick={handleCloseModal}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>

    </div>
  );
};

export default Inquiry_emp;
