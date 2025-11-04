import EmailTemplateLogoContainer from "../components/email/EmailTemplateLogoContainer";
import EmailTemplateFooter from "../components/footer/EmailTemplateFooter";
import { useAppSelector } from "../redux/hooks";

const PromotionPage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);

  return (
    <main
      className={`home-call-center email-template-main ${
        darkMode ? "dark-theme" : "light-theme"
      }`}
    >
      <div className="email-container">
        <h2 className="page-title">Promotion</h2>

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
                  <img src="/img/bg-img/promotion.png" alt="New Arrival" />
                </div>
              </td>
            </tr>
            <tr>
              <td>
                <h2 className="mail-title">
                  Introducing our newest arrivals: the perfect blend of fashion
                  and function.
                </h2>
              </td>
            </tr>
            <tr>
              <td>
                <div className="mail-body">
                  <div className="product-card-list">
                    <div className="product-card">
                      <div className="part-img">
                        <a href="#">
                          <img
                            src="/img/bg-img/product-img-1.jpg"
                            alt="Product"
                          />
                        </a>
                      </div>
                      <div className="part-txt">
                        <span className="product-title">
                          <a href="#">
                            AKG Pro Audio K72 Closed-Back Studio Headphone
                          </a>
                        </span>
                        <span className="product-price">$150.00</span>
                      </div>
                    </div>

                    <div className="product-card">
                      <div className="part-img">
                        <a href="#">
                          <img
                            src="/img/bg-img/product-img-2.png"
                            alt="Product"
                          />
                        </a>
                      </div>
                      <div className="part-txt">
                        <span className="product-title">
                          <a href="#">
                            AKG Pro Audio K72 Closed-Back Studio Headphone
                          </a>
                        </span>
                        <span className="product-price">$150.00</span>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="part-img">
                        <a href="#">
                          <img
                            src="/img/bg-img/product-img-3.jpg"
                            alt="Product"
                          />
                        </a>
                      </div>
                      <div className="part-txt">
                        <span className="product-title">
                          <a href="#">
                            AKG Pro Audio K72 Closed-Back Studio Headphone
                          </a>
                        </span>
                        <span className="product-price">$150.00</span>
                      </div>
                    </div>
                    <div className="product-card">
                      <div className="part-img">
                        <a href="#">
                          <img
                            src="/img/bg-img/product-img-4.jpg"
                            alt="Product"
                          />
                        </a>
                      </div>
                      <div className="part-txt">
                        <span className="product-title">
                          <a href="#">
                            AKG Pro Audio K72 Closed-Back Studio Headphone
                          </a>
                        </span>
                        <span className="product-price">$150.00</span>
                      </div>
                    </div>
                  </div>
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
export default PromotionPage;
