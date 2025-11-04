import TotalExpenseChart from "../charts/TotalExpenseChart";

const TotalExpenseCard = () => {
  return (
    <div className="card full-height">
      <div className="mb-5">
        <p>Total Expense</p>
        <h4 className="mb-3">$6078.76</h4>
        <p className="mb-0">Profit is 48% More than last Month</p>
      </div>

      <div className="totalExpensechart">
        <TotalExpenseChart />
        <span>74%</span>
      </div>
    </div>
  );
};
export default TotalExpenseCard;
