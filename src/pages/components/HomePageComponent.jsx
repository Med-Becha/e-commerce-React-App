import ProductCarouselComponent from "../../Components/ProductCarouselComponent";
import { Row,  Col } from "react-bootstrap";
import MetaComponent from "../../Components/MetaComponent";
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
    //eslint-disable-next-line
  }, [])

  return (
    <>
    <MetaComponent/>
    <div className="px-5">
      
      <ProductCarouselComponent bestSellers={bestSellers} />
      
        <Row xs={1} sm={2} md={3} lg={4} xl={5} className="g-2 ">
          
        {products ? products.map((product,idx) => (
          <div key={idx}>
          <Col>
          <Link  className="text-decoration-none text-1" to={`/product-details/${product._id}`} >
          
          <img className="img-fluid" alt={product.name} src={product.images[0].path}  />
          <h5>{product.name}</h5> <h2 >{product.price} DT</h2>
          </Link>
          </Col>
          </div>
        )) : null}
        </Row>
      
    </div>
    </>
  );
};

export default HomePageComponent;
