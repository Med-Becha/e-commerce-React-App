import { Form } from "react-bootstrap";

const SortOptionsComponent = ({ setSortOption }) => {
  return (
    <Form.Select onChange={(e)=>setSortOption(e.target.value)} aria-label="Default select example">
      <option >Trier par</option>
      <option value="price_1">Prix croissants</option>
      <option value="price_-1">Prix décroissants</option>
      <option value="name_1">Nom A-Z</option>
      <option value="name_-1">Nom Z-A</option>
    </Form.Select>
  );
};

export default SortOptionsComponent;


