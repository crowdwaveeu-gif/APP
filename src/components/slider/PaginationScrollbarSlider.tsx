import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Scrollbar } from "swiper/modules";

const PaginationScrollbarSlider = () => {
  return (
    <div className="col-xxl-4 col-md-12 col-lg-6 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Pagination Scrollbar Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            scrollbar={{ hide: false }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Scrollbar, Autoplay]}
            className="pagination-scrollbar-swiper"
          >
            <SwiperSlide>
              <img src="/img/bg-img/slider-9.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-10.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-1.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default PaginationScrollbarSlider;
