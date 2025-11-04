const UpdatePasswordForm = () => {
  return (
    <form>
      <div className="input-group mb-4">
        <span className="input-group-text">
          <i className="fa-regular fa-lock"></i>
        </span>
        <input
          type="password"
          className="form-control"
          placeholder="New Password"
        />
      </div>
      <div className="input-group mb-4">
        <span className="input-group-text">
          <i className="fa-regular fa-lock"></i>
        </span>
        <input
          type="password"
          className="form-control"
          placeholder="Confirm New Password"
        />
      </div>
      <button className="btn btn-primary w-100 login-btn">
        Update Password
      </button>
    </form>
  );
};
export default UpdatePasswordForm;
