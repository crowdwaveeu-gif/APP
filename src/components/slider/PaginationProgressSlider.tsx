import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

const PaginationProgressSlider = () => {
  return (
    <div className="col-xxl-4 col-md-12 col-lg-6 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Pagination Progress Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            pagination={{
              type: "progressbar",
            }}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            modules={[Autoplay, Pagination]}
            className="pagination-progress-swiper"
          >
            <SwiperSlide>
              <img src="/img/bg-img/slider-6.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-7.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-8.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default PaginationProgressSlider;
