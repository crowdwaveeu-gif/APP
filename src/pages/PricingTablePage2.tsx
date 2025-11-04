import { useAppSelector } from "../redux/hooks";
const PricingTablePage2 = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="main-content-wrap pricing-table-page-2">
        <div className="main-container">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                <div className="pricing-panel-2">
                  <div className="panel-body d-flex justify-content-center align-items-center">
                    <div className="pricing w-100">
                      <div className="row g-4">
                        <div className="col-lg-4 col-sm-6">
                          <div className="pricing-table bg-white">
                            <div className="top">
                              <p>Bronze Tier</p>
                              <h3>$120</h3>
                              <span>Monthly</span>
                            </div>
                            <div className="middle">
                              <ul>
                                <li>Unlimited Members</li>
                                <li>Unlimited Projects</li>
                                <li>Client Login</li>
                                <li>Unlimited Storage</li>
                                <li>24/7 Support</li>
                              </ul>
                            </div>
                            <div className="bottom">
                              <a href="#" className="btn btn-success">
                                Start Now
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <div className="pricing-table bg-white">
                            <div className="top">
                              <p>Silver Tier</p>
                              <h3>$180</h3>
                              <span>Monthly</span>
                            </div>
                            <div className="middle">
                              <ul>
                                <li>Unlimited Members</li>
                                <li>Unlimited Projects</li>
                                <li>Client Login</li>
                                <li>Unlimited Storage</li>
                                <li>24/7 Support</li>
                              </ul>
                            </div>
                            <div className="bottom">
                              <a href="#" className="btn btn-success">
                                Start Now
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                          <div className="pricing-table bg-white">
                            <div className="top">
                              <p>Gold Tier</p>
                              <h3>$300</h3>
                              <span>Monthly</span>
                            </div>
                            <div className="middle">
                              <ul>
                                <li>Unlimited Members</li>
                                <li>Unlimited Projects</li>
                                <li>Client Login</li>
                                <li>Unlimited Storage</li>
                                <li>24/7 Support</li>
                              </ul>
                            </div>
                            <div className="bottom">
                              <a href="#" className="btn btn-success">
                                Start Now
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
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
export default PricingTablePage2;
