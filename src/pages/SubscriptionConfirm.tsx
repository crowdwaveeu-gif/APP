import EmailTemplateLogoContainer from "../components/email/EmailTemplateLogoContainer";
import EmailTemplateFooter from "../components/footer/EmailTemplateFooter";
import { useAppSelector } from "../redux/hooks";

const SubscriptionConfirm = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <main
      className={`home-call-center email-template-main ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="email-container">
        <h2 className="page-title">Subscription Confirm</h2>

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
                  <img src="./img/bg-img/confirm.png" alt="Success" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="mail-title">
                  Subscription Success, Here We Go!
                </h2>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mail-body">
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                    Delectus sapiente adipisci at voluptate, possimus,
                    voluptatum molestias magni aut corrupti illum neque commodi
                    dolores ducimus quam odit doloribus nesciunt eos architecto.
                  </p>
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
export default SubscriptionConfirm;
