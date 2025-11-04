type Props = {
  show: boolean;
  closeModal: () => void;
};
const VideoCallModal = ({ show, closeModal }: Props) => {
  return (
    <>
      <div
        className={`ar-modal-overlay ${show ? "active" : ""}`}
        role="buttton"
        onClick={closeModal}
      ></div>
      <div className={`video-call-modal ${show ? "active" : ""}`}>
        <div className="video-call-modal-body">
          <div className="video-call">
            <div className="user">
              <div className="user-preview">
                <img src="./img/bg-img/avatar-big.jpg" alt="User" />
              </div>
              <div className="part-txt">
                <span className="user-name">Amelie Harris</span>
                <span className="call-status">Calling...</span>
              </div>
            </div>
            <div className="bottom">
              <div className="call-option">
                <button className="btn btn-sm rounded-circle btn-icon btn-outline-primary">
                  <i className="fa-light fa-microphone-slash"></i>
                </button>
                <button className="btn btn-sm rounded-circle btn-icon btn-outline-primary">
                  <i className="fa-light fa-video-slash"></i>
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
              <div className="admin-preview">
                <img src="./img/bg-img/admin.png" alt="Admin" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default VideoCallModal;
