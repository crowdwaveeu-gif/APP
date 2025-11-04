import { useState } from "react";
import { toggleComposeMailModalOpen } from "../../redux/features/composeMailModalSlice";
import { useAppDispatch } from "../../redux/hooks";

type Props = {
  activeTab: string;
  toggle: (tab: string) => void;
};

const EmailLeftActions = ({ activeTab, toggle }: Props) => {
  const [openNav, setOpenNav] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  // Function to open compose mail modal
  const openComposeModal = () => {
    dispatch(toggleComposeMailModalOpen());
  };

  return (
    <div className="panel-body email-menu">
      <div className="scrollable">
        <div className="btn-box d-flex gap-1 mb-lg-4 mb-0">
          <button
            className="btn btn-primary w-100 compose-mail-btn"
            onClick={openComposeModal}
          >
            <i className="fa-light fa-pen-to-square"></i> Compose
          </button>
          <button
            className="btn btn-icon btn-primary close-mail-menu-btn d-lg-none"
            onClick={() => setOpenNav(!openNav)}
          >
            <i className="fa-light fa-bars"></i>
          </button>
        </div>
        <div className={`emial-menu-list ${openNav ? "show" : ""}`}>
          <div className="scrollable">
            <ul className="nav" role="tablist">
              <li>
                <button
                  className={`btn-flush ${
                    activeTab === "inbox" ? "active" : ""
                  }`}
                  onClick={() => toggle("inbox")}
                >
                  <span className="badge bg-danger">9+</span>
                  <span className="part-icon">
                    <i className="fa-light fa-inbox"></i>
                  </span>
                  <span className="part-txt">Inbox</span>
                </button>
              </li>
              <li>
                <button
                  className={`btn-flush ${
                    activeTab === "starred" ? "active" : ""
                  }`}
                  onClick={() => toggle("starred")}
                >
                  <span className="part-icon">
                    <i className="fa-light fa-star"></i>
                  </span>
                  <span className="part-txt">Starred</span>
                </button>
              </li>
              <li>
                <button
                  className={`btn-flush ${
                    activeTab === "trash" ? "active" : ""
                  }`}
                  onClick={() => toggle("trash")}
                  id="nav-trash-tab"
                >
                  <span className="part-icon">
                    <i className="fa-light fa-trash-can"></i>
                  </span>
                  <span className="part-txt">Trash</span>
                </button>
              </li>
              <li>
                <button
                  className={`btn-flush ${
                    activeTab === "sent" ? "active" : ""
                  }`}
                  onClick={() => toggle("sent")}
                  id="nav-sent-tab"
                >
                  <span className="part-icon">
                    <i className="fa-light fa-paper-plane-top"></i>
                  </span>
                  <span className="part-txt">Sent</span>
                </button>
              </li>
              <li>
                <button
                  className={`btn-flush ${
                    activeTab === "draft" ? "active" : ""
                  }`}
                  onClick={() => toggle("draft")}
                  id="nav-draft-tab"
                >
                  <span className="part-icon">
                    <i className="fa-light fa-file"></i>
                  </span>
                  <span className="part-txt">Draft</span>
                </button>
              </li>
              <li>
                <button
                  className={`btn-flush ${activeTab === "all" ? "active" : ""}`}
                  onClick={() => toggle("all")}
                  id="nav-all-mail-tab"
                >
                  <span className="part-icon">
                    <i className="fa-light fa-envelopes"></i>
                  </span>
                  <span className="part-txt">All Email</span>
                </button>
              </li>
              <li>
                <button
                  className={`btn-flush ${
                    activeTab === "spam" ? "active" : ""
                  }`}
                  onClick={() => toggle("spam")}
                  id="nav-spam-tab"
                >
                  <span className="part-icon">
                    <i className="fa-light fa-hexagon-exclamation"></i>
                  </span>
                  <span className="part-txt">Spam</span>
                </button>
              </li>
              <li>
                <button
                  className={`btn-flush ${
                    activeTab === "important" ? "active" : ""
                  }`}
                  onClick={() => toggle("important")}
                  id="nav-important-tab"
                >
                  <span className="part-icon">
                    <i className="fa-light fa-ribbon"></i>
                  </span>
                  <span className="part-txt">Important</span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailLeftActions;
