import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Notification.css';

const Notification = ({ data = [] }) => {
  // 날짜를 'YYYY/MM/DD' 형식으로 변환하는 함수
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, '0'); // 날짜가 한 자리일 때 앞에 '0' 추가

    return `${year}/${month}/${day}`;
  };



  return (
    <>
      <div style={{
        textAlign: 'right',
        fontSize: '1.5rem',
        fontWeight: 'bold',
        marginRight: '200px',
        color: '#28a7e1'
      }}>
        공지사항
      </div>
      
      {/* <Accordion defaultActiveKey="0" className="accordion-custom">
        {data.length > 0 ? (
          data.map((notification) => (
            <Accordion.Item key={notification.notiSeq} eventKey={`${notification.notiSeq}`}>
              <Accordion.Header>{notification.notiTitle}</Accordion.Header>
              <Accordion.Body>
                {notification.notiContent}
                <br />
                <br />
                {formatDate(notification.notiRegdate)}
              </Accordion.Body>
            </Accordion.Item>
          ))
        ) : (
          <div>공지사항이 없습니다.</div>
        )}
      </Accordion> */}

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

export default Notification;
