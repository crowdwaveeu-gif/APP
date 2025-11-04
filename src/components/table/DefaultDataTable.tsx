import { useState } from "react";
import { defaultDataTableArray } from "../../data";
import TableBottomControls from "../utils/TableBottomControls";

const DefaultDataTable = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const dataList = defaultDataTableArray;

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
          Default Data Table
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className="table table-dashed table-hover digi-dataTable table-striped"
              id="componentDataTable"
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
                  <th>Country</th>
                </tr>
              </thead>
              <tbody>
                {currentData.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <div className="form-check">
                        <input className="form-check-input" type="checkbox" />
                      </div>
                    </td>
                    <td>
                      <a href="#">{item.name}</a>
                    </td>
                    <td>{item.username}</td>
                    <td>{item.last_active}</td>
                    <td>{item.date_registered}</td>
                    <td>
                      <a href="#">{item.email}</a>
                    </td>
                    <td>{item.orders}</td>
                    <td>${item.total_spend}.00</td>
                    <td>${item.aov}.00</td>
                    <td>{item.country}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <TableBottomControls
            indexOfFirstData={indexOfFirstData}
            indexOfLastData={indexOfLastData}
            dataList={dataList}
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            pageNumbers={pageNumbers}
          />
        </div>
      </div>
    </div>
  );
};
export default DefaultDataTable;
