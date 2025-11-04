import { useState } from "react";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import { allCustomerData, allCustomerHeaderData } from "../data";
import AllCustomerTable from "../components/table/AllCustomerTable";
import TableBottomControls from "../components/utils/TableBottomControls";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";

const AllCustomerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const datalist = allCustomerData;
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
            tableHeading="All Customer"
            tableHeaderData={allCustomerHeaderData}
          />

          <div className="panel-body">
            <div className="product-table-quantity d-flex justify-content-between align-items-center mb-4">
              <ul className="mb-0">
                <li className="text-white">All (23)</li>
                <li>Pending (19)</li>
                <li>Draft (05)</li>
                <li>Trush (05)</li>
              </ul>

              <div className="btn-box d-md-flex d-none gap-2">
                <button
                  className="btn btn-sm btn-icon btn-light"
                  id="downloadExcel"
                >
                  <i className="ti ti-file-spreadsheet"></i>
                </button>
                <button
                  className="btn btn-sm btn-icon btn-light"
                  id="downloadPdf"
                >
                  <i className="ti ti-file-type-pdf"></i>
                </button>
              </div>
            </div>

            <TableFilter2 showDatePicker showStatus />

            <div className="table-responsive">
              <OverlayScrollbarsComponent>
                <AllCustomerTable tableData={currentData} />
              </OverlayScrollbarsComponent>
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
export default AllCustomerPage;
