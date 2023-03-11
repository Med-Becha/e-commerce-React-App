import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../Components/Admin/AdminLinksComponent";
import { logout } from "../../../redux/actions/userActions";

import { useState, useEffect } from "react";

const UsersPageComponent = ({ fetchUsers, deleteUser }) => {
  const [users, setUsers] = useState([]);
  const [userDeleted, setUserDeleted] = useState(false);
  
  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteUser(userId);
      if (data === "user removed") {
        setUserDeleted(!userDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchUsers(abctrl)
      .then((res) => setUsers(res))
      .catch((er) => er ?? dispatchEvent(logout()));
    return () => abctrl.abort();
  }, [userDeleted ,fetchUsers]);

  return (
    <div className="m-5">
      <Row className="">
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h3>User List: {users.length}</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Is Admin</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.lastName}</td>
                  <td>{user.email}</td>
                  <td>
                    {user.isAdmin ? (
                      <i className="bi bi-check-lg text-success"></i>
                    ) : (
                      <i className="bi bi-x-lg text-danger"></i>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/edit-user/${user._id}`}>
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(user._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default UsersPageComponent;
