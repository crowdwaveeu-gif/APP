import EmailTemplateLogoContainer from "../components/email/EmailTemplateLogoContainer";
import EmailTemplateFooter from "../components/footer/EmailTemplateFooter";
import { useAppSelector } from "../redux/hooks";

const ResetPasswordMailPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center email-template-main ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="email-container">
        <h2 className="page-title">Reset Password</h2>

        <table>
          <tbody>
            <tr>
              <td>
                <EmailTemplateLogoContainer />
              </td>
            </tr>
            <tr>
              <td>
                <div className="mail-img">
                  <img
                    src="/img/bg-img/reset-password.png"
                    alt="Reset Password"
                    className="invert"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="mail-title">Reset Your Password</h2>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mail-body">
                  <p>Not to worry, we got you! Let's get you a new Password</p>
                  <a
                    href="#"
                    className="mail-primary-button mb-30"
                    target="_blank"
                  >
                    Reset Password
                  </a>
                  <p>
                    Need help? Visit our <a href="#">forum</a>
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <EmailTemplateFooter />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
};
export default ResetPasswordMailPage;
