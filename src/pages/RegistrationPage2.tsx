import AuthTopLogo from "../components/auth/AuthTopLogo";
import AuthForm2 from "../components/forms/AuthForm2";
import { useAppSelector } from "../redux/hooks";
import { Link } from "react-router-dom";

const RegistrationPage2 = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel login-panel-2">
        <div className="login-body login-body-2">
          <div className="top d-flex justify-content-between align-items-center">
            <AuthTopLogo />
          </div>

          <div className="bottom">
            <AuthForm2 register />
            <div className="other-option">
              <p className="mb-0">
                Already have an account?{" "}
                <Link
                  to="/login-2"
                  className="text-white text-decoration-underline"
                >
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default RegistrationPage2;
