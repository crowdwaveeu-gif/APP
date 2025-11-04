const DashboardHeader = () => {
  return (
    <div className="delivery-dashboard-header">
      <div className="row align-items-center g-4">
        <div className="col-12 col-sm-5 text-sm-start text-center">
          <h4 className="text-white">Dashboard</h4>
          <p className="mb-0 text-uppercase dash-subtitle">
            Home - Delivery Dashboard
          </p>
        </div>
        <div className="col-12 col-sm-7">
          <div className="text-sm-end text-center">
            <a href="#" className="btn btn-lean">
              <i className="ti ti-plus"></i> New Order
            </a>
            <a href="#" className="btn btn-light ms-2">
              <i className="ti ti-calendar"></i>
              December
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default DashboardHeader;
