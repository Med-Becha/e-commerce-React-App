import { Link } from "react-router-dom";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, } from 'swiper';
import "./styles.css";
import 'swiper/css';

const ProductCarouselComponent = ({ bestSellers }) => {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty('--progress', 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };

  return bestSellers.length > 0 ? (
    <>
      <Swiper
         spaceBetween={30}
         centeredSlides={true}
         autoplay={{
           delay: 2500,
           disableOnInteraction: false,
         }}
         pagination={{
           clickable: true,
         }}
         navigation={false}
         modules={[Autoplay, ]}
         onAutoplayTimeLeft={onAutoplayTimeLeft}
         className="mySwiper"
      >
        {bestSellers.map((item, idx) => (
          
            <SwiperSlide key={idx}>
              {" "}
              <Link className="text-decoration-none text-1"  to={`/product-details/${item._id}`}>
                <h5>Bestseller in {item.category} Category</h5>
              <img
                crossOrigin="anonymous"
                //  className="d-block w-100"
                style={{ width: "350px", objectFit: "cover", height: "auto", display:"block" }}
                src={item.images ? item.images[0].path : null}
                alt="First slide"
              />
              {item.name}
              </Link>
            </SwiperSlide>     
        ))}
      </Swiper>
    </>
  ) : null;
};

export default ProductCarouselComponent;
