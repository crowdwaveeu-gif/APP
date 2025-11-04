import TotalRevenueChart from "../charts/TotalRevenueChart";

const TotalReviewCard = () => {
  return (
    <div className="card">
      <div className="mb-4">
        <h5 className="mb-0">Total Revenue</h5>
      </div>

      <TotalRevenueChart />
    </div>
  );
};
export default TotalReviewCard;
