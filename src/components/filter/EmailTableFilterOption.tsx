import BulkEmailActions from "../utils/dropdowns/BulkEmailActions";
import EmailStatusActions from "../utils/dropdowns/EmailStatusActions";
import EmployeeLength from "../utils/dropdowns/EmployeeLength";
type Props = {
  hideLength?: boolean;
  toggle?: (tab: string) => void;
  activeTab?: string;
  showTabBtns?: boolean;
};
const EmailTableFilterOption = ({
  hideLength,
  toggle,
  activeTab,
  showTabBtns,
}: Props) => {
  return (
    <div className="table-filter-option">
      <div
        className={`row g-3 align-items-center ${
          !showTabBtns ? "justify-content-between" : ""
        }`}
      >
        {showTabBtns && (
          <div className="col-xxl-6 col-md-12 ">
            <div className="row g-3">
              <div className="col">
                {toggle && activeTab && (
                  <div className="btn-box inbox-tab d-flex gap-2 nav">
                    <button
                      className={`btn btn-sm btn-light ${
                        activeTab === "tab-1" ? "active" : ""
                      }`}
                      id="nav-primary-tab"
                      onClick={() => toggle("tab-1")}
                    >
                      Primary
                    </button>
                    <button
                      className={`btn btn-sm btn-light ${
                        activeTab === "tab-2" ? "active" : ""
                      }`}
                      id="nav-promotion-tab"
                      onClick={() => toggle("tab-2")}
                    >
                      Promotion
                      <span className="badge bg-danger mx-1">9+</span>
                    </button>
                    <button
                      className={`btn btn-sm btn-light ${
                        activeTab === "tab-3" ? "active" : ""
                      }`}
                      id="nav-social-tab"
                      onClick={() => toggle("tab-3")}
                    >
                      Social
                    </button>
                    <button
                      className={`btn btn-sm btn-light ${
                        activeTab === "tab-4" ? "active" : ""
                      }`}
                      id="nav-updates-tab"
                      onClick={() => toggle("tab-4")}
                    >
                      Updates
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        <div
          className={`${
            hideLength
              ? "col-xxl-6 d-flex justify-content-start justify-content-xxl-end"
              : !showTabBtns
              ? "col-xxl-9"
              : "col-xxl-4"
          } col-xl-9 `}
        >
          <div className="row g-3">
            <div className="col">
              <form>
                <BulkEmailActions />
              </form>
            </div>
            <div className="col">
              <EmailStatusActions />
            </div>
            <div className="col">
              <button className="btn btn-primary">
                <i className="fa-light fa-filter me-1"></i>
                Filter
              </button>
            </div>
          </div>
        </div>
        <div
          className={`col-xxl-2 col-xl-3 d-flex justify-content-end ${
            hideLength ? "d-none" : ""
          }`}
        >
          <div className="productTableLength">
            <EmployeeLength />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailTableFilterOption;
