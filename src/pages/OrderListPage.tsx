import { useState } from "react";
import { orderListData, orderListHeaderData } from "../data";
import TableHeader from "../components/header/table-header/TableHeader";
import TableFilter2 from "../components/filter/TableFilter2";
import OrderListTable from "../components/table/OrderListTable";
import TableBottomControls from "../components/utils/TableBottomControls";

const OrderListPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState(orderListData);

  // Pagination logic
  const indexOfLastData = currentPage * dataPerPage;
  const indexOfFirstData = indexOfLastData - dataPerPage;
  const currentData = dataList.slice(indexOfFirstData, indexOfLastData);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  // Calculate total number of pages
  const totalPages = Math.ceil(dataList.length / dataPerPage);
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  // Delete function
  const handleDelete = (id: number) => {
    const updatedDataList = dataList.filter((item) => item.order_id !== id);
    setDataList(updatedDataList);
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Order"
            tableHeaderData={orderListHeaderData}
          />

          <div className="panel-body">
            <div className="product-table-quantity d-flex justify-content-between align-items-center mb-4">
              <ul className="mb-0">
                <li className="text-white">All (23)</li>
                <li>Pending (19)</li>
                <li>Draft (05)</li>
                <li>Trash (05)</li>
              </ul>
              <div className="btn-box d-lg-flex d-none gap-2">
                <button
                  className="btn btn-sm btn-icon btn-light"
                  title="Download Excel"
                  id="downloadExcel"
                >
                  <i className="fa-light h6 fa-file-spreadsheet"></i>
                </button>
                <button
                  className="btn btn-sm btn-icon btn-light"
                  title="Download PDF"
                  id="downloadPdf"
                >
                  <i className="fa-light h6 fa-file-pdf"></i>
                </button>
              </div>
            </div>

            <TableFilter2 showMultipleAction showOrder showDatePicker />

            <div className="table-responsive">
              <OrderListTable
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
export default OrderListPage;
