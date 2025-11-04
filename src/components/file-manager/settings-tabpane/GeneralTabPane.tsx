const GeneralTabPane = () => {
  return (
    <>
      <div className="file-manager-user">
        <div className="avatar">
          <img
            src="/img/bg-img/admin.png"
            className="border border-2 border-primary"
            alt="Image"
          />
        </div>
        <div className="part-txt">
          <div className="name">
            <span>Shaikh Abu Dardah</span>
            <button className="btn-flush ms-1">
              <i className="fa-light fa-pen"></i>
            </button>
          </div>
          <div className="email">
            <span>info@example.com</span>
            <button className="btn-flush ms-1">
              <i className="fa-light fa-pen"></i>
            </button>
          </div>
        </div>
      </div>
      <div className="file-manager-settings-group">
        <div className="file-manager-settings-subtitle">
          <h6>Subscription Plan</h6>
        </div>
        <div className="d-flex justify-content-between align-items-center">
          <div className="about-plan">
            <h3 className="plan-name">
              <span className="text-primary me-1">
                <i className="fa-light fa-database"></i>
              </span>
              <span>Omuk Basic</span>
            </h3>
            <span className="used-storage">13.00 GB / 15.00 GB</span>
          </div>
          <a href="#" className="btn btn-sm btn-primary">
            Upgrade Plan
          </a>
        </div>
      </div>
      <div className="file-manager-settings-group mb-4">
        <div className="file-manager-settings-subtitle">
          <h6>Personal Basic</h6>
        </div>
        <div className="table-responsive">
          <table className="table file-manager-settings-table">
            <tbody>
              <tr>
                <td>Recovery Email</td>
                <td>info@example.com</td>
                <td>
                  <button className="btn-flush">Edit</button>
                </td>
              </tr>
              <tr>
                <td>Phone Number</td>
                <td>Not added yet</td>
                <td>
                  <button className="btn-flush">Add Number</button>
                </td>
              </tr>
              <tr>
                <td>Date of birth</td>
                <td>21 Jan. 1999</td>
                <td>
                  <button className="btn-flush">Change</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="file-manager-settings-group mb-0">
        <div className="file-manager-settings-subtitle">
          <h6>Preferences</h6>
        </div>
        <div className="table-responsive">
          <table className="table file-manager-settings-table">
            <tbody>
              <tr>
                <td>Language</td>
                <td>English (United State)</td>
                <td>
                  <button className="btn-flush">Change Language</button>
                </td>
              </tr>
              <tr>
                <td>Date Format</td>
                <td>DD/MM/YYYY</td>
                <td>
                  <button className="btn-flush">Change</button>
                </td>
              </tr>
              <tr>
                <td>Timezone</td>
                <td>Bangladesh (GMT +6)</td>
                <td>
                  <button className="btn-flush">Change</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};
export default GeneralTabPane;
