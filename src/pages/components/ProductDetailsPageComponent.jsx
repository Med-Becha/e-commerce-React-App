import { Row, Col, ListGroup, Form, Button } from "react-bootstrap";
import AddedToCartMessageComponent from "../../Components/AddedToCartMessageComponent";
import React, { useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination, Autoplay } from "swiper";
import "./styles.css";
import MetaComponent from "../../Components/MetaComponent"
import { useParams } from "react-router-dom";

const ProductDetailsPageComponent = ({
  addToCartReduxAction,
  reduxDispatch,
  getProductDetails,
  userInfo,
  writeReviewApiRequest,
}) => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const [showCartMessage, setShowCartMessage] = useState(false);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    getProductDetails(id)
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch((er) =>
        setError(
          er.response.data.message ? er.response.data.message : er.response.data
        )
      );
    //eslint-disable-next-line
  }, [id]);

  return (
    <>
    <MetaComponent title={product.name} description={product.description} />
    <div className="mx-4 ">
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="">
        {loading ? (
          <h2>
            Loading product details{" "}
            <div className="spinner-border" role="status">
              <span className="sr-only"></span>
            </div>
          </h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col style={{ zIndex: 1 }} md={4}>
              <Swiper
                effect={"cube"}
                grabCursor={true}
                cubeEffect={{
                  shadow: true,
                  slideShadows: true,
                  shadowOffset: 20,
                  shadowScale: 0.94,
                }}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                pagination={true}
                modules={[EffectCube, Pagination, Autoplay]}
                className="mySwiper"
              >
                <>
                  {product.images
                    ? product.images.map((image, id) => (
                        <SwiperSlide key={id}>
                          <img
                            crossOrigin="anonymous"
                            className="fluid"
                            src={`${image.path ?? null}`}
                            alt={image.path}
                          />
                        </SwiperSlide>
                      ))
                    : null}
                </>
              </Swiper>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={8}>
                  <ListGroup variant="">
                    <ListGroup.Item>
                      <h2>{product.name}</h2>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                    {product.price > 400 ? (
                      <ListGroup.Item className="w-100">
                        Payez en plusieurs fois:
                        <table className="w-100 text-center table">
                          <thead>
                            <tr>
                              <th>3 mois</th>
                              <td>6 mois</td>
                              <td>9 mois</td>
                              <td>12 mois</td>
                            </tr>
                          </thead>
                          <tbody>
                            <tr>
                              <th>{(product.price / 3).toFixed(3)}</th>
                              <td>{((product.price + ((product.price *4)/100)) / 6).toFixed(3)}</td>
                              <td>{((product.price + ((product.price *7)/100)) / 9).toFixed(3)}</td>
                              <td>{((product.price + ((product.price *10)/100)) / 12).toFixed(3)}</td>
                            </tr>
                          </tbody>
                        </table>
                      </ListGroup.Item>
                    ) : null}
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>
                      <h3 className="text-center">
                        Statut:{" "}
                        {product.count > 0 ? (
                          <span className="text-success">en stock</span>
                        ) : (
                          <span className="text-danger">Sur commande 48H</span>
                        )}
                      </h3>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <h3 className="text-center">Prix : {product.price} DT</h3>
                    </ListGroup.Item>
                    <ListGroup.Item className="d-inline-flex">
                      <Form.Select
                      
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        size="lg"
                        aria-label="Default select example"
                        className="mx-1 w-100"
                      >
                        {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                      <Button
                        className="mx-1 w-100"
                        onClick={addToCartHandler}
                        variant="danger"
                      >
                        Ajouter au panier
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
    </div>
    </>
  );
};

export default ProductDetailsPageComponent;
