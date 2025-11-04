import { useState } from "react";
import TableBottomControls from "../components/utils/TableBottomControls";
import { audienceData, audienceHeaderData } from "../data";
import TableHeader from "../components/header/table-header/TableHeader";
import TableFilter from "../components/filter/TableFilter";

import AudienceTable from "../components/table/AudienceTable";

const AudiencePage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [datalist, setDatalist] = useState(audienceData);
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
    updatedDataList[indexOfFirstData + index].checked =
      !updatedDataList[indexOfFirstData + index].checked;
    // Assuming you want to update datalist after changing isChecked
    setDatalist(updatedDataList);
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="Target Audience"
            tableHeaderData={audienceHeaderData}
          />

          <div className="panel-body">
            <TableFilter />

            <div className="table-responsive">
              <AudienceTable
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
export default AudiencePage;
