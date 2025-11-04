import AuthTopLogo from "../components/auth/AuthTopLogo";
import UpdatePasswordForm from "../components/forms/UpdatePasswordForm";
import { useAppSelector } from "../redux/hooks";

const UpdatePasswordPage = () => {
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
            <h3 className="panel-title">Update Password</h3>
            <UpdatePasswordForm />
          </div>
        </div>
      </div>
    </main>
  );
};
export default UpdatePasswordPage;
