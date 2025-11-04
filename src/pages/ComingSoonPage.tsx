import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const ComingSoonPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="panel coming-soon-panel">
        <div className="panel-body h-100 d-flex flex-column align-items-center justify-content-center">
          <div className="part-img">
            <img src="/img/bg-img/coming-soon.png" alt="coming-soon" />
          </div>
          <div className="part-txt">
            <Link to="/" className="btn btn-primary">
              Go To Home
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
export default ComingSoonPage;
