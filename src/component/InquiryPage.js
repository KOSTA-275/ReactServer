import Layout from './layout/Layout'
import LeftMenuTap from './NotificationPage/LeftMenuTap'
import './InquiryPage/InquiryPage.css'
import Inquiry from './InquiryPage/Inquiry'


const InquiryPage_emp = () => {
  return (
    <Layout>
      <div className="app-container">
        <LeftMenuTap className="left-menu" />
        <div className="main-content">
          {/* Notification 컴포넌트에 notifications를 props로 전달 */}
          <Inquiry/>
        </div>
      </div>
    </Layout>
  );
}

export default InquiryPage_emp;