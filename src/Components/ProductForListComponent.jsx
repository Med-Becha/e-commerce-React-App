import { Card, Button, Row, Col } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions/cartActions";

const ProductForListComponent = ({
  images,
  name,
  description,
  price,
  rating,
  reviewsNumber,
  productId,
}) => {
  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(addToCart());
  };
  return (
    <Card style={{ marginTop: "1.5rem", marginBottom: "" }}>
      <Row>
        <Col lg={5}>
          <LinkContainer to={`/product-details/${productId}`}>
            <Card.Img
              crossOrigin="anonymous"
              variant="top"
              src={images[0] ? images[0].path : ""}
              className="rounded"
            />
          </LinkContainer>
        </Col>
        <Col lg={7}>
          <Card.Body>
            <LinkContainer to={`/product-details/${productId}`}>
              <Card.Title className="cursor-pointer text-dark">
                {name} <span className="text-primary">{price} DT</span>
              </Card.Title>
            </LinkContainer>
            <Card.Text className="text-dark">{description}</Card.Text>
            <Card.Text className="h4">
              <LinkContainer to={`/product-details/${productId}`}>
                <Button variant="outline-primary">details</Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponent;
