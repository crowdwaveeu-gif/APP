import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const PaginationFractionSlider = () => {
  return (
    <div className="col-xxl-4 col-md-12 col-lg-6 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Pagination Fraction Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            pagination={{ type: "fraction" }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay, Pagination]}
            className="pagination-fraction-swiper"
          >
            <SwiperSlide>
              <img src="/img/bg-img/slider-10.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-1.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-2.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default PaginationFractionSlider;
