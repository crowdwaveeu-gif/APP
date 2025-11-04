const BasicInformationForm = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Basic Information</h5>
      </div>
      <div className="panel-body">
        <div className="row g-3">
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Employee ID</label>
            <input type="text" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Email</label>
            <input type="email" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Phone</label>
            <input type="tel" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Shift</label>
            <select className="form-control ">
              <option value="">Select Shift</option>
              <option value="0">Shift 1</option>
              <option value="1">Shift 2</option>
              <option value="2">Shift 3</option>
            </select>
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Alternative Phone</label>
            <input type="tel" className="form-control " />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Country</label>
            <select className="form-control ">
              <option value="">Select Country</option>
              <option value="0">Country 1</option>
              <option value="1">Country 2</option>
              <option value="2">Country 3</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BasicInformationForm;
