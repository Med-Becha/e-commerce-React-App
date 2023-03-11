import { Row, Col, Image, ListGroup, Form } from "react-bootstrap";
import RemoveFromCartComponent from "./RemoveFromCartComponent"

const CartItemComponent = ({ removeFromCartHandler = false, item, orderCreated = false, changeCount = false }) => {
  return (
    <>
      <ListGroup.Item className="text-center">
        <Row className="g-1">
          <Col md={3}>
            <Image
            className="rounded"
              crossOrigin="anonymous"
              src={item.image ? item.image.path ?? null : null}
              fluid
            />
          </Col>
          <Col md={3}> <h3>{item.name}</h3></Col>
          <Col className=" text-center" md={2}>
            <b className="text-danger"><h2>{item.price} DT</h2></b>
          </Col>
          <Col md={2}>
            <Form.Select onChange={changeCount ? (e) => changeCount(item.productID, e.target.value) : undefined } disabled={orderCreated} value={item.quantity}>
              {[...Array(item.count).keys()].map((x) => (
                <option key={x + 1} value={x + 1}>
                  {x + 1}
                </option>
              ))}
            </Form.Select>
          </Col>
          <Col md={2}>
            <RemoveFromCartComponent
            orderCreated={orderCreated}
            productID={item.productID}
            quantity={item.quantity}
            removeFromCartHandler={removeFromCartHandler ? removeFromCartHandler : undefined} 
            price={item.price} />
          </Col>
        </Row>
      </ListGroup.Item>
      <br />
    </>
  );
};

export default CartItemComponent;

