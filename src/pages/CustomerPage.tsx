import { useState } from "react";
import { customerData, customerHeaderData } from "../data";
import TableHeader from "../components/header/table-header/TableHeader";
import TableFilter from "../components/filter/TableFilter";
import TableBottomControls from "../components/utils/TableBottomControls";
import CustomerTable from "../components/table/CustomerTable";

const CustomerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [datalist, setDatalist] = useState(customerData);
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

  const handleCheckboxChange = (index: number) => {
    const updatedDataList = [...datalist];
    updatedDataList[indexOfFirstData + index].isChecked =
      !updatedDataList[indexOfFirstData + index].isChecked;
    // Assuming you want to update datalist after changing isChecked
    setDatalist(updatedDataList);
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="Customers"
            tableHeaderData={customerHeaderData}
          />

          <div className="panel-body">
            <TableFilter />

            <div className="table-responsive">
              <CustomerTable
                tableData={currentData}
                handleCheckboxChange={handleCheckboxChange}
              />
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
export default CustomerPage;
