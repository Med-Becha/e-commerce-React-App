import { Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const AdminLinksComponent = () => {
  const dispatch = useDispatch();
  return (
    <Navbar bg="info" variant="dark" className="rounded mt-3">
      <Nav className="flex-column">
        <LinkContainer to="/admin/orders">
          <Nav.Link>Order</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/products">
          <Nav.Link>Products</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/users">
          <Nav.Link>Users</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/chats">
          <Nav.Link>Messages</Nav.Link>
        </LinkContainer>

        <LinkContainer to="/admin/analytics">
          <Nav.Link>Analytics</Nav.Link>
        </LinkContainer>

        <Nav.Link onClick={() => dispatch(logout())}>logout</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default AdminLinksComponent;
