import "swiper/css";
import "swiper/css/pagination";
import React, { useRef,  } from "react";
import { Autoplay } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "./styles2.css";
import { useNavigate } from "react-router-dom";
import logo from "../logo.png"
import acer from "./logo/acer.png";
import appel from "./logo/apple.png";
import asus from "./logo/asus.png";
import dell from "./logo/dell.png";
import hp from "./logo/hp.png";
import huawei from "./logo/huawei.png";
import lenovo from "./logo/lenovo.png";
import msi from "./logo/msi-logo_b.png";
import oppo from "./logo/oppo.png";
import samsung from "./logo/samsung.png";
import xiaomi from "./logo/xiaomi.png";

const FooterComponent = () => {
  const navigate = useNavigate()
  const progressCircle = useRef(null);
  const progressContent = useRef(null);
  const onAutoplayTimeLeft = (s, time, progress) => {
    progressCircle.current.style.setProperty("--progress", 1 - progress);
    progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
  };
  return (
    <footer className="w-100">
      <Swiper
      
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
       
        modules={[Autoplay]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper mt-1"
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide   className="bg-transparent">
          <img style={{width:100}} src={acer} alt="" />
        </SwiperSlide>
        <SwiperSlide className="bg-transparent">
          <img style={{width:100}} src={appel} alt="" />
        </SwiperSlide>
        <SwiperSlide className="bg-transparent">
          <img style={{width:100}} src={asus} alt=""/>
        </SwiperSlide>
        <SwiperSlide className="bg-transparent">
          <img style={{width:100}} src={dell} alt="" />
        </SwiperSlide>
        <SwiperSlide className="bg-transparent">
          <img style={{width:100}} src={samsung} alt="" />
        </SwiperSlide>
        <SwiperSlide  className="bg-transparent">
          <img style={{width:100}} src={hp} alt=""  />
        </SwiperSlide>
        <SwiperSlide   className="bg-transparent">
          <img style={{width:100}} src={lenovo} alt=""  />
        </SwiperSlide>
        <SwiperSlide className="bg-transparent">
          <img style={{width:100}} src={huawei} alt="" />
        </SwiperSlide>
      
        <SwiperSlide className="bg-transparent">
          <img style={{width:100}} src={oppo} alt=""  />
        </SwiperSlide>
       
        <SwiperSlide className="bg-transparent">
          <img style={{width:100}} src={xiaomi} alt="xiaomi" />
        </SwiperSlide>
        <SwiperSlide className="bg-transparent">
          <img style={{width:200}}  src={msi} alt=""  />
        </SwiperSlide>
      </Swiper>
      
      <div className="text-center bgcolor mt-3">
        <div className="text-center">
          <a
            href="https://www.facebook.com/sparktek"
            className="mx-1"
            target="_blank"
            rel="noreferrer"
          >
            <i className="bi bi-facebook text-1 display-6"></i>
          </a>
          <a
            href="https://www.instagram.com/spark_tek.tn/"
            className="mx-1"
            target={"_blank"}
            rel="noreferrer"
          >
            <i className="bi bi-instagram text-light display-6 "></i>
          </a>
        </div>
        <div className="text-white m-3">
          content to be developed
        </div>
        <hr />
        <div onClick={()=>navigate("/apropos")}>
          <img style={{height:100}} className="p-1" src={logo} alt=""  />
        </div>
      </div>
    </footer>
  );
};

export default FooterComponent;
