import { useState } from "react";
import { ActiveStepState } from "../../types";
import { Tooltip } from "react-tooltip";
type Props = {
  toggle: (tep: keyof ActiveStepState) => void;
};
const AuthStep1 = ({ toggle }: Props) => {
  const [activeCard, setActiveCard] = useState<string>("card-2");
  const toggleCard = (card: string) => {
    setActiveCard(card);
  };

  return (
    <div className="step-content-wrap">
      <div className="step-content">
        <div className="step-heading">
          <h4 className="step-title">
            Choose Account Type
            <button
              className="btn-flush"
              data-tooltip-id="my-tooltip"
              data-tooltip-content="Billing is issued based on your selected account type"
            >
              <i className="fa-duotone fa-circle-info ms-1"></i>
            </button>
          </h4>
          <span>
            For further details, visit our <a href="#">Help Page</a>.
          </span>
        </div>
        <div className="account-types">
          <div className="form-check border-primary">
            <input
              className="form-check-input"
              type="radio"
              name="accountType"
              id="personalAccountType"
              checked={activeCard === "card-1"}
              onChange={() => toggleCard("card-1")}
            />
            <label className="form-check-label" htmlFor="personalAccountType">
              <span className="part-icon">
                <i className="fa-duotone fa-user-tie"></i>
              </span>
              <span className="part-txt">
                <span className="title">Personal Account</span>
                <span className="dscr">
                  Create a personal account for your self only
                </span>
              </span>
            </label>
          </div>
          <div className="form-check border-primary">
            <input
              className="form-check-input"
              type="radio"
              name="accountType"
              id="corporateAccountType"
              checked={activeCard === "card-2"}
              onChange={() => toggleCard("card-2")}
            />
            <label className="form-check-label" htmlFor="corporateAccountType">
              <span className="part-icon">
                <i className="fa-duotone fa-briefcase"></i>
              </span>
              <span className="part-txt">
                <span className="title">Corporate Account</span>
                <span className="dscr">
                  Create corporate account to manage users
                </span>
              </span>
            </label>
          </div>
        </div>
      </div>

      <div className="btn-box mb-5 w-100 d-flex justify-content-end">
        <button
          className="btn btn-primary next-button px-3"
          onClick={() => toggle("step2")}
        >
          Continue <i className="fa-light fa-arrow-right"></i>
        </button>
      </div>
      <Tooltip id="my-tooltip" style={{ zIndex: 99999 }} />
    </div>
  );
};
export default AuthStep1;
