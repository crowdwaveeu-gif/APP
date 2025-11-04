import { useState } from "react";
import { allEmployeeHeaderData, employeeData } from "../data";
import TableHeader from "../components/header/table-header/TableHeader";
import TableFilter2 from "../components/filter/TableFilter2";
import AllEmployeeTable from "../components/table/AllEmployeeTable";
import TableBottomControls from "../components/utils/TableBottomControls";

const AllEmployeePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const datalist = employeeData;
  const dataPerPage = 10;
  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = datalist.slice(indexOfFirstData, indexOfLastData);

  const totalPages = Math.ceil(datalist.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Employee"
            tableHeaderData={allEmployeeHeaderData}
          />

          <div className="panel-body">
            <TableFilter2 showStatus />

            <div className="table-responsive">
              <AllEmployeeTable tableData={currentData} />
            </div>

            <TableBottomControls
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              dataList={datalist}
              currentPage={currentPage}
              totalPages={totalPages}
              paginate={paginate}
              pageNumbers={pageNumbers}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default AllEmployeePage;
