import { useState } from "react";
import { deliveryTableData } from "../../data";
import TableBottomControls from "../utils/TableBottomControls";

const OrderListCard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = deliveryTableData.slice(
    indexOfFirstData,
    indexOfLastData
  );

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(deliveryTableData.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="card order-list-table-card full-height">
      <div className="card-header-area flex-wrap mb-3">
        <h3 className="card-title mb-0">Order List</h3>
        <select className="webdesh-select right shipment-statistics-select">
          <option value="1">Last 7 Days</option>
          <option value="1">Last 15 Days</option>
          <option value="2">Last 30 Days</option>
        </select>
      </div>

      <div className="table-responsive order-list-table">
        <table className="table" id="orderList">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Date</th>
              <th>Order Type</th>
              <th>Status</th>
              <th>Payment</th>
              <th>Amount</th>
              <th>COMPLETION</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.order_id}</td>
                <td>{item.date}</td>
                <td>{item.order_type}</td>
                <td>
                  <span
                    className={`order-status ${
                      item.status === "complete" ? "success" : "warning"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td>
                  <span className="text-primary">{item.payment}</span>
                </td>
                <td>${item.amount}</td>
                <td>
                  <div className="d-inline-flex align-items-center">
                    <span>{item.completion}%</span>
                    <div className="progress">
                      <div
                        className={`progress-bar ${
                          item.status === "pending" ? "bg-warning" : ""
                        }`}
                        style={{ width: `${item.completion}%` }}
                      ></div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableBottomControls
        indexOfFirstData={indexOfFirstData}
        indexOfLastData={indexOfLastData}
        dataList={deliveryTableData}
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
      />
    </div>
  );
};
export default OrderListCard;
