import { useAppSelector } from "../redux/hooks";
import CrowdWaveLogo from "../components/utils/CrowdWaveLogo";

const AccountDeactivatedPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel">
        <div className="static-body my-5">
          <div className="panel bg-transparent">
            <div className="panel-body">
              <div className="logo d-flex justify-content-center">
                <CrowdWaveLogo size="large" variant={darkMode ? "white" : "primary"} />
              </div>
              <div className="part-txt text-center">
                <h2>Your account is deactivated</h2>
                <p>
                  A great name is like a great story. It's one that people want
                  to hear again and again.
                </p>
                <a href="index.html" className="btn btn-primary px-3">
                  Go To Home Page
                </a>
              </div>
              <div className="part-img w-50 m-auto">
                <img src="/img/bg-img/deactivated-img.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default AccountDeactivatedPage;
