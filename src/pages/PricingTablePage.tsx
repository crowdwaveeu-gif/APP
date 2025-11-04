import { useState } from "react";
import { useAppSelector } from "../redux/hooks";
import PricingHeader from "../components/pricing/PricingHeader";
import {
  monthlyDiscountPlans,
  monthlyPlans,
  yearlyDiscountPlans,
  yearlyPlans,
} from "../data";

const PricingTablePage = () => {
  const darkMode = useAppSelector((state) => state.theme.isDark);
  const [isDiscount, setIsDiscount] = useState<boolean>(false);

  const toggleDiscount = () => {
    setIsDiscount(!isDiscount);
  };
  const [isYearlyPlan, setIsYearlyPlan] = useState<boolean>(false);

  const toggleYearlyPlan = () => {
    setIsYearlyPlan(true);
  };
  const toggleMonthlyPlan = () => {
    setIsYearlyPlan(false);
  };

  return (
    <main
      className={`home-call-center ${darkMode ? "dark-theme" : "light-theme"}`}
    >
      <div className="py-5">
        <div className="main-container">
          <div className="container">
            <div className="row g-4">
              <div className="col-12">
                <div className="panel pricing-panel">
                  <div className="panel-body">
                    <div className="pricing">
                      <div className="plan-type d-flex justify-content-center gap-2 mb-4">
                        <button
                          id="Monthly"
                          className="btn btn-primary"
                          onClick={toggleMonthlyPlan}
                          disabled={!isYearlyPlan}
                        >
                          Monthly
                        </button>
                        <button
                          id="Yearly"
                          className="btn btn-primary"
                          onClick={toggleYearlyPlan}
                          disabled={isYearlyPlan}
                        >
                          Yearly
                        </button>
                      </div>

                      <div className="discount d-flex justify-content-center mb-10">
                        <div className="form-check form-switch">
                          <input
                            className="form-check-input border-primary"
                            type="checkbox"
                            role="switch"
                            id="getDiscount"
                            onChange={toggleDiscount}
                          />
                          <label
                            className="form-check-label"
                            htmlFor="getDiscount"
                          >
                            Save 10% with Digiboard Payments
                          </label>
                        </div>
                      </div>

                      <div className="table-responsive table-wrap">
                        <table className="table table-bordered">
                          <thead>
                            <tr>
                              <th>
                                <div className="table-title">
                                  <h2>Choose Your Plan</h2>
                                </div>
                              </th>
                              <PricingHeader
                                plans={
                                  !isYearlyPlan && !isDiscount
                                    ? monthlyPlans
                                    : !isYearlyPlan && isDiscount
                                    ? monthlyDiscountPlans
                                    : isYearlyPlan && !isDiscount
                                    ? yearlyPlans
                                    : isYearlyPlan && isDiscount
                                    ? yearlyDiscountPlans
                                    : []
                                }
                              />
                            </tr>
                          </thead>
                          <tbody>
                            <tr className="table-secondary">
                              <td colSpan={3}>
                                <span>Products</span>
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Retail POS</td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Registers</td>
                              <td>1 Included</td>
                              <td>1 Included</td>
                              <td>1 Included</td>
                              <td>1 Included</td>
                            </tr>
                            <tr>
                              <td>Integrated Payments</td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Accounting</td>
                              <td>
                                <span className="icon minus">
                                  <i className="fas fa-minus"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>eCommerce</td>
                              <td>
                                <span className="icon minus">
                                  <i className="fas fa-minus"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Omnichannel Loyalty</td>
                              <td>
                                <span className="icon minus">
                                  <i className="fas fa-minus"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon minus">
                                  <i className="fas fa-minus"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Advanced Reporting</td>
                              <td>
                                <span className="icon minus">
                                  <i className="fas fa-minus"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon minus">
                                  <i className="fas fa-minus"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr className="table-secondary">
                              <td colSpan={3}>
                                <span>Services</span>
                              </td>
                              <td></td>
                              <td></td>
                            </tr>
                            <tr>
                              <td>Digiboard Payments Card-present rate</td>
                              <td>2.6%+ 10c</td>
                              <td>2.6%+ 10c</td>
                              <td>2.6%+ 10c</td>
                              <td>2.6%+ 10c</td>
                            </tr>
                            <tr>
                              <td>24/7 customer support</td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>One on one onboarding</td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Additional free training</td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>Dedicated account manager</td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                              <td>
                                <span className="icon check">
                                  <i className="far fa-check-circle"></i>
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
export default PricingTablePage;
