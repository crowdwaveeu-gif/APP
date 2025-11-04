import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";
import AuthForm2 from "../components/forms/AuthForm2";
import AuthTopLogo from "../components/auth/AuthTopLogo";
const LoginPage2 = () => {
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
            <AuthForm2 />
            <div className="other-option">
              <p className="mb-0">
                Don't have an account?{" "}
                <Link
                  to="/registration-2"
                  className="text-white text-decoration-underline"
                >
                  Create
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LoginPage2;
