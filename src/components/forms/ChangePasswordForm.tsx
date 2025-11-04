const ChangePasswordForm = () => {
  return (
    <form>
      <div className="profile-edit-tab-title">
        <h6>Change Password</h6>
      </div>
      <div className="social-information">
        <div className="row g-3">
          <div className="col-12">
            <div className="input-group">
              <span className="input-group-text">
                <i className="fa-light fa-lock"></i>
              </span>
              <input
                type="password"
                className="form-control"
                placeholder="Current Password"
              />
            </div>
          </div>
          <div className="col-lg-6 col-12">
            <div className="input-group mb-3">
              <span className="input-group-text">
                <i className="fa-light fa-lock"></i>
              </span>
              <input
                type="url"
                className="form-control"
                placeholder="New Password"
              />
            </div>
            <div className="col-12 col-lg-6 mb-3">
              <div className="input-group">
                <span className="input-group-text">
                  <i className="fa-light fa-lock"></i>
                </span>
                <input
                  type="url"
                  className="form-control"
                  placeholder="Confirm Password"
                />
              </div>
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
export default ChangePasswordForm;
