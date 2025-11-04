import { AllCustomerDataType } from "../../types";

type Props = {
  tableData: AllCustomerDataType[];
};

const AllCustomerTable = ({ tableData }: Props) => {
  return (
    <table
      className="table table-dashed table-hover digi-dataTable all-product-table"
      id="allProductTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllProduct"
              />
            </div>
          </th>
          <th>Name</th>
          <th>Username</th>
          <th>Last Active</th>
          <th>Date Registered</th>
          <th>Email</th>
          <th>Orders</th>
          <th>Total Spend</th>
          <th>AOV</th>
          <th>Country / Region</th>
          <th>City</th>
          <th>Region</th>
          <th>Postal Code</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item, index) => (
          <tr key={index}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <a href="#">{item.name}</a>
            </td>
            <td>{item.userName}</td>
            <td>{item.lastActive}</td>
            <td>{item.dateRegistered}</td>
            <td>
              <a href="#">{item.email}m</a>
            </td>
            <td>{item.orders}</td>
            <td>${item.totalSpent}</td>
            <td>${item.aov}</td>
            <td>BD</td>
            <td>{item.city}</td>
            <td>CA</td>
            <td>{item.postalCode}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default AllCustomerTable;
