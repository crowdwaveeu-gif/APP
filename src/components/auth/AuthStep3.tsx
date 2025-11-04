import { ActiveStepState } from "../../types";
import CorporationTypes from "../utils/dropdowns/CorporationTypes";

type Props = {
  toggle: (tep: keyof ActiveStepState) => void;
  prev: (prevStep: keyof ActiveStepState, tab: string) => void;
};

const AuthStep3 = ({ toggle, prev }: Props) => {
  return (
    <div className="step-content-wrap">
      <div className="step-content">
        <div className="step-heading">
          <h4 className="step-title">Business Details</h4>
          <span>
            For further details, visit our <a href="#">Help Page</a>.
          </span>
        </div>
        <div className="business-details-wrap">
          <form className="row g-3">
            <div className="col-12">
              <label htmlFor="businessName" className="form-label">
                Business Name
              </label>
              <input type="text" id="businessName" className="form-control" />
            </div>
            <div className="col-12">
              <label htmlFor="shortenedDscr" className="form-label">
                Shortened Description
              </label>
              <input type="text" id="shortenedDscr" className="form-control" />
            </div>
            <div className="col-12">
              <label className="form-label">Corporation Type</label>
              <CorporationTypes />
            </div>
            <div className="col-12">
              <label htmlFor="businessDscr" className="form-label">
                Business Description
              </label>
              <textarea
                id="businessDscr"
                rows={6}
                className="form-control"
              ></textarea>
            </div>
            <div className="col-12">
              <label htmlFor="contactEmail" className="form-label">
                Contact Email
              </label>
              <input type="text" id="contactEmail" className="form-control" />
            </div>
          </form>
        </div>
      </div>

      <div className="btn-box mb-5 w-100 d-flex justify-content-between">
        <button
          className="btn btn-secondary prev-button px-3"
          onClick={() => prev("step3", "step2")}
        >
          <i className="fa-light fa-arrow-left"></i>
          Previous
        </button>
        <button
          className="btn btn-primary next-button px-3"
          onClick={() => toggle("step4")}
        >
          Continue <i className="fa-light fa-arrow-right"></i>
        </button>
      </div>
    </div>
  );
};
export default AuthStep3;
