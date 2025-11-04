import OrderChart from "../charts/OrderChart";

const TotalOrderCard3 = () => {
  return (
    <div className="card">
      <div className="d-flex order-card align-items-xl-end align-items-center row-gap-3 justify-content-between flex-column flex-xl-row">
        <div className="order-content">
          <p>Total Order</p>
          <div className="mb-2 d-flex flex-wrap align-items-center justify-content-between">
            <h4 className="mb-0 me-2">203k</h4>
            <span className="text-primary">
              <i className="ti ti-trending-up"></i>
              12.5%
            </span>
          </div>
          <p className="mb-0">-12.5% compared to last week</p>
        </div>

        <div className="order-chart">
          <OrderChart />
        </div>
      </div>
    </div>
  );
};
export default TotalOrderCard3;
