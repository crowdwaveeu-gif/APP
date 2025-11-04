type Props = {
  show: boolean;
  closeModal: () => void;
};
const VoiceCallModal = ({ show, closeModal }: Props) => {
  return (
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        role="buttton"
        onClick={closeModal}
      ></div>
      <div className={`voice-call-modal ${show ? "active" : ""}`}>
        <div className="voice-call-modal-body">
          <div className="voice-call">
            <div className="user">
              <div className="avatar avatar-lg">
                <img src="/img/bg-img/avatar-2.png" alt="User" />
              </div>
              <span className="user-name">Amelie Harris</span>
              <span className="call-status">Calling...</span>
            </div>
            <div className="call-option">
              <button className="btn btn-sm rounded-circle btn-icon btn-outline-primary">
                <i className="fa-light fa-microphone-slash"></i>
              </button>
              <button className="btn btn-sm rounded-circle btn-icon btn-outline-primary">
                <i className="fa-light fa-volume"></i>
              </button>
              <button className="btn btn-sm rounded-circle btn-icon btn-outline-primary">
                <i className="fa-light fa-user-plus"></i>
              </button>
              <button
                className="btn btn-sm rounded-circle btn-icon btn-danger"
                onClick={closeModal}
              >
                <i className="fa-light fa-phone-hangup"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VoiceCallModal;
