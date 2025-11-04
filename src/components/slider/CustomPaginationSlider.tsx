import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const CustomPaginationSlider = () => {
  const pagination = {
    clickable: true,
    renderBullet: function (index: number, className: string) {
      return '<span class="' + className + '">' + (index + 1) + "</span>";
    },
  };
  return (
    <div className="col-xxl-4 col-md-12 col-lg-6 col-sm-6">
      <div className="panel">
        <div className="panel-header">
          <h5>Pagination Custom Swiper</h5>
        </div>
        <div className="panel-body">
          <Swiper
            pagination={pagination}
            autoplay={{ delay: 2500, disableOnInteraction: false }}
            className="pagination-custom-swiper"
            modules={[Autoplay, Pagination]}
          >
            <SwiperSlide>
              <img src="/img/bg-img/slider-3.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-4.jpg" alt="image" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="/img/bg-img/slider-5.jpg" alt="image" />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
};
export default CustomPaginationSlider;
