import OtherAuthOptions from "../components/auth/OtherAuthOptions";
import AuthForm from "../components/forms/AuthForm";
import { useAppSelector } from "../redux/hooks";
import AuthTopLogo from "../components/auth/AuthTopLogo";

const LoginStatusPage = () => {
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
            <h3 className="panel-title">Sign in</h3>
            <div className="login-status">
              <div className="msg-success alert alert-success py-2 px-3 rounded mb-4 fs-14">
                <i className="fa-regular fa-check me-2"></i> Login Successfully
              </div>
              <div className="msg-error alert alert-danger py-2 px-3 rounded mb-4 fs-14">
                <i className="fa-regular fa-circle-exclamation me-2"></i>{" "}
                Invalid Username/Password
              </div>
            </div>
            <AuthForm />
            <OtherAuthOptions />
          </div>
        </div>
      </div>
    </main>
  );
};
export default LoginStatusPage;
