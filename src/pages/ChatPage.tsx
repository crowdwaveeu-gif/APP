import ChatSlider from "../components/slider/ChatSlider";
import MessageList from "../components/chat/MessageList";
import MessageArea from "../components/chat/MessageArea";
import { useEffect, useRef, useState } from "react";
import VoiceCallModal from "../components/modal/VoiceCallModal";
import VideoCallModal from "../components/modal/VideoCallModal";
import SidebarModal from "../components/modal/SidebarModal";

const ChatPage = () => {
  const [activeVoiceModal, setActiveVoiceModal] = useState(false);
  const toggleVoiceOpen = () => {
    setActiveVoiceModal(true);
  };
  const toggleVoiceClose = () => {
    setActiveVoiceModal(false);
  };
  const [activeVideoModal, setActiveVideoModal] = useState(false);
  const toggleVideoOpen = () => {
    setActiveVideoModal(true);
  };
  const toggleVideoClose = () => {
    setActiveVideoModal(false);
  };
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setActiveDropdown(!activeDropdown);
  };
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);
  const [activeSidebar, setActiveSidebar] = useState<boolean>(false);

  const toggleSidebar = () => {
    setActiveSidebar(!activeSidebar);
  };

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="chatting-panel">
          <div className="panel border-end rounded-0">
            <div className="panel-body border-bottom position-relative">
              <ChatSlider />
            </div>
            <MessageList />
          </div>
          <div className="panel rounded-0 position-relative">
            <div className="chatting-area">
              <div className="panel-body">
                <div className="chat-top-bar">
                  <div className="user">
                    <button className="back-to-all-chat btn-flush fs-14 d-md-none">
                      <i className="fa-light fa-arrow-left"></i>
                    </button>
                    <div className="avatar">
                      <img src="./img/bg-img/avatar-2.png" alt="User" />
                    </div>
                    <div className="part-txt">
                      <span className="user-name">Amelie Harris</span>
                      <span className="active-status active">Active Now</span>
                    </div>
                  </div>

                  <div className="chatting-panel-top-btns d-flex align-items-center">
                    <button
                      className="btn ms-2 btn-sm btn-icon btn-outline-primary"
                      onClick={toggleVoiceOpen}
                    >
                      <i className="fa-light fa-phone"></i>
                    </button>

                    <button
                      className="btn mx-2 btn-sm btn-icon btn-outline-primary"
                      onClick={toggleVideoOpen}
                    >
                      <i className="fa-light fa-video"></i>
                    </button>

                    <div className="digi-dropdown dropdown" ref={dropdownRef}>
                      <button
                        className="btn btn-sm btn-icon btn-outline-primary"
                        onClick={toggleDropdown}
                      >
                        <i className="fa-regular fa-ellipsis"></i>
                      </button>
                      <ul
                        className={`digi-dropdown-menu dropdown-menu dropdown-menu-sm dropdown-menu-end ${
                          activeDropdown ? "show" : ""
                        }`}
                      >
                        <li className="p-0">
                          <a href="#" className="dropdown-item">
                            <span className="dropdown-icon">
                              <i className="fa-light fa-box-archive"></i>
                            </span>
                            Archive
                          </a>
                        </li>
                        <li className="p-0">
                          <a href="#" className="dropdown-item">
                            <span className="dropdown-icon">
                              <i className="fa-light fa-microphone-slash"></i>
                            </span>
                            Mute
                          </a>
                        </li>
                        <li className="p-0">
                          <a href="#" className="dropdown-item">
                            <span className="dropdown-icon">
                              <i className="fa-light fa-trash-can"></i>
                            </span>
                            Delete
                          </a>
                        </li>
                        <li className="p-0">
                          <a
                            href="#"
                            role="button"
                            onClick={toggleSidebar}
                            className="dropdown-item show-chatting-info"
                          >
                            <span className="dropdown-icon">
                              <i className="fa-light fa-ellipsis-vertical"></i>
                            </span>
                            More
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="search-in-chat">
                    <input
                      type="search"
                      className="form-control"
                      placeholder="Search message..."
                    />
                  </div>
                </div>
              </div>

              <MessageArea />
              <div className="panel-body msg-type-area">
                <form>
                  <label
                    className="btn btn-sm btn-icon btn-outline-primary"
                    htmlFor="chatAttachment"
                  >
                    <i className="fa-light fa-link"></i>
                  </label>
                  <input
                    type="file"
                    className="chat-attachment"
                    id="chatAttachment"
                  />
                  <input
                    autoComplete="off"
                    type="text"
                    className="form-control form-control-sm chat-input"
                    id="chat-input"
                    placeholder="Type your message..."
                  />
                  <button className="btn btn-sm btn-icon btn-outline-primary">
                    <i className="fa-light fa-paper-plane"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <VoiceCallModal show={activeVoiceModal} closeModal={toggleVoiceClose} />
      <VideoCallModal show={activeVideoModal} closeModal={toggleVideoClose} />
      <SidebarModal
        show={activeSidebar}
        closeModal={() => setActiveSidebar(false)}
        openVideoCall={toggleVideoOpen}
        openVoiceCall={toggleVoiceOpen}
      />
    </div>
  );
};
export default ChatPage;
