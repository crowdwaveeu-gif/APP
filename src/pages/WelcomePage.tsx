import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import CrowdWaveLogo from "../components/utils/CrowdWaveLogo";

const WelcomePage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel welcome-panel">
        <div className="static-body my-5">
          <div className="panel bg-transparent">
            <div className="panel-body">
              <div className="logo d-flex justify-content-center">
                <CrowdWaveLogo size="large" variant={darkMode ? "white" : "primary"} />
              </div>
              <div className="part-txt text-center">
                <h2>Welcome to CrowdWave</h2>
                <p>
                  Advanced courier management system that delivers excellence 
                  with every package, every time.
                </p>
                <Link to="/" className="btn btn-primary px-3">
                  Go To Dashboard
                </Link>
              </div>
              <div className="part-img w-50 m-auto">
                <img src="/img/bg-img/welcome-img.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default WelcomePage;
