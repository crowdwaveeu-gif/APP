import { Swiper, SwiperSlide } from "swiper/react";
import { welcomeCardData } from "../../data";
import { Autoplay } from "swiper/modules";

const WelcomeCardSlider = () => {
  return (
    <Swiper
      className="default-swiper"
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      loop={true}
      modules={[Autoplay]}
    >
      {welcomeCardData.map((img, index) => (
        <SwiperSlide key={index}>
          <img className="w-100" src={img} alt="image" />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};
export default WelcomeCardSlider;
