import Layout from './layout/Layout'
import LeftMenuTap_emp from './NotificationPage_emp/LeftMenuTap_emp'
import './InquiryPage_emp/InquiryPage_emp.css'
import Inquiry_emp from './InquiryPage_emp/Inquiry_emp'


const InquiryPage_emp = () => {

  const inquiries = [
  { title: '문의 제목 1', content:'내용이다~!~!', date: '2024/08/28', userId:'코코낸네님' },
  { title: '문의 제목 2', content:'내용이다~!~!', date: '2024/08/29', userId:'늙은완자' },
  { title: '문의 제목 3', content:'내용이다~!~!', date: '2024/08/30', userId:'백살곤듀' },
  // 추가 문의 항목들...
];
  return (
    <Layout>
      <div className="app-container">
        <LeftMenuTap_emp className="left-menu" />
        <div className="main-content">
          {/* Notification 컴포넌트에 notifications를 props로 전달 */}
          <Inquiry_emp inquiries={inquiries} />
        </div>
      </div>
    </Layout>
  );
}

export default InquiryPage_emp;