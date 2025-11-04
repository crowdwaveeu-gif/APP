import { ActiveStepState } from "../../types";

type Props = {
  activeStep: ActiveStepState;
};
const AuthStepList = ({ activeStep }: Props) => {
  return (
    <ul className="step-list scrollable">
      <li
        className={
          activeStep.step1 && !activeStep.step2
            ? "active"
            : activeStep.step1 && activeStep.step2
            ? "completed"
            : ""
        }
      >
        <span className="step-txt">
          <span className="step-name">Account Type</span>
          <span className="step-info">Select your account type</span>
        </span>
        <span className="step-number border-primary">1</span>
      </li>
      <li
        className={
          activeStep.step2 && !activeStep.step3
            ? "active"
            : activeStep.step2 && activeStep.step3
            ? "completed"
            : ""
        }
      >
        <span className="step-txt">
          <span className="step-name">Account Info</span>
          <span className="step-info">Setup your account settings</span>
        </span>
        <span className="step-number border-primary">2</span>
      </li>
      <li
        className={
          activeStep.step3 && !activeStep.step4
            ? "active"
            : activeStep.step3 && activeStep.step4
            ? "completed"
            : ""
        }
      >
        <span className="step-txt">
          <span className="step-name">Business Details</span>
          <span className="step-info">Setup your business details</span>
        </span>
        <span className="step-number border-primary">3</span>
      </li>
      <li
        className={
          activeStep.step4 && !activeStep.step5
            ? "active"
            : activeStep.step4 && activeStep.step5
            ? "completed"
            : ""
        }
      >
        <span className="step-txt">
          <span className="step-name">Billing Details</span>
          <span className="step-info">Provide your payment info</span>
        </span>
        <span className="step-number border-primary">4</span>
      </li>
      <li className={activeStep.step5 && activeStep.step4 ? "active" : ""}>
        <span className="step-txt">
          <span className="step-name">Completed</span>
          <span className="step-info">Your account is created</span>
        </span>
        <span className="step-number border-primary">5</span>
      </li>
    </ul>
  );
};
export default AuthStepList;
