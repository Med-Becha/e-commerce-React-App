import { Row, Col, Table, Button } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import AdminLinksComponent from "../../../Components/Admin/AdminLinksComponent";

import { useState, useEffect } from "react";

const ProductsPageComponent = ({ fetchProducts, deleteProduct }) => {
  const [products, setProducts] = useState([]);
  const [productDeleted, setProductDeleted] = useState(false);
  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure?")) {
      const data = await deleteProduct(productId);
      if (data.message === "product removed") {
        setProductDeleted(!productDeleted);
      }
    }
  };

  useEffect(() => {
    const abctrl = new AbortController();
    fetchProducts(abctrl)
      .then((res) => setProducts(res))
      .catch((er) =>
        setProducts([
          {
            name: er.response
              ? er.response
              : er.response,
          },
        ])
      );
    return () => abctrl.abort();
    //eslint-disable-next-line 
  }, [productDeleted]);

  return (
    <div className="m-5">
      <Row>
        <Col md={2}>
          <AdminLinksComponent />
        </Col>
        <Col md={10}>
          <h1>
            Product List{" "}
            <LinkContainer to="/admin/create-new-product">
              <Button variant="primary" size="lg">
                Create new
              </Button>
            </LinkContainer>
          </h1>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Product Name</th>
                <th>selected</th>
                <th>Price</th>
                <th>Category</th>
                <th>Edit/Delete</th>
              </tr>
            </thead>
            <tbody>
              {products.map((item, idx) => (
                <tr key={idx}>
                  <td>{idx + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.selected ? <> <i className="bi  bi-check2"></i></> : <> <i className="bi text-center bi-x-circle"></i></>}</td>
                  <td>{item.price}</td>
                  <td>{item.category}</td>
                  <td>
                    <LinkContainer to={`/admin/edit-product/${item._id}`}>
                      <Button className="btn-sm">
                        <i className="bi bi-pencil-square"></i>
                      </Button>
                    </LinkContainer>
                    {" / "}
                    <Button
                      variant="danger"
                      className="btn-sm"
                      onClick={() => deleteHandler(item._id)}
                    >
                      <i className="bi bi-x-circle"></i>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </div>
  );
};

export default ProductsPageComponent;
