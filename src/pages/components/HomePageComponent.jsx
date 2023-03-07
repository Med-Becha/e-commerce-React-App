import ProductCarouselComponent from "../../Components/ProductCarouselComponent";
import { Row,  Col } from "react-bootstrap";

import { useEffect, useState } from "react";
import {toast } from "react-toastify"
import { Link } from "react-router-dom";

const HomePageComponent = ({ getProducts, getBestsellers }) => {
  
  const [bestSellers, setBestsellers] = useState([]);
  const [products, setProducts] = useState([])

  useEffect(() => {
      getBestsellers()
      .then((data) => {
          setBestsellers(data);
      })
      .catch((er) => toast("error", er.message));
      getProducts()
      .then((data) => setProducts(data))
      .catch((er) => toast("error", er));
  }, [])

  return (
    <div className="p-5">
      
      <ProductCarouselComponent bestSellers={bestSellers} />
      
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-2 mt-1">
          
        {products ? products.map((product,idx) => (
          <div key={idx}>
          <Col>
          <Link  className="text-decoration-none text-1" to={`/product-details/${product._id}`} >
          
          <img className="img-fluid" src={product.images[0].path}  />
          <h3>{product.name}</h3><span >{product.price} DT</span>
          </Link>
          </Col>
          </div>
        )) : null}
        </Row>
      
    </div>
  );
};

export default HomePageComponent;
