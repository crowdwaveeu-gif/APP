import { useState } from "react";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import { attendanceData, attendanceHeaderData } from "../data";
import { AttendanceDataType } from "../types";
import AttendanceTable from "../components/table/AttendanceTable";
import TableBottomControls from "../components/utils/TableBottomControls";

const AttendancePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] =
    useState<AttendanceDataType[]>(attendanceData);

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

  const handleDelete = (id: number) => {
    setDataList((prevData) =>
      prevData.filter((data) => data.employeeId !== id)
    );
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="Attendance"
            tableHeaderData={attendanceHeaderData}
          />

          <div className="panel-body">
            <TableFilter2 showEmployee showDatePicker />

            <div className="table-responsive">
              <AttendanceTable
                tableData={currentData}
                handleDelete={handleDelete}
              />
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
    </div>
  );
};
export default AttendancePage;
