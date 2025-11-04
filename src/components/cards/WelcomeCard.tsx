import WelcomeCardSlider from "../slider/WelcomeCardSlider";

const WelcomeCard = () => {
  return (
    <div className="card rounded demo-welcome-card shadow">
      <div className="row g-4 h-100 align-items-center justify-content-md-between justify-content-center">
        <div className="col-12 col-sm-10 col-md-6">
          <div className="welcome-content me-xl-5">
            <span className="badge text-bg-primary d-inline-block mb-4">
              Admin &amp; Dashbaord
            </span>
            <h2 className="display-6">
              Webdesh: Dashboard Template for Efficient Management
            </h2>
            <p className="mb-4">
              Empower your control center with intuitive design and advanced
              functionality
            </p>
            <a className="btn btn-lg btn-warning" href="#" target="_blank">
              Purchase Now
            </a>
          </div>
        </div>

        <div className="col-12 col-sm-10 col-md-6">
          <WelcomeCardSlider />
        </div>
      </div>
    </div>
  );
};
export default WelcomeCard;
