import { Form } from "react-bootstrap";

const PriceFilterComponent = ({price, setPrice}) => {
  return (
    <>
      <Form.Label>
        <span className="fw-bold">Prix ne dépassant pas :</span> {price} DT
      </Form.Label>
      <Form.Range min={1} max={10000} step={1} defaultValue={10000} onChange={(e) => setPrice(e.target.value)} />
    </>
  );
};

export default PriceFilterComponent;

