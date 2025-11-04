import { useState } from "react";
import { toggleUploadFileModalOpen } from "../../redux/features/uploadFileModalSlice";
import { useAppDispatch } from "../../redux/hooks";

type Props = {
  active: string;
  toggle: (tab: string | null) => void;
};
const FileManagerSidebar = ({ active, toggle }: Props) => {
  const dispatch = useAppDispatch();
  const openFileModal = () => {
    dispatch(toggleUploadFileModalOpen());
  };

  // Mobile Menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const toggleMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };
  return (
    <div className={`file-manager-sidebar ${mobileMenuOpen ? "show-nav" : ""}`}>
      <div className="panel mb-4">
        <div className="panel-body">
          <div className="d-flex gap-1">
            <button className="btn btn-primary w-100" onClick={openFileModal}>
              <i className="fa-regular fa-plus"></i>
              Upload File
            </button>
            <button
              className="btn btn-icon btn-primary close-file-manager-menu-btn d-lg-none"
              onClick={toggleMenu}
            >
              <i
                className={`fa-light ${mobileMenuOpen ? "fa-x" : "fa-bars"}`}
              ></i>
            </button>
          </div>
          <nav>
            <div className="nav" id="nav-tab" role="tablist">
              <button
                className={`file-manager-tab-btn w-100 all-files-tab ${
                  active === "all-files" ? "active" : ""
                }`}
                id="nav-all-files-tab"
                onClick={() => toggle("all-files")}
              >
                All Files <i className="fa-light fa-angle-right"></i>
              </button>
              <div className="divider-dash"></div>
              <ul className="connected-app">
                <li className="file-manager-sidebar-title">Connected Apps</li>
                <li>
                  <a href="https://drive.google.com/">
                    <span className="text-warning">
                      <i className="fa-brands fa-google-drive"></i>
                    </span>
                    Google Drive
                  </a>
                </li>
                <li>
                  <a href="https://www.dropbox.com">
                    <span className="text-info">
                      <i className="fa-brands fa-dropbox"></i>
                    </span>
                    Dropbox
                  </a>
                </li>
              </ul>
              <div className="divider-dash"></div>
              <div className="other-files">
                <button
                  className={`file-manager-tab-btn w-100 ${
                    active === "shared-files" ? "active" : ""
                  }`}
                  id="nav-shared-files-tab"
                  onClick={() => toggle("shared-files")}
                >
                  <span>
                    <i className="fa-light fa-share-nodes"></i>
                  </span>
                  Shared Files
                </button>
                {/* <button
                  className={`file-manager-tab-btn w-100 ${
                    active === "recent-files" ? "active" : ""
                  }`}
                  id="nav-recent-files-tab"
                  onClick={() => toggle("recent-files")}
                >
                  <span>
                    <i className="fa-light fa-clock"></i>
                  </span>{" "}
                  Recent Files
                </button> */}
                <button
                  className={`file-manager-tab-btn w-100 ${
                    active === "starred-files" ? "active" : ""
                  }`}
                  onClick={() => toggle("starred-files")}
                  id="nav-starred-files-tab"
                >
                  <span>
                    <i className="fa-light fa-star"></i>
                  </span>
                  Starred
                </button>
                <button
                  className={`file-manager-tab-btn w-100 ${
                    active === "trash-files" ? "active" : ""
                  }`}
                  onClick={() => toggle("trash-files")}
                  id="nav-trash-files-tab"
                >
                  <span>
                    <i className="fa-light fa-trash"></i>
                  </span>
                  Trash
                </button>
                <button
                  className={`file-manager-tab-btn w-100 ${
                    active === "settings" ? "active" : ""
                  }`}
                  onClick={() => toggle("settings")}
                  id="nav-file-manager-settings-tab"
                >
                  <span>
                    <i className="fa-light fa-gear"></i>
                  </span>
                  Settings
                </button>
              </div>
            </div>
          </nav>
          <div className="divider-dash"></div>
          <ul className="file-category-status">
            <li>
              <div className="progress-txt">
                <div className="file-category-name">
                  <span className="text-success">
                    <i className="fa-regular fa-image"></i>
                  </span>
                  <p>Images</p>
                </div>
                <span className="using-storage">47 MB</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-success"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </li>
            <li>
              <div className="progress-txt">
                <div className="file-category-name">
                  <span className="text-danger-emphasis">
                    <i className="fa-regular fa-video"></i>
                  </span>
                  <p>Videos</p>
                </div>
                <span className="using-storage">35 MB</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </li>
            <li>
              <div className="progress-txt">
                <div className="file-category-name">
                  <span className="text-primary">
                    <i className="fa-regular fa-file"></i>
                  </span>
                  <p>Docs</p>
                </div>
                <span className="using-storage">47 MB</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-primary"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </li>
            <li>
              <div className="progress-txt">
                <div className="file-category-name">
                  <span className="text-warning">
                    <i className="fa-regular fa-music"></i>
                  </span>
                  <p>Music</p>
                </div>
                <span className="using-storage">35 MB</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-warning"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </li>
            <li>
              <div className="progress-txt">
                <div className="file-category-name">
                  <span className="text-info">
                    <i className="fa-regular fa-download"></i>
                  </span>
                  <p>Downloads</p>
                </div>
                <span className="using-storage">47 MB</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-info"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </li>
            <li>
              <div className="progress-txt">
                <div className="file-category-name">
                  <span>
                    <i className="fa-regular fa-grid-2"></i>
                  </span>
                  <p>More</p>
                </div>
                <span className="using-storage">35 MB</span>
              </div>
              <div className="progress">
                <div
                  className="progress-bar bg-secondary"
                  style={{ width: "25%" }}
                ></div>
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className="panel">
        <div className="panel-body">
          <div className="storage-status">
            <div className="progress-txt">
              <div className="file-category-name">
                <span>
                  <i className="fa-light fa-hard-drive"></i>
                </span>
                <p>Total Storage</p>
              </div>
            </div>
            <div className="progress-stacked">
              <div className="progress" style={{ width: "15%" }}>
                <div className="progress-bar bg-success"></div>
              </div>
              <div className="progress" style={{ width: "15%" }}>
                <div className="progress-bar bg-danger"></div>
              </div>
              <div className="progress" style={{ width: "20%" }}>
                <div className="progress-bar bg-primary"></div>
              </div>
              <div className="progress" style={{ width: "15%" }}>
                <div className="progress-bar bg-warning"></div>
              </div>
              <div className="progress" style={{ width: "5%" }}>
                <div className="progress-bar bg-info"></div>
              </div>
              <div className="progress" style={{ width: "10%" }}>
                <div className="progress-bar bg-secondary"></div>
              </div>
            </div>
            <p>13 GB of 15 GB Available </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileManagerSidebar;
