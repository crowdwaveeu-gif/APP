import { useState } from "react";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import TaskTable from "../components/table/TaskTable";
import { taskData, taskHeaderData } from "../data";
import TableBottomControls from "../components/utils/TableBottomControls";

const TaskPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState(taskData);

  const handleDelete = (id: number) => {
    // Filter out the deleted item from the dataList
    const updatedDataList = dataList.filter((data) => data.id !== id);
    // Update the dataList state with the updated data
    setDataList(updatedDataList);
  };

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="Task Summary"
            tableHeaderData={taskHeaderData}
            showAddBtn
          />

          <div className="panel-body">
            <TableFilter2 showStatus showDatePicker showPriority />

            <div className="table-responsive">
              <TaskTable tableData={currentData} handleDelete={handleDelete} />
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
export default TaskPage;
