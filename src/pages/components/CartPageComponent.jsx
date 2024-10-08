import { Container, Row, Col, Alert, ListGroup, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import CartItemComponent from "../../Components/CartItemComponent";

const CartPageComponent = ({
  addToCart,
  cartItems,
  removeFromCart,
  cartSubtotal,
  reduxDispatch,
}) => {
  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Es-tu sûr?")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  return (
    <div className="text-center ">
      <div
        className="alert text-1 alert-dark fw-bold mx-3 text-center h3 p-2"
        role="alert"
      >
        PANIER <i className="bi bi-bag"></i>
      </div>
      <Container fluid>
        <Row className="mt-4">
          <Col md={8}>
            {cartItems && cartItems.length === 0 ? (
              <Alert variant="dark"  className="text-1">Votre panier est vide</Alert>
            ) : (
              <ListGroup variant="flush">
                {cartItems.map((item, idx) => (
                  <CartItemComponent
                    item={item}
                    key={idx}
                    changeCount={changeCount}
                    removeFromCartHandler={removeFromCartHandler}
                  />
                ))}
              </ListGroup>
            )}
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>
                Total : {cartItems.length}{" "}
                  {cartItems.length === 1 ? "Produit" : "produits"}
                </h3>
              </ListGroup.Item>
              <ListGroup.Item>
             <h3> Prix: <span className="text-primary">{cartSubtotal} DT</span></h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <LinkContainer to="/user/cart-details">
                  <Button disabled={cartSubtotal === 0} className="w-100 text-1" variant="secondary" type="button">
                  Passer à la caisse
                  </Button>
                </LinkContainer>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CartPageComponent;
