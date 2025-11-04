import "aos/dist/aos.css";

import FadeAnimation from "../components/animation/FadeAnimation";
import FlipAnimation from "../components/animation/FlipAnimation";
import ZoomAnimation from "../components/animation/ZoomAnimation";

const AnimationPage = () => {
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Animation</h6>
        </div>
      </div>
      <FadeAnimation />
      <FlipAnimation />
      <ZoomAnimation />
    </div>
  );
};
export default AnimationPage;
