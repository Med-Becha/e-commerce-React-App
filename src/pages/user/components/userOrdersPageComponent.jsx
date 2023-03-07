import { Row, Col, Table, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const UserOrderPageComponent = ({ getOrders }) => {
  const [orders, setOrders] = useState([]);
  const { userInfo } = useSelector((state) => state.userRegisterLogin);

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((err) => console.log(err));
  }, []);
  return (
    <>
      <div
        className="alert alert-primary fw-bold mt-2 mx-1 text-center h3 p-2"
        role="alert"
      >
        Mes commandes
      </div>
      <Container>
        {" "}
        <Row>
          <Col md={12}>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Utilisateur</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Livré</th>
                  <th className="text-center ">Détails de la commande</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>{userInfo.name}{" "}{userInfo.lastName}</td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.orderTotal.cartSubtotal} DT </td>
                    <td>
                      {order.isDelivered ? (
                        <i className="bi bi-check-lg text-success"></i>
                      ) : (
                        <i className="bi bi-x-lg text-danger"></i>
                      )}
                    </td>
                    <td className="text-center">
                      <Link to={`/user/order-details/${order._id}`}>
                        Go to order
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserOrderPageComponent;
