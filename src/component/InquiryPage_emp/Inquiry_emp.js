import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './Inquiry_emp.css'; // CSS 파일을 임포트

const Inquiry_emp = ({ inquiries = [] }) => {
  const [showModal, setShowModal] = useState(false); // 모달 열림/닫힘 상태
  const [selectedInquiry, setSelectedInquiry] = useState(null); // 현재 선택된 문의

  const handleShowModal = (inquiry) => {
    setSelectedInquiry(inquiry); // 클릭된 문의 저장
    setShowModal(true); // 모달 열기
  };

  const handleCloseModal = () => {
    setShowModal(false); // 모달 닫기
    setSelectedInquiry(null); // 선택된 문의 초기화
  };

  const handleSendReply = () => {
    // 답변 보내기 처리 로직 작성
    alert('답변이 성공적으로 전송되었습니다!');
    handleCloseModal();
  };

  return (
    <div className="inquiry-list-container">
      {/* inquiries가 유효한 배열인지 확인하고 map을 사용 */}
      {Array.isArray(inquiries) && inquiries.length > 0 ? (
        inquiries.map((inquiry, index) => (
          <Card key={index} className="inquiry-card">
            <Card.Body className="inquiry-card-body">
              <div>
                <Card.Title>{inquiry.inqTitle}</Card.Title>
                <Card.Text>{inquiry.inqRegdate}</Card.Text>
              </div>
              <Button variant="primary" onClick={() => handleShowModal(inquiry)}>
                문의 확인하기
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
            <>
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
                  {selectedInquiry.files && selectedInquiry.files.map((file, i) => (
                    <div key={i}>{file.name}</div>
                  ))}
                </Form.Group>
                <hr />
                <Form.Group controlId="replyContent">
                  <Form.Label>문의 답변</Form.Label>
                  <Form.Control as="textarea" rows={3} placeholder="답변 내용을 입력하세요" />
                </Form.Group>
                <Form.Group controlId="replyFiles" className="mt-3">
                  <Form.Label>첨부파일</Form.Label>
                  <Form.Control type="file" multiple />
                </Form.Group>
              </Form>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleSendReply}>
            보내기
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Inquiry_emp;
