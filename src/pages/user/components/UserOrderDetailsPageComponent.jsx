import {
  Container,
  Row,
  Col,
  Form,
  Alert,
  ListGroup,
  Button,
} from "react-bootstrap";
import CartItemComponent from "../../../Components/CartItemComponent";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const UserOrderDetailsPageComponent = ({
  userInfo,
  getUser,
  getOrder,
  loadPayPalScript,
}) => {
  const [userAddress, setUserAddress] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isPaid, setIsPaid] = useState(false);
  const [orderButtonMessage, setOrderButtonMessage] = useState("");
  const [cartItems, setCartItems] = useState([]);
  const [cartSubtotal, setCartSubtotal] = useState(0);
  const [isDelivered, setIsDelivered] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);

  const paypalContainer = useRef();


  const { id } = useParams();

  useEffect(() => {
    getUser()
      .then((data) => {
        setUserAddress({
          address: data.address,
          city: data.city,
          country: data.country,
          zipCode: data.zipCode,
          state: data.state,
          phoneNumber: data.phoneNumber,
        });
      })
      .catch((err) => toast("error" ));
      //eslint-disable-next-line 
  }, [id,userInfo]);

  useEffect(() => {
    getOrder(id) 
      .then((data) => {
        setPaymentMethod(data.paymentMethod);
        setCartItems(data.cartItems);
        setCartSubtotal(data.orderTotal.cartSubtotal);
        data.isDelivered
          ? setIsDelivered(data.deliveredAt)
          : setIsDelivered(false);
        data.isPaid ? setIsPaid(data.paidAt) : setIsPaid(false);
        if (data.isPaid) {
          setOrderButtonMessage("Votre commande est terminée");
          setButtonDisabled(true);
        } else {
          if (data.paymentMethod === "pp") {
            setOrderButtonMessage("Payer votre commande");
          } else if (data.paymentMethod === "cod") {
            setButtonDisabled(true);
            setOrderButtonMessage("Attendez votre commande. Vous payez à la livraison");
          }
        }
      })
      .catch((err) => toast("error" ));
      //eslint-disable-next-line
  }, []);

  const orderHandler = () => {
    setButtonDisabled(true);
    if (paymentMethod === "pp") {
      setOrderButtonMessage(
        "To pay for your order click one of the buttons below"
      );
      if (!isPaid) {
        loadPayPalScript(cartSubtotal, cartItems, id, updateStateAfterOrder)
      }
    } else {
      setOrderButtonMessage("Your order was placed. Thank you");
    }
  };

  const updateStateAfterOrder = (paidAt) => {
      setOrderButtonMessage("Thank you for your payment!");
      setIsPaid(paidAt);
      setButtonDisabled(true);
      paypalContainer.current.style = "display: none";
  }

  return (
    <Container fluid>
      <Row className="">
      <div
        className="alert alert-dark text-1 fw-bold mt-2 mx-1 text-center h3 p-2"
        role="alert"
      >
        Détails de la commande
      </div>
        
        <Col md={8}>
          <br />
          <Row>
            <Col md={6}>
              <h2>Livraison</h2>
              <b>Nom</b>: {userInfo.name} {userInfo.lastName} <br />
              <b>Adresse</b> : {userAddress.country}, {userAddress.address}, {userAddress.city}{" "}
              {userAddress.state}, {userAddress.zipCode} <br />
              <b>Téléphone</b>: {userAddress.phoneNumber}
            </Col>
            <Col md={6}>
              <h2>Mode de paiement</h2>
              <Form.Select value={paymentMethod} disabled={true}>
                <option value="pp">PayPal</option>
                <option value="cod">
                Paiement à la livraison (la livraison peut être retardée)
                </option>
              </Form.Select>
            </Col>
            <Row>
              <Col>
                <Alert
                  className="mt-3"
                  variant={isDelivered ? "success" : "danger"}
                >
                  {isDelivered ? (
                    <>Délivré à {isDelivered}</>
                  ) : (
                    <>Non livrée</>
                  )}
                </Alert>
              </Col>
              <Col>
                <Alert className="mt-3" variant={isPaid ? "success" : "danger"}>
                  {isPaid ? <>Payé le {isPaid}</> : <>Paiement à la livraison</>}
                </Alert>
              </Col>
            </Row>
          </Row>
          <br />
          <h2>Articles de commande</h2>
          <ListGroup variant="flush">
            {cartItems.map((item, idx) => (
              <CartItemComponent item={item} key={idx} orderCreated={true} />
            ))}
          </ListGroup>
        </Col>
        <Col md={4}>
          <ListGroup>
            <ListGroup.Item>
              <h3>Résumé de la commande</h3>
            </ListGroup.Item>
            <ListGroup.Item>
            Prix des articles (après taxes):{" "}
              <span className="fw-bold">{cartSubtotal} DT</span>
            </ListGroup.Item>
            <ListGroup.Item>
            Livraison: <span className="fw-bold">7 DT</span>
            </ListGroup.Item>
            <ListGroup.Item>
              Tax: <span className="fw-bold">inclus</span>
            </ListGroup.Item>
            <ListGroup.Item className="text-danger">
            Prix total: <span className="fw-bold">{cartSubtotal + 7} DT</span>
            </ListGroup.Item>
            <ListGroup.Item>
              <div className="d-grid gap-2">
                <Button
                  size="lg"
                  onClick={orderHandler}
                  variant="danger"
                  type="button"
                  disabled={buttonDisabled}
                >
                  {orderButtonMessage}
                </Button>
              </div>
              <div style={{ position: "relative", zIndex: 1 }}>
                <div ref={paypalContainer} id="paypal-container-element"></div>
              </div>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Container>
  );
};

export default UserOrderDetailsPageComponent;



