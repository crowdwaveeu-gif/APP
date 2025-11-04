import UserGrowthCard from "../cards/UserGrowthCard";
import TotalPackagesCard from "../cards/TotalPackagesCard";
import TotalTripsCard from "../cards/TotalTripsCard";
import TotalRevenueCard from "../cards/TotalRevenueCard";
import TotalDisputesCard from "../cards/TotalDisputesCard";
import AnalyticsOverviewChart from "../charts/AnalyticsOverviewChart";
import RevenueChart from "../charts/RevenueChart";

const AnalyticsDashboard = () => {
  return (
    <div className="row g-xl-4 g-3">
      {/* Stats Cards Row */}
      <div className="col-12">
        <div className="row g-xl-4 g-3">
          <div className="col-12 col-sm-6 col-xl-4">
            <UserGrowthCard />
          </div>

          <div className="col-12 col-sm-6 col-xl-4">
            <TotalPackagesCard />
          </div>

          <div className="col-12 col-sm-6 col-xl-4">
            <TotalTripsCard />
          </div>
        </div>
      </div>

      {/* Revenue and Disputes Row */}
      <div className="col-12">
        <div className="row g-xl-4 g-3">
          <div className="col-12 col-md-6">
            <TotalRevenueCard />
          </div>

          <div className="col-12 col-md-6">
            <div className="card cta-card" style={{ height: '100%' }}>
              <TotalDisputesCard />
            </div>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="col-12">
        <AnalyticsOverviewChart />
      </div>

      <div className="col-12">
        <RevenueChart />
      </div>

      {/* Quick Links */}
      <div className="col-12">
        <div className="card">
          <div className="card-body">
            <h5 className="card-title mb-4">Quick Access</h5>
            <div className="row g-3">
              <div className="col-6 col-md-3">
                <a href="/packages" className="btn btn-outline-primary w-100">
                  <i className="ti ti-package me-2"></i>
                  Manage Packages
                </a>
              </div>
              <div className="col-6 col-md-3">
                <a href="/trips" className="btn btn-outline-success w-100">
                  <i className="ti ti-car me-2"></i>
                  Manage Trips
                </a>
              </div>
              <div className="col-6 col-md-3">
                <a href="/disputes" className="btn btn-outline-warning w-100">
                  <i className="ti ti-alert-circle me-2"></i>
                  View Disputes
                </a>
              </div>
              <div className="col-6 col-md-3">
                <a href="/users-management" className="btn btn-outline-info w-100">
                  <i className="ti ti-users me-2"></i>
                  Manage Users
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;
