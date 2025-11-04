import EarningReportChart from "../charts/EarningReportChart";

const EarningCard = () => {
  return (
    <div className="card">
      <div className="d-flex mb-4 align-items-center flex-wrap justify-content-between">
        <h5 className="mb-0">Earnings</h5>

        <select className="webdesh-select rounded-pill right earning-select">
          <option value="1">Daily</option>
          <option value="1">Weekly</option>
          <option value="2">Monthly</option>
        </select>
      </div>

      <EarningReportChart />
    </div>
  );
};
export default EarningCard;
