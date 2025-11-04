import { useState } from "react";
import { EmailDataType } from "../../../types";
import EmailTableFilterOption from "../../filter/EmailTableFilterOption";
import EmailTableHeader from "../../header/table-header/EmailTableHeader";
import EmailTable from "../../table/EmailTable";
import TableBottomControls from "../../utils/TableBottomControls";
import EmailDetails from "../EmailDetails";
type Props = {
  tableData: EmailDataType[];
  indexOfFirstData: number;
  indexOfLastData: number;
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  pageNumbers: number[];
};
const TrashTabPane = ({
  tableData,
  indexOfFirstData,
  indexOfLastData,
  currentPage,
  totalPages,
  pageNumbers,
  paginate,
}: Props) => {
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const toggleDetails = () => {
    setOpenDetails(!openDetails);
  };
  const closeDetails = () => {
    setOpenDetails(false);
  };
  return (
    <>
      <EmailTableHeader title="Trash" />

      <div className="panel-body">
        <div className="product-table-quantity d-flex flex-wrap align-items-center gap-2 mb-4">
          <ul className="mb-0">
            <li className="text-white">All (23)</li>
            <li>Unread (19)</li>
            <li>Draft (05)</li>
            <li>Trush (05)</li>
          </ul>
        </div>
        <EmailTableFilterOption />
        <div className={`table-wrapper ${openDetails ? "mail-opened" : ""}`}>
          <div className="mail-list table-responsive">
            <EmailTable tableData={tableData} toggleDetails={toggleDetails} />
          </div>
          {openDetails && <EmailDetails closeModal={closeDetails} />}
        </div>
        <TableBottomControls
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          dataList={tableData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
    </>
  );
};
export default TrashTabPane;
