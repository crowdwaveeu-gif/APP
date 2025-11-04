type Props = {
  show: boolean;
  closeModal: () => void;
  openVideoCall: () => void;
  openVoiceCall: () => void;
};
const SidebarModal = ({
  show,
  closeModal,
  openVideoCall,
  openVoiceCall,
}: Props) => {
  return (
    <div
      className={`chatting-panel h-100 panel offcanvas offcanvas-end ${
        show ? "show" : ""
      }`}
    >
      <button
        type="button"
        className="btn-close chat-user-more-offcanvas"
        onClick={closeModal}
      ></button>

      <div className="panel-body">
        <div className="user-short">
          <div className="avatar avatar-lg">
            <img src="./img/bg-img/avatar-2.png" alt="Image" />
          </div>
          <div className="part-txt">
            <span className="user-name d-block">Amelie Harris</span>
            <span className="user-mail d-block">example@info.com</span>
          </div>

          <div className="user-option">
            <button
              className="btn btn-sm btn-icon btn-outline-primary"
              onClick={openVoiceCall}
            >
              <i className="fa-light fa-phone"></i>
            </button>

            <button
              className="btn btn-sm btn-icon btn-outline-primary"
              onClick={openVideoCall}
            >
              <i className="fa-light fa-video"></i>
            </button>
          </div>
        </div>

        <div className="border-bottom my-5"></div>

        <div className="scrollable">
          <div className="chatting-option mb-4">
            <ul>
              <li>
                <a href="#">
                  <span>
                    <i className="fa-light fa-photo-film"></i>
                  </span>
                  Media
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i className="fa-light fa-file-lines"></i>
                  </span>
                  Files
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i className="fa-light fa-link"></i>
                  </span>
                  Links
                </a>
              </li>
            </ul>
          </div>
          <div className="chatting-option">
            <ul>
              <li>
                <a href="#">
                  <span>
                    <i className="fa-light fa-bell-slash"></i>
                  </span>
                  Mute notification
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i className="fa-light fa-message-slash"></i>
                  </span>
                  Ignore message
                </a>
              </li>
              <li>
                <a href="#">
                  <span>
                    <i className="fa-light fa-circle-minus"></i>
                  </span>
                  Block user
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SidebarModal;
