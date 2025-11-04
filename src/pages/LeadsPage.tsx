import { useState } from "react";
import TableFilter from "../components/filter/TableFilter";
import TableHeader from "../components/header/table-header/TableHeader";
import LeadsTable from "../components/table/LeadsTable";
import { leadsData, leadsHeaderData } from "../data";
import TableBottomControls from "../components/utils/TableBottomControls";

const LeadsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const datalist = leadsData;
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
          <TableHeader tableHeading="Leads" tableHeaderData={leadsHeaderData} />

          <div className="panel-body">
            <TableFilter />

            <div className="table-responsive">
              <LeadsTable tableData={currentData} />
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
export default LeadsPage;
