import EmailTemplateLogoContainer from "../components/email/EmailTemplateLogoContainer";
import EmailTemplateFooter from "../components/footer/EmailTemplateFooter";
import { useAppSelector } from "../redux/hooks";

const WelcomeMailPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center email-template-main ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="email-container">
        <h2 className="page-title">Welcome</h2>

        <table>
          <tbody>
            <tr>
              <td>
                <EmailTemplateLogoContainer />
              </td>
            </tr>
            <tr>
              <td>
                <div className="mail-img-2">
                  <img src="/img/bg-img/welcome.png" alt="Welcome" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="mail-title">Welcome To CrowdWave</h2>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mail-body">
                  <p>
                    We created a personal account for you. Please confirm your
                    email address and use our service to the maximum.
                  </p>
                  <a
                    href="#"
                    className="mail-primary-button mb-30"
                    target="_blank"
                  >
                    Confirm Email
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
export default WelcomeMailPage;
