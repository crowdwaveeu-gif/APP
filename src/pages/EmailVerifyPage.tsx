import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const EmailVerifyPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel email-verify-panel">
        <div className="static-body my-5">
          <div className="panel bg-transparent">
            <div className="panel-body">
              <div className="logo d-flex justify-content-center">
                <div style={{ 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  color: '#6C5CE7',
                  fontFamily: 'inherit'
                }}>
                  CrowdWave
                </div>
              </div>
              <div className="part-txt text-center">
                <h2>Verify your email</h2>
                <p>
                  Didn't receive an email? <a href="#">Try Again</a>
                </p>
                <Link to="/" className="btn btn-primary px-3">
                  Click To Verify
                </Link>
              </div>
              <div className="part-img w-75 m-auto">
                <img src="/img/bg-img/verify-email.png" alt="image" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default EmailVerifyPage;
