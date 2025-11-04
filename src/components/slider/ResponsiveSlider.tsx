import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

const ResponsiveSlider = () => {
  return (
    <div className="col-12">
      <div className="panel">
        <div className="panel-header">
          <h5>Responsive Breakpoints Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            className="responsive-swiper"
            loop={true}
            pagination={{ clickable: true, dynamicBullets: true }} // Add dynamicBullets property
            spaceBetween={20}
            autoplay={{ delay: 2000, disableOnInteraction: false }}
            breakpoints={{
              576: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 3,
              },
              1200: {
                slidesPerView: 4,
              },
            }}
            modules={[Pagination, Autoplay]}
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
export default ResponsiveSlider;
