import { useState } from "react";
import { EmailDataType } from "../../../types";
import EmailTableFilterOption from "../../filter/EmailTableFilterOption";
import EmailTableHeader from "../../header/table-header/EmailTableHeader";
import EmailTable from "../../table/EmailTable";
import EmailDetails from "../EmailDetails";
import TableBottomControls from "../../utils/TableBottomControls";
type Props = {
  tableData: EmailDataType[];
  indexOfFirstData: number;
  indexOfLastData: number;
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  pageNumbers: number[];
};
const InboxTabPane = ({
  tableData,
  indexOfFirstData,
  indexOfLastData,
  currentPage,
  totalPages,
  pageNumbers,
  paginate,
}: Props) => {
  const [activeTab, setActiveTab] = useState<string>("tab-1");
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };
  const [openDetails, setOpenDetails] = useState<boolean>(false);
  const toggleDetails = () => {
    setOpenDetails(!openDetails);
  };
  const closeDetails = () => {
    setOpenDetails(false);
  };
  return (
    <>
      <EmailTableHeader title="Inbox" />
      <div className="panel-body">
        <div className="product-table-quantity d-flex flex-wrap align-items-center gap-2 mb-4">
          <ul className="mb-0">
            <li className="text-white">All (23)</li>
            <li>Unread (19)</li>
            <li>Draft (05)</li>
            <li>Trush (05)</li>
          </ul>
        </div>
        <EmailTableFilterOption
          hideLength
          toggle={toggleTab}
          activeTab={activeTab}
          showTabBtns
        />

        <div
          className="tab-content email-tab-content overflow-hidden"
          id="nav-tabContent"
        >
          <div
            className={`ar-tab-pane ${activeTab === "tab-1" ? "active" : ""}`}
            id="nav-primary"
          >
            <div
              className={`table-wrapper ${openDetails ? "mail-opened" : ""}`}
            >
              <div className="mail-list table-responsive">
                <EmailTable
                  tableData={tableData}
                  toggleDetails={toggleDetails}
                />
              </div>
              {openDetails && <EmailDetails closeModal={closeDetails} />}
            </div>
          </div>
          <div
            className={`ar-tab-pane ${activeTab === "tab-2" ? "active" : ""}`}
            id="nav-promotion"
          >
            <div
              className={`table-wrapper ${openDetails ? "mail-opened" : ""}`}
            >
              <div className="mail-list table-responsive">
                <EmailTable
                  tableData={tableData}
                  toggleDetails={toggleDetails}
                />
              </div>
              {openDetails && <EmailDetails closeModal={closeDetails} />}
            </div>
          </div>
          <div
            className={`ar-tab-pane ${activeTab === "tab-3" ? "active" : ""}`}
            id="nav-social"
          >
            <div
              className={`table-wrapper ${openDetails ? "mail-opened" : ""}`}
            >
              <div className="mail-list table-responsive">
                <EmailTable
                  tableData={tableData}
                  toggleDetails={toggleDetails}
                />
              </div>
              {openDetails && <EmailDetails closeModal={closeDetails} />}
            </div>
          </div>
          <div
            className={`ar-tab-pane ${activeTab === "tab-4" ? "active" : ""}`}
            id="nav-updates"
          >
            <div
              className={`table-wrapper ${openDetails ? "mail-opened" : ""}`}
            >
              <div className="mail-list table-responsive">
                <EmailTable
                  tableData={tableData}
                  toggleDetails={toggleDetails}
                />
              </div>
              {openDetails && <EmailDetails closeModal={closeDetails} />}
            </div>
          </div>
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
export default InboxTabPane;
