import { useState } from "react";
import AllFilesTabPane from "../components/file-manager/AllFilesTabPane";
// import RecentFileTabPane from "../components/file-manager/RecentFileTabPane";
import SettingsTabPane from "../components/file-manager/SettingsTabPane";
import SharedFileTabPane from "../components/file-manager/SharedFileTabPane";
import StarredFileTabPane from "../components/file-manager/StarredFileTabPane";
import TrashFileTabPane from "../components/file-manager/TrashFileTabPane";
import FileManagerSidebar from "../components/sidebar/FileManagerSidebar";

const FileManagerPage = () => {
  const [activeTab, setActiveTab] = useState<string>("all-files");

  const handleTabChange = (tab: string | null) => {
    setActiveTab(tab ?? "all-files");
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">File Manager</h6>
        </div>
      </div>

      <div className="col-lg-4 col-xxl-3 file-manager-sidebar-col">
        <FileManagerSidebar active={activeTab} toggle={handleTabChange} />
      </div>

      <div className="col-lg-8 col-xxl-9">
        <div className="tab-content" id="nav-tabContent">
          <div
            className={`tab-pane fade ${
              activeTab === "all-files" ? "show active" : ""
            }`}
            id="nav-all-files"
          >
            <AllFilesTabPane />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "shared-files" ? "show active" : ""
            }`}
            id="nav-shared-files"
          >
            <SharedFileTabPane />
          </div>
          {/* <div
            className={`tab-pane fade ${
              activeTab === "recent-files" ? "show active" : ""
            }`}
            id="nav-recent-files"
          >
            <RecentFileTabPane />
          </div> */}
          <div
            className={`tab-pane fade ${
              activeTab === "starred-files" ? "show active" : ""
            }`}
            id="nav-starred-files"
          >
            <StarredFileTabPane />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "trash-files" ? "show active" : ""
            }`}
            id="nav-trash-files"
          >
            <TrashFileTabPane />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "settings" ? "show active" : ""
            }`}
            id="nav-file-manager-settings"
          >
            <SettingsTabPane />
          </div>
        </div>
      </div>
    </div>
  );
};
export default FileManagerPage;
