import { useState } from "react";
import OtherAuthOptions from "../components/auth/OtherAuthOptions";
import AuthForm from "../components/forms/AuthForm";
import ChangePasswordForm from "../components/auth/ChangePasswordForm";
import { useAppSelector } from "../redux/hooks";
import AuthTopLogo from "../components/auth/AuthTopLogo";
import { authService } from "../services/authService";

const LoginPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  
  // Check if user is already logged in
  const isLoggedIn = authService.isAuthenticated();

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
            {isLoggedIn && showChangePassword ? (
              <>
                <h3 className="panel-title">Change Password</h3>
                <ChangePasswordForm />
                <div className="text-center mt-3">
                  <button 
                    className="btn btn-link text-white"
                    onClick={() => setShowChangePassword(false)}
                  >
                    <i className="fa-solid fa-arrow-left me-2"></i>
                    Back to Dashboard
                  </button>
                </div>
              </>
            ) : (
              <>
                <h3 className="panel-title">Login</h3>
                <AuthForm />
                <OtherAuthOptions />
                {isLoggedIn && (
                  <div className="text-center mt-3">
                    <button 
                      className="btn btn-link text-white text-decoration-none"
                      onClick={() => setShowChangePassword(true)}
                    >
                      <i className="fa-solid fa-key me-2"></i>
                      Change Password
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </main>
  );
};
export default LoginPage;
