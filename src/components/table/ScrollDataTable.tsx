import { useState } from "react";
import { allCustomerData } from "../../data";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import TableBottomControls from "../utils/TableBottomControls";

const ScrollDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const dataList = allCustomerData;

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
  return (
    <div className="col-12">
      <div className="">
        <div className="border-bottom pb-2 fw-bold text-dark mb-4 card-header">
          Data Table Body Scroll
        </div>
        <OverlayScrollbarsComponent className="card-body">
          <div style={{ height: 300 }}>
            <table
              className="table table-dashed table-hover digi-dataTable table-striped"
              id="componentDataTable2"
            >
              <thead>
                <tr>
                  <th className="no-sort">
                    <div className="form-check">
                      <input className="form-check-input" type="checkbox" />
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
                {currentData.map((data) => (
                  <tr key={data.userName}>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <a href="#">{data.name}</a>
                    </td>
                    <td>{data.userName}</td>
                    <td>{data.lastActive}</td>
                    <td>{data.dateRegistered}</td>
                    <td>
                      <a href="#">{data.email}</a>
                    </td>
                    <td>{data.orders}</td>
                    <td>${data.totalSpent}</td>
                    <td>${data.aov}</td>
                    <td>BD</td>
                    <td>{data.city}</td>
                    <td>CA</td>
                    <td>{data.postalCode}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </OverlayScrollbarsComponent>
        <TableBottomControls
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          dataList={dataList}
        />
      </div>
    </div>
  );
};
export default ScrollDataTable;
