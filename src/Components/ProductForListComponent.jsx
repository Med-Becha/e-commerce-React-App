import { Card, Button, Row, Col, ListGroup } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
const ProductForListComponent = ({
  images,
  name,
  description,
  price,
  productId,
  count,
}) => {
  return (
    <Card className="mb-1">
      <Row>
        <Col lg={3}>
          <LinkContainer to={`/product-details/${productId}`}>
            <Card.Img
              crossOrigin="anonymous"
              variant="top"
              src={images[0] ? images[0].path : ""}
              className="rounded"
            />
          </LinkContainer>
        </Col>
        <Col lg={9} className="d-inline-flex">
          <Card.Body className="w-100">
            <LinkContainer to={`/product-details/${productId}`}>
              <Card.Title className="cursor-pointer text-dark">
                {name}
              </Card.Title>
            </LinkContainer>
            <Card.Text className="text-dark">{description}</Card.Text>
            <Card.Text className="h4">
              <LinkContainer to={`/product-details/${productId}`}>
                <Button variant="outline-primary w-100">
                  details <i className="bi bi-eye"></i>
                </Button>
              </LinkContainer>
            </Card.Text>
          </Card.Body>
          <ListGroup className=" text-center w-25">
            <ListGroup.Item>
              <h3>
                Statut:{" "}
                {count > 1 ? (
                  <span className="text-success">en stock</span>
                ) : (
                  <span className="text-danger">Sur commande 48H</span>
                )}
              </h3>
            </ListGroup.Item>
            <ListGroup.Item className="text-center">
              <h3>
                Prix : <span>{price}</span>
              </h3>
            </ListGroup.Item>
          </ListGroup>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductForListComponent;
