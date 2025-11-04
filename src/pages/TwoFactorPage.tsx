import { Link } from "react-router-dom";
import { useAppSelector } from "../redux/hooks";

const TwoFactorPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content login-panel two-factor-panel">
        <div className="container">
          <div className="row g-4 align-items-center">
            <div className="col-lg-6">
              <div className="text-center text-lg-start mt-5 mb-4">
                <Link to="/" style={{ 
                  fontSize: '28px', 
                  fontWeight: 'bold', 
                  color: '#6C5CE7',
                  textDecoration: 'none',
                  fontFamily: 'inherit'
                }}>
                  CrowdWave
                </Link>
              </div>
              <p className="text-center text-lg-start mb-lg-0 mb-4">
                It's the Bright One, it's the Right One, that's Business.
              </p>
            </div>

            <div className="col-lg-6">
              <div className="static-body my-4">
                <div className="panel bg-transparent">
                  <div className="panel-body">
                    <div className="part-img w-25 m-auto mb-lg-5 mb-4 px-lg-4">
                      <img src="/img/bg-img/phone.png" alt="image" />
                    </div>
                    <div className="part-txt text-center">
                      <h2>Two-Factor Verification</h2>
                      <p className="mb-2">
                        Enter the verification code we sent to
                      </p>
                      <p className="fw-semibold fs-5 mb-lg-4 mb-0">
                        ********678
                      </p>
                    </div>
                    <div className="verification-area text-center">
                      <div id="otp_target"></div>
                      <p className="mb-4">Type your 6 digit security code</p>
                      <button className="btn btn-primary px-3 security-code-submit">
                        Submit
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
export default TwoFactorPage;
