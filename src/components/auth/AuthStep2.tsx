import { useState } from "react";
import { ActiveStepState } from "../../types";
import { Tooltip } from "react-tooltip";

type Props = {
  toggle: (tep: keyof ActiveStepState) => void;
  prev: (prevStep: keyof ActiveStepState, tab: string) => void;
};

const AuthStep2 = ({ toggle, prev }: Props) => {
  const [activeCard, setActiveCard] = useState<string>("card-1");
  const toggleCard = (card: string) => {
    setActiveCard(card);
  };
  const [companyAcc, setCompanyAcc] = useState<boolean>(true);
  const toggleAcc = () => {
    setCompanyAcc(!companyAcc);
  };
  return (
    <div className="step-content-wrap">
      <div className="step-content">
        <div className="step-heading">
          <h4 className="step-title">Account Info</h4>
          <span>
            For further details, visit our <a href="#">Help Page</a>.
          </span>
        </div>
        <div className="account-info-wrap">
          <form>
            <span className="account-info-title">
              Set the Team Size.{" "}
              <button
                className="btn-flush fs-14"
                data-tooltip-id="my-tooltip"
                data-tooltip-content="Provide your team size to help us setup your billing"
              >
                <i className="fa-duotone fa-circle-info"></i>
              </button>
            </span>
            <div className="team-size">
              <div className="form-check text-primary">
                <input
                  className="form-check-input"
                  type="radio"
                  name="teamSize"
                  id="teamSize_1-1"
                  checked={activeCard === "card-1"}
                  onChange={() => toggleCard("card-1")}
                />
                <label className="form-check-label" htmlFor="teamSize_1-1">
                  1-1
                </label>
              </div>
              <div className="form-check text-primary">
                <input
                  className="form-check-input"
                  type="radio"
                  name="teamSize"
                  id="teamSize_2-10"
                  checked={activeCard === "card-2"}
                  onChange={() => toggleCard("card-2")}
                />
                <label className="form-check-label" htmlFor="teamSize_2-10">
                  2-10
                </label>
              </div>
              <div className="form-check text-primary">
                <input
                  className="form-check-input"
                  type="radio"
                  name="teamSize"
                  id="teamSize_11-50"
                  checked={activeCard === "card-3"}
                  onChange={() => toggleCard("card-3")}
                />
                <label className="form-check-label" htmlFor="teamSize_11-50">
                  11-50
                </label>
              </div>
              <div className="form-check text-primary">
                <input
                  className="form-check-input"
                  type="radio"
                  name="teamSize"
                  id="teamSize_50"
                  checked={activeCard === "card-4"}
                  onChange={() => toggleCard("card-4")}
                />
                <label className="form-check-label" htmlFor="teamSize_50">
                  50+
                </label>
              </div>
            </div>
            <div className="team-title">
              <span className="account-info-title">Team Account Name</span>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
              />
            </div>
            <div className="account-plan account-types gap-0">
              <span className="account-info-title">
                Select Account Plan{" "}
                <button
                  className="btn-flush fs-14"
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Monthly billing will be based on your account plan"
                >
                  <i className="fa-duotone fa-circle-info"></i>
                </button>
              </span>
              <div className="row g-2">
                <div className="col-6">
                  <div className="form-check border-primary">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="accountPlan"
                      id="companyAccount"
                      checked={companyAcc}
                      onChange={toggleAcc}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="companyAccount"
                    >
                      <span className="part-icon">
                        <i className="fa-duotone fa-user-tie"></i>
                      </span>
                      <span className="part-txt">
                        <span className="title">Company Account</span>
                        <span className="dscr">
                          Create an account for Compnay
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
                <div className="col-6">
                  <div className="form-check border-primary">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="accountPlan"
                      id="developerAccount"
                      checked={!companyAcc}
                      onChange={toggleAcc}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="developerAccount"
                    >
                      <span className="part-icon">
                        <i className="fa-duotone fa-briefcase"></i>
                      </span>
                      <span className="part-txt">
                        <span className="title">Developer Account</span>
                        <span className="dscr">
                          Create an account for Developer
                        </span>
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="btn-box mb-5 w-100 d-flex justify-content-between">
        <button
          className="btn btn-secondary prev-button px-3"
          onClick={() => prev("step2", "step1")}
        >
          <i className="fa-light fa-arrow-left"></i>
          Previous
        </button>
        <button
          className="btn btn-primary next-button px-3"
          onClick={() => toggle("step3")}
        >
          Continue <i className="fa-light fa-arrow-right"></i>
        </button>
      </div>
      <Tooltip id="my-tooltip" />
    </div>
  );
};
export default AuthStep2;
