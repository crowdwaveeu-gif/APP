import AnalyticsDashboard from "../logistic/AnalyticsDashboard";

const LogisticMain = () => {
  return (
    <div className="row g-4 logistic-main-content">
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h4 className="card-title mb-3">
              <i className="ti ti-chart-line me-2"></i>
              Analytics Dashboard
            </h4>
            <p className="text-muted mb-0">
              Monitor your platform's performance with real-time analytics including user growth, trips, packages, revenue, and disputes.
            </p>
          </div>
        </div>
      </div>
      
      <div className="col-12">
        <AnalyticsDashboard />
      </div>
    </div>
  );
};
export default LogisticMain;
