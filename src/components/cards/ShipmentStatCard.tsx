import ShipmentStatisticsChart from "../charts/ShipmentStatisticsChart";

const ShipmentStatCard = () => {
  return (
    <div className="card">
      <div className="d-flex mb-4 align-items-center flex-wrap justify-content-between gap-sm-0 gap-3">
        <h5 className="mb-0">Shipment Statistics</h5>

        <select className="webdesh-select right shipment-statistics-select">
          <option value="1">By Year</option>
          <option value="1">By Month</option>
          <option value="2">By Day</option>
        </select>
      </div>

      <ShipmentStatisticsChart />
    </div>
  );
};
export default ShipmentStatCard;
