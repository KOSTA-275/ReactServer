import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';



  const Inquiry = () => {

  const navigate = useNavigate();
  const handleSubmit = async (event) => {
  event.preventDefault(); 
  const formData = new FormData(event.target);
  const token = sessionStorage.getItem('jwtToken');
  try {
    // await axios.post('http://ec2-3-35-253-143.ap-northeast-2.compute.amazonaws.com:8088/customercare/inquiry_insert', 
      await axios.post('http://localhost:8032/customercare/inquiry_insert',
      formData, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    alert("문의 성공!");
    navigate("/IndexPage");
  } catch (error) {
    console.error('폼 제출 오류:', error);
  }
}

  return (
    <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>문의 제목</Form.Label>
        <Form.Control type="text" name="inqTitle" placeholder="문의 제목을 입력 해 주세요~~" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>문의 내용</Form.Label>
        <Form.Control as="textarea" name="inqContent" placeholder="문의 내용을 입력 해 주세요~~" rows={5} />
      </Form.Group>
      <Form.Group controlId="formFileMultiple" className="mb-3">
        <Form.Label>첨부파일</Form.Label>
        <Form.Control type="file" name="ufiles" size="sm" multiple />
      </Form.Group>
      <input type='hidden' name='userSeq' value={111}/>
      <Button className="inqInsertButton" type="submit">문의</Button>
    </Form>
    </div>
  );
}

export default Inquiry;