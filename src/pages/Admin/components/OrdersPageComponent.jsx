import { Row, Col, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import AdminLinksComponent from "../../../Components/Admin/AdminLinksComponent";
import { useEffect, useState } from "react";
import { logout } from "../../../redux/actions/userActions";
import { useDispatch } from "react-redux";

const OrdersPageComponent = ({ getOrders }) => {
  const [orders, setOrders] = useState([]);
  const dispatch = useDispatch()
  

  useEffect(() => {
    getOrders()
      .then((orders) => setOrders(orders))
      .catch((err) => dispatch(logout())
      );
    //eslint-disable-next-line 
  }, []);
  return (
    <div className="m-5">
      <Row>
        <Col md={2}>
          <AdminLinksComponent />
        </Col>

        <Col md={10}>
          <h3>Orders: {orders.length}</h3>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
                <th>Delivred</th>
                <th>Payment Method</th>
                <th>Order details</th>
              </tr>
            </thead>
            <tbody>
              {
                orders.map((order, idx) => (
                  <tr key={idx}>
                    <td>{idx + 1}</td>
                    <td>
                        {order.user !== null ? ( <>{order.user.name} {order.user.lastName}</> ) : null}
                      
                    </td>
                    <td>{order.createdAt.substring(0, 10)}</td>
                    <td>{order.orderTotal.cartSubtotal}</td>
                    <td>
                      {order.isDelivered ? (
                        <i className="bi bi-check-lg text-success"></i>
                      ) : (
                        <i className="bi bi-x-lg text-danger"></i>
                      )}
                    </td>
                    <td>{order.paymentMethod === "cod" ? "Paiement a la livraison" : "PayPal"}</td>
                    <td>
                      <Link to={`/admin/order-details/${order._id}`}>Go to order</Link>
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

export default OrdersPageComponent;
