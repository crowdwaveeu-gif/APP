import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

const ChatSlider = () => {
  const userImages = [
    "/img/bg-img/avatar-2.png",
    "/img/bg-img/avatar-3.png",
    "/img/bg-img/avatar-4.png",
    "/img/bg-img/avatar-5.png",
    "/img/bg-img/avatar-6.png",
    "/img/bg-img/avatar.png",
    "/img/bg-img/avatar-2.png",
    "/img/bg-img/avatar-3.png",
    "/img/bg-img/avatar-4.png",
    "/img/bg-img/avatar-5.png",
    "/img/bg-img/avatar-6.png",
    "/img/bg-img/avatar.png",
  ];
  return (
    <div className="position-relative">
      <Swiper
        className="active-members"
        slidesPerView={6}
        spaceBetween={5}
        navigation={{
          prevEl: ".chat-slider-prev",
          nextEl: ".chat-slider-next",
        }}
        loop={true}
        modules={[Navigation]}
        breakpoints={{
          992: {
            slidesPerView: 6,
          },
          576: {
            slidesPerView: 10,
          },
          0: {
            slidesPerView: 8,
          },
        }}
      >
        {userImages.map((image, index) => (
          <SwiperSlide className="single-member" key={index}>
            <button className="btn-flush avatar">
              <img src={image} alt="User" />
              <span className="active-status active"></span>
            </button>
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="chat-slider-nav">
        <button className="chat-slider-prev">
          <i className="fa-light fa-angle-left"></i>
        </button>
        <button className="chat-slider-next">
          <i className="fa-light fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};
export default ChatSlider;
