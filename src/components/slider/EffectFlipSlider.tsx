import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFlip } from "swiper/modules";
import "swiper/css/effect-flip";

const EffectFlipSlider = () => {
  return (
    <div className="col-xxl-4 col-md-12 col-lg-6 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Effect Flip Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            className="effect-flip-swiper"
            slidesPerView={1}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            pagination={{ clickable: true, dynamicBullets: true }}
            effect="flip"
            modules={[Autoplay, Pagination, EffectFlip]}
          >
            <SwiperSlide>
              <img src="/img/bg-img/slider-1.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-2.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-3.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default EffectFlipSlider;
