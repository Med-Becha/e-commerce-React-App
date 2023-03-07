import { Button } from "react-bootstrap";

const RemoveFromCartComponent = ({
  productID,
  orderCreated,
  quantity,
  price,
  removeFromCartHandler = false,
}) => {
  return (
    <Button
    className=" w-100"
      disabled={orderCreated}
      type="button"
      variant="outline-info"
      onClick={
        removeFromCartHandler
          ? () => removeFromCartHandler(productID, quantity, price)
          : undefined
      }
    >
      <i  className="bi bi-trash text-danger"></i>
    </Button>
  );
};

export default RemoveFromCartComponent;
