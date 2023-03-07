import AdminLinksComponent from "../../Components/Admin/AdminLinksComponent";
import AdminChatRoomComponent from "../../Components/Admin/AdminChatRoomComponent";
import { Row, Col, Container } from "react-bootstrap";

const AdminChatsPage = () => {
  return (
    <Container>
      <Row >
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <Row>
            <AdminChatRoomComponent />
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminChatsPage;
