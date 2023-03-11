import AdminLinksComponent from "../../Components/Admin/AdminLinksComponent";
import AdminChatRoomComponent from "../../Components/Admin/AdminChatRoomComponent";
import { Row, Col} from "react-bootstrap";
import { useSelector } from "react-redux";

const AdminChatsPage = () => {
  const { chatRooms } = useSelector((state) => state.adminChat);
  return (
    <div className="m-5">
      <Row>
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <Row>
            {Object.entries(chatRooms).map((chatRoom, index) => (
              <AdminChatRoomComponent
                key={index}
                chatRoom={chatRoom}
                roomIndex={index + 1}
                socketUser={[0]}
              />
            ))}
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default AdminChatsPage;
