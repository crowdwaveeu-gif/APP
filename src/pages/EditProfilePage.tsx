import { useState } from "react";
import ChangePasswordForm from "../components/forms/ChangePasswordForm";
import EditProfileForm from "../components/forms/EditProfileForm";
import ProfileOtherSettings from "../components/profile/ProfileOtherSettings";

const EditProfilePage = () => {
  const [activeTab, setActiveTab] = useState<string>("edit");
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="row g-4 edit-profile-tab-content">
      <div className="col-12">
        <div className="dashboard-breadcrumb">
          <h6 className="mb-0">Edit Profile</h6>
        </div>
      </div>

      <div className="col-12">
        <div className="panel">
          <div className="panel-header">
            <nav>
              <div
                className="btn-box d-flex flex-wrap gap-1"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`btn btn-sm btn-outline-primary ${
                    activeTab === "edit" ? "active" : ""
                  }`}
                  id="nav-edit-profile-tab"
                  onClick={() => toggleTab("edit")}
                >
                  Edit Profile
                </button>
                <button
                  className={`btn btn-sm btn-outline-primary ${
                    activeTab === "change" ? "active" : ""
                  }`}
                  id="nav-change-password-tab"
                  onClick={() => toggleTab("change")}
                >
                  Change Password
                </button>
                <button
                  className={`btn btn-sm btn-outline-primary ${
                    activeTab === "other" ? "active" : ""
                  }`}
                  id="nav-other-settings-tab"
                  onClick={() => toggleTab("other")}
                >
                  Other Settings
                </button>
              </div>
            </nav>
          </div>

          <div className="panel-body">
            <div className="tab-content profile-edit-tab" id="nav-tabContent">
              <div
                className={`ar-tab-pane ${
                  activeTab === "edit" ? "active" : ""
                }`}
                id="nav-edit-profile"
                aria-labelledby="nav-edit-profile-tab"
              >
                <EditProfileForm />
              </div>

              <div
                className={`ar-tab-pane ${
                  activeTab === "change" ? "active" : ""
                }`}
                id="nav-change-password"
                role="tabpanel"
                aria-labelledby="nav-change-password-tab"
              >
                <ChangePasswordForm />
              </div>
              <div
                className={`ar-tab-pane ${
                  activeTab === "other" ? "active" : ""
                }`}
                id="nav-other-settings"
                role="tabpanel"
                aria-labelledby="nav-other-settings-tab"
              >
                <ProfileOtherSettings />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default EditProfilePage;
