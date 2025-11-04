import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const NavigationSlider = () => {
  return (
    <div className="col-xxl-4 col-md-12 col-lg-6 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Navigation Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            slidesPerView={1}
            loop={true}
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            autoplay={false}
            className="navigation-swiper"
            modules={[Navigation, Autoplay]}
          >
            <SwiperSlide>
              <img src="/img/bg-img/slider-4.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-5.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-6.jpg" alt="image" />
            </SwiperSlide>
            <button className="btn btn-sm btn-icon btn-primary swiper-button-next">
              <i className="fa-solid fa-chevron-right"></i>
            </button>
            <button className="btn btn-sm btn-icon btn-primary swiper-button-prev">
              <i className="fa-solid fa-chevron-left"></i>
            </button>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default NavigationSlider;
