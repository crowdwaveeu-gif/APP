import AuthForm from "../components/forms/AuthForm";
import { useAppSelector } from "../redux/hooks";
import AuthTopLogo from "../components/auth/AuthTopLogo";

const RegistrationPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel">
        <div className="login-body">
          <div className="top d-flex justify-content-between align-items-center">
            <AuthTopLogo />
          </div>

          <div className="bottom">
            <h3 className="panel-title">Registration</h3>
            <AuthForm register />
            <div className="other-option">
              <p>Or continue with</p>
              <div className="social-box d-flex justify-content-center gap-20">
                <a href="#">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-twitter"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-google"></i>
                </a>
                <a href="#">
                  <i className="fa-brands fa-instagram"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default RegistrationPage;
