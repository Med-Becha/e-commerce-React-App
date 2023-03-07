import { Card, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

const CategoryCardComponent = ({ category, idx }) => {
  console.log(category);
  return (
    <LinkContainer to={`/product-list/category/${category.name}`}>
      <Card>
        <Card.Img
          crossOrigin="anonymous"
          variant="top"
          src={category.image ?? null}
        />
        <Card.Body>
          <Card.Title>{category.name}</Card.Title>
          <Card.Text>{category.description}</Card.Text>
        </Card.Body>
      </Card>
    </LinkContainer>
  );
};

export default CategoryCardComponent;
