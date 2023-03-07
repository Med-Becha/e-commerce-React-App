import {
  Row,
  Col,
  Container,
  Image,
  ListGroup,
  Form,
  Button,
  Alert,
} from "react-bootstrap";
import { Rating } from "react-simple-star-rating";
import AddedToCartMessageComponent from "../../Components/AddedToCartMessageComponent";
import React, { useRef, useState, useEffect } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";
import { EffectCube, Pagination, Autoplay } from "swiper";
import "./styles.css";

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
  const [productReviewed, setProductReviewed] = useState(false);

  const messagesEndRef = useRef(null);

  const addToCartHandler = () => {
    reduxDispatch(addToCartReduxAction(id, quantity));
    setShowCartMessage(true);
  };

  useEffect(() => {
    if (productReviewed) {
      setTimeout(() => {
        messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
      }, 500);
    }
  }, [productReviewed]);

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
  }, [id, productReviewed]);

  const sendReviewHandler = (e) => {
    e.preventDefault();
    const form = e.currentTarget.elements;
    const formInputs = {
      comment: form.comment.value,
      rating: form.rating.value,
    };
    if (e.currentTarget.checkValidity() === true) {
      writeReviewApiRequest(product._id, formInputs)
        .then((data) => {
          if (data === "review created") {
            setProductReviewed("You successfuly reviewed the page!");
          }
        })
        .catch((er) =>
          setProductReviewed(
            er.response.data.message
              ? er.response.data.message
              : er.response.data
          )
        );
    }
  };

  return (
    <div className="m-4 ">
      <AddedToCartMessageComponent
        showCartMessage={showCartMessage}
        setShowCartMessage={setShowCartMessage}
      />
      <Row className="mt-5">
        {loading ? (
          <h2>Loading product details ...</h2>
        ) : error ? (
          <h2>{error}</h2>
        ) : (
          <>
            <Col style={{ zIndex: 1 }} md={4} >
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
                modules={[EffectCube, Pagination ,Autoplay]}
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
                  <ListGroup variant="flush">
                    <ListGroup.Item>
                      <h1>{product.name}</h1>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Rating
                        readonly
                        size={20}
                        initialValue={product.rating}
                      />{" "}
                      ({product.reviewsNumber})
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>{product.description}</ListGroup.Item>
                  </ListGroup>
                </Col>
                <Col md={4}>
                  <ListGroup>
                    <ListGroup.Item>
                      Status: {product.count > 0 ? "in stock" : "out of stock"}
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Price: <span className="fw-bold">${product.price}</span>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      Quantity:
                      <Form.Select
                        value={quantity}
                        onChange={(e) => setQuantity(e.target.value)}
                        size="lg"
                        aria-label="Default select example"
                      >
                        {[...Array(product.count).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </Form.Select>
                    </ListGroup.Item>
                    <ListGroup.Item>
                      <Button onClick={addToCartHandler} variant="danger">
                        Add to cart
                      </Button>
                    </ListGroup.Item>
                  </ListGroup>
                </Col>
              </Row>
            </Col>
          </>
        )}
      </Row>
      <Row>
        {console.log("to do random products in product details page from productDetailsPageComponent")}
      </Row>
    </div>
  );
};

export default ProductDetailsPageComponent;
