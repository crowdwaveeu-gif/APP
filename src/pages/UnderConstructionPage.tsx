import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const UnderConstructionPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content p-0">
        <div className="panel d-flex align-items-center justify-content-center under-construction-panel">
          <div className="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
            <div className="part-img">
              <img src="/img/bg-img/under-construction.png" alt="coming-soon" />
            </div>
            <div className="part-txt">
              <h2 className="text-white">Under Construction</h2>
              <p className="text-white">
                To make things right we need some time to rebuild
              </p>
              <Link to="/" className="btn btn-primary">
                Go To Home
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default UnderConstructionPage;
