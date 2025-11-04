import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination } from "swiper/modules";

const MousewheelControlSlider = () => {
  return (
    <div className="col-xxl-4 col-md-12 col-lg-6 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Mousewheel Control Swiper</h5>
        </div>
        <div className="panel-body vertical-slider-container">
          <Swiper
            className="mousewheel-control-swiper"
            direction="vertical"
            loop={true}
            slidesPerView={1}
            mousewheel={true}
            pagination={{ clickable: true, dynamicBullets: true }}
            modules={[Mousewheel, Pagination]}
            autoHeight={true}
            style={{
              height: "100%",
              aspectRatio: 472 / 257.45,
            }}
          >
            <SwiperSlide>
              <img src="/img/bg-img/slider-5.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-6.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-7.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default MousewheelControlSlider;
