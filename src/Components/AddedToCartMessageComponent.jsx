import { Alert, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const AddedToCartMessageComponent = ({
  showCartMessage,
  setShowCartMessage
}) => {
  const navigate = useNavigate();
    const goBack = () => {
        navigate(-1)
    }
  return (
    <Alert
      show={showCartMessage}
      variant="dark"
      onClose={() => setShowCartMessage(false)}
      dismissible
      className="text-1 text-center"
    >
      <Alert.Heading>Le produit a été ajouté à votre panier !</Alert.Heading>
      <Button variant="secondary" className="text-1" onClick={goBack}>Retourner <i className="bi bi-arrow-90deg-left"></i></Button>{" "}
      <Link to="/cart">
        <Button variant="secondary" className="text-1" >Aller au panier <i className="bi bi-bag"></i></Button>
      </Link>
    </Alert>
  );
};

export default AddedToCartMessageComponent;
