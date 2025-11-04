const EmergencyContactForm = () => {
  return (
    <div className="panel">
      <div className="panel-header">
        <h5>Emergency Contact Information</h5>
      </div>
      <div className="panel-body">
        <div className="row g-3">
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Contact Person Name</label>
            <input type="text" className="form-control " placeholder="Name" />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Contact Person Phone</label>
            <input type="text" className="form-control " placeholder="Phone" />
          </div>
          <div className="col-xxl-3 col-lg-4 col-sm-6">
            <label className="form-label">Relation</label>
            <input
              type="text"
              className="form-control "
              placeholder="Relation"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmergencyContactForm;
