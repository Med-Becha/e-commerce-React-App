import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Alert,
  ListGroup,
} from "react-bootstrap";
import CartItemComponent from "../../../Components/CartItemComponent";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const UserCartDetailsPageComponent = ({
  cartItems,
  itemsCount,
  cartSubtotal,
  userInfo,
  addToCart,
  removeFromCart,
  reduxDispatch,
  getUser,
  createOrder,
}) => {
  const [buttonDisable, setButtonDisable] = useState(false);
  const [userAddress, setUserAddress] = useState(false);
  const [missingAddress, setMissingAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const navigate = useNavigate()

  const changeCount = (productID, count) => {
    reduxDispatch(addToCart(productID, count));
  };

  const removeFromCartHandler = (productID, quantity, price) => {
    if (window.confirm("Are you sure?")) {
      reduxDispatch(removeFromCart(productID, quantity, price));
    }
  };

  useEffect(() => {
    getUser()
      .then((data) => {
        if (
          !data.address ||
          !data.city ||
          !data.country ||
          !data.zipCode ||
          !data.phoneNumber
        ) {
          setButtonDisable(true);
          setMissingAddress(
            " Afin de passer commande, remplissez votre profil avec l'adresse correcte, la ville, etc."
          );
        } else {
          setUserAddress({
            address: data.address,
            city: data.city,
            country: data.country,
            zipCode: data.zipCode,
            phoneNumber: data.phoneNumber,
          });
          setMissingAddress(false);
        }
      })
      .catch((error) =>
        console.log(
          error.response.data.message
            ? error.response.data.message
            : error.response.data
        )
      );
  }, [userInfo._id]);

  const orderHandler = () => {
    const orderData = {
      orderTotal: {
        itemsCount: itemsCount,
        cartSubtotal: cartSubtotal,
      },
      cartItems: cartItems.map((item) => {
        return {
          productID: item.productID,
          name: item.name,
          price: item.price,
          image: { path: item.image ? item.image.path ?? null : null },
          quantity: item.quantity,
          count: item.count,
        };
      }),
      paymentMethod: paymentMethod,
    };

    createOrder(orderData)
      .then((data) => {
        if (data) {
          navigate("/user/order-details/" + data._id);
        }
      })
      .catch((error) => console.log(error));
  };

  const choosePayment = (e) => {
    setPaymentMethod(e.target.value);
  };
  return (
    <>
      <div
        className="alert alert-primary fw-bold mt-2 mx-1 text-center h3 p-2"
        role="alert"
      >
        Détails du panier
      </div>
      <Container fluid>
        <Row className="mt-4">
          <Col md={8}>
            <br />
            <Row>
              <Col md={6}>
                <h2 className="">Livraison</h2>
                <b>Nom</b>: {userInfo.name} {userInfo.lastName} <br />
                <b>Adresse</b>: {userAddress.address} {userAddress.city}{" "}
                {userAddress.zipCode} <br />
                <b>Téléphone</b>: {userAddress.phoneNumber}
              </Col>
              <Col md={6}>
                <h2>Mode de paiement</h2>
                <Form.Select onChange={choosePayment}>
                  <option value="cod">Paiement à la livraison</option>
                  <option value="pp" >
                    PayPal
                  </option>
                </Form.Select>
              </Col>
              <Row>
                <Col>
                  <Alert className="mt-3" variant="danger">
                    Non livrés. {missingAddress}
                  </Alert>
                </Col>
                <Col>
                  <Alert className="mt-3" variant="success">
                    Pas encore payé
                  </Alert>
                </Col>
              </Row>
            </Row>
            <br />
            <h2>Produits commandés</h2>
            <ListGroup variant="flush">
              {cartItems.map((item, idx) => (
                <CartItemComponent
                  item={item}
                  key={idx}
                  removeFromCartHandler={removeFromCartHandler}
                  changeCount={changeCount}
                />
              ))}
            </ListGroup>
          </Col>
          <Col md={4}>
            <ListGroup>
              <ListGroup.Item>
                <h3>Résumé de l'ordre</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                Prix des articles (après taxes):{" "}
                <span className="fw-bold">{cartSubtotal} DT</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Livraison: <span className="fw-bold">7 DT</span>
              </ListGroup.Item>
              <ListGroup.Item>
                Timbre Fiscal: <span className="fw-bold">1 DT</span>
              </ListGroup.Item>
              <ListGroup.Item className="text-danger">
                Total price: <span className="fw-bold">{cartSubtotal + 8}</span>
              </ListGroup.Item>
              <ListGroup.Item>
                <div className="d-grid gap-2">
                  <Button
                    size="lg"
                    onClick={orderHandler}
                    variant="danger"
                    type="button"
                    disabled={buttonDisable}
                  >
                    Passer la commande
                  </Button>
                </div>
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default UserCartDetailsPageComponent;
