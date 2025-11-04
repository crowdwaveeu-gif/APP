import { ActiveStepState } from "../../types";

type Props = {
  prev: (prevStep: keyof ActiveStepState, tab: string) => void;
};
const AuthStep5 = ({ prev }: Props) => {
  return (
    <div className="step-content-wrap">
      <div className="step-content mb-0">
        <div className="step-heading">
          <h4 className="step-title">Welcome on board!</h4>
          <span>
            For further details, visit our <a href="#">Help Page</a>.
          </span>
        </div>
        <div className="success-wrap">
          <p className="bg-success text-white border border-success rounded-3 py-2 px-3 fs-14">
            The United States Constitution, based on a socially agreed standard
            of individual rights, is an example of post-conventional morality.
          </p>
          <div className="d-flex justify-content-center">
            <svg
              id="Layer_1"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
              xmlSpace="preserve"
              className="check-mark"
              width="200"
              height="200"
              viewBox="0 0 300 300"
            >
              <path
                className="circle"
                stroke="#1C9943"
                strokeWidth="3"
                fill="#fff"
                fillOpacity="0"
                strokeMiterlimit="10"
                d="M150,47.9c18.4,0,35.4,4.6,51,13.8s28,21.6,37.2,37.2s13.8,32.6,13.8,51s-4.6,35.4-13.8,51s-21.6,28-37.2,37.2 s-32.6,13.8-51,13.8s-35.4-4.6-51-13.8s-28-21.6-37.2-37.2s-13.8-32.6-13.8-51s4.6-35.4,13.8-51s21.6-28,37.2-37.2 S131.7,47.9,150,47.9z"
              />
              <path
                className="tick"
                fill="#1C9943"
                stroke=""
                strokeWidth="3"
                d="M208.4,118.6c0.8-0.8,1.2-1.9,1.2-3.3c0-1.4-0.4-2.6-1.2-3.7l-3.7-3.3c-0.8-1.1-1.9-1.6-3.3-1.6 s-2.6,0.4-3.7,1.2l-67,67l-28.4-28.8c-1.1-0.8-2.3-1.2-3.7-1.2c-1.4,0-2.5,0.4-3.3,1.2l-3.7,3.3c-0.8,1.1-1.2,2.3-1.2,3.7 s0.4,2.5,1.2,3.3l35.4,35.8c1.1,1.1,2.3,1.6,3.7,1.6c1.4,0,2.5-0.5,3.3-1.6L208.4,118.6z"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="btn-box mb-5 d-flex justify-content-between">
        <button
          className="btn btn-secondary prev-button px-3"
          onClick={() => prev("step5", "step4")}
        >
          <i className="fa-light fa-arrow-left"></i>
          Previous
        </button>
      </div>
    </div>
  );
};
export default AuthStep5;
