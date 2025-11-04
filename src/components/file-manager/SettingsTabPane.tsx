import { useState } from "react";
import BillingsTabPane from "./settings-tabpane/BillingsTabPane";
import GeneralTabPane from "./settings-tabpane/GeneralTabPane";
import NotificationTabPane from "./settings-tabpane/NotificationTabPane";

const SettingsTabPane = () => {
  const [activeTab, setActiveTab] = useState<string>("general");

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="panel">
      <div className="panel-header">
        <div className="d-flex align-items-center gap-1">
          <h5>Settings</h5>
        </div>
      </div>
      <div className="panel-body">
        <nav>
          <div className="btn-box" id="nav-tab2" role="tablist">
            <button
              className={`btn btn-sm btn-outline-primary ${
                activeTab === "general" ? "active" : ""
              }`}
              id="nav-general-tab"
              onClick={() => handleTabChange("general")}
            >
              General
            </button>
            <button
              className={`btn btn-sm btn-outline-primary mx-2 ${
                activeTab === "billings" ? "active" : ""
              }`}
              id="nav-billings-tab"
              onClick={() => handleTabChange("billings")}
            >
              Billings
            </button>
            <button
              className={`btn btn-sm btn-outline-primary ${
                activeTab === "notification" ? "active" : ""
              }`}
              id="nav-notification-tab"
              onClick={() => handleTabChange("notification")}
            >
              Notification
            </button>
          </div>
        </nav>
        <div className="tab-content" id="nav-tabContent2">
          <div
            className={`tab-pane fade ${
              activeTab === "general" ? "show active" : ""
            }`}
            id="nav-general"
            role="tabpanel"
            aria-labelledby="nav-general-tab"
          >
            <GeneralTabPane />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "billings" ? "show active" : ""
            }`}
            id="nav-billings"
            role="tabpanel"
            aria-labelledby="nav-billings-tab"
          >
            <BillingsTabPane />
          </div>
          <div
            className={`tab-pane fade ${
              activeTab === "notification" ? "show active" : ""
            }`}
            id="nav-notification"
            role="tabpanel"
            aria-labelledby="nav-notification-tab"
          >
            <NotificationTabPane />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsTabPane;
