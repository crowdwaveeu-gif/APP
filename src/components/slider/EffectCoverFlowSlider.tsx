import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, EffectCoverflow, Autoplay } from "swiper/modules";
import "swiper/css/effect-coverflow";

const EffectCoverFlowSlider = () => {
  return (
    <div className="col-12">
      <div className="panel">
        <div className="panel-header">
          <h5>Effect Coverflow Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            className="effect-coverflow-swiper"
            slidesPerView={3}
            loop={true}
            centeredSlides={false}
            spaceBetween={50}
            pagination={{ clickable: true, dynamicBullets: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            modules={[Pagination, EffectCoverflow, Autoplay]}
            breakpoints={{
              1000: {
                slidesPerView: 3,
              },
              480: {
                slidesPerView: 2,
              },
              0: {
                slidesPerView: 1,
              },
            }}
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
            <SwiperSlide>
              <img src="/img/bg-img/slider-4.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-5.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-6.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default EffectCoverFlowSlider;
