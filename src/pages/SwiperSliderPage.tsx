import CustomPaginationSlider from "../components/slider/CustomPaginationSlider";
import DefaultSlider from "../components/slider/DefaultSlider";
import EffectCoverFlowSlider from "../components/slider/EffectCoverFlowSlider";
import EffectCreativeSlider from "../components/slider/EffectCreativeSlider";
import EffectFadeSlider from "../components/slider/EffectFadeSlider";
import EffectFlipSlider from "../components/slider/EffectFlipSlider";
import MousewheelControlSlider from "../components/slider/MousewheelControlSlider";
import NavigationSlider from "../components/slider/NavigationSlider";
import PaginationFractionSlider from "../components/slider/PaginationFractionSlider";
import PaginationProgressSlider from "../components/slider/PaginationProgressSlider";
import PaginationScrollbarSlider from "../components/slider/PaginationScrollbarSlider";
import PaginationSlider from "../components/slider/PaginationSlider";
import ResponsiveSlider from "../components/slider/ResponsiveSlider";
import VerticalSlider from "../components/slider/VerticalSlider";

const SwiperSliderPage = () => {
  return (
    <div className="row g-4 swiper-sliders-container">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Swiper Slider</h6>
        </div>
      </div>

      <DefaultSlider />

      <NavigationSlider />

      <PaginationSlider />

      <PaginationFractionSlider />

      <CustomPaginationSlider />

      <PaginationProgressSlider />

      <PaginationScrollbarSlider />

      <VerticalSlider />

      <MousewheelControlSlider />

      <EffectFadeSlider />

      <EffectFlipSlider />

      <EffectCreativeSlider />

      <EffectCoverFlowSlider />

      <ResponsiveSlider />
    </div>
  );
};
export default SwiperSliderPage;
