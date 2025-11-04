import { Link } from "react-router-dom";
import { OrderListDataType } from "../../types";
type Props = {
  tableData: OrderListDataType[];
  handleDelete: (id: number) => void;
};
const OrderListTable = ({ tableData, handleDelete }: Props) => {
  return (
    <table
      className="table table-dashed table-hover digi-dataTable all-product-table"
      id="allProductTable"
    >
      <thead>
        <tr>
          <th className="no-sort">
            <div className="form-check d-flex pe-2">
              <input
                className="form-check-input"
                type="checkbox"
                id="markAllProduct"
              />
            </div>
          </th>
          <th>Order ID</th>
          <th>Customer</th>
          <th>Status</th>
          <th>Product</th>
          <th>Price</th>
          <th>Payment Method</th>
          <th>Delivery Status</th>
          <th>Order Date</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {tableData.map((item) => (
          <tr key={item.order_id}>
            <td>
              <div className="form-check">
                <input className="form-check-input" type="checkbox" />
              </div>
            </td>
            <td>
              <Link to="/invoices">#{item.order_id}</Link>
            </td>
            <td>{item.customer_name}</td>
            <td>
              <span
                className={
                  item.status === "Hold"
                    ? "text-warning"
                    : item.status === "Pending"
                    ? "text-danger"
                    : ""
                }
              >
                {item.status}
              </span>
            </td>
            <td>{item.product_number}</td>
            <td>${item.price}</td>
            <td>{item.payment_method}</td>
            <td>
              <span className={`badge ${item.badge}`}>
                {item.delivery_status}
              </span>
            </td>
            <td>{item.order_date} - 01:05 PM</td>
            <td>
              <div className="btn-box">
                <button>
                  <i className="fa-light fa-eye"></i>
                </button>
                <button>
                  <i className="fa-light fa-pen"></i>
                </button>
                <button onClick={() => handleDelete(item.order_id)}>
                  <i className="fa-light fa-trash"></i>
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
export default OrderListTable;
