import OtherAuthOptions from "../components/auth/OtherAuthOptions";
import AuthForm from "../components/forms/AuthForm";
import { useAppSelector } from "../redux/hooks";
import AuthTopLogo from "../components/auth/AuthTopLogo";

const LoginPage3 = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel login-panel-3">
        <div className="container">
          <div className="d-flex align-items-center justify-content-center">
            <div className="login-img-wrap"></div>

            <div className="login-body bg-white">
              <div className="top d-flex justify-content-between align-items-center">
                <AuthTopLogo />
              </div>
              <div className="bottom">
                <h3 className="panel-title">Login</h3>
                <AuthForm />
                <OtherAuthOptions />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default LoginPage3;
