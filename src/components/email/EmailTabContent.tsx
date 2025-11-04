import { EmailDataType } from "../../types";
import AllEmailTabPane from "./tab-panes/AllEmailTabPane";
import DraftTabPane from "./tab-panes/DraftTabPane";
import ImportantTabPane from "./tab-panes/ImportantTabPane";
import InboxTabPane from "./tab-panes/InboxTabPane";
import SentTabPane from "./tab-panes/SentTabPane";
import SpamTabPane from "./tab-panes/SpamTabPane";
import StarredTabPane from "./tab-panes/StarredTabPane";
import TrashTabPane from "./tab-panes/TrashTabPane";
type Props = {
  tableData: EmailDataType[];
  indexOfFirstData: number;
  indexOfLastData: number;
  currentPage: number;
  totalPages: number;
  paginate: (pageNumber: number) => void;
  pageNumbers: number[];
  activeTab: string;
};
const EmailTabContent = ({
  tableData,
  indexOfFirstData,
  indexOfLastData,
  currentPage,
  totalPages,
  paginate,
  pageNumbers,
  activeTab,
}: Props) => {
  return (
    <div className="tab-content">
      <div
        className={`ar-tab-pane ${activeTab === "inbox" ? "active" : ""}`}
        id="nav-inbox"
      >
        <InboxTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>

      <div
        className={`ar-tab-pane ${activeTab === "starred" ? "active" : ""}`}
        id="nav-starred"
      >
        <StarredTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
      <div
        className={`ar-tab-pane ${activeTab === "trash" ? "active" : ""}`}
        id="nav-trash"
      >
        <TrashTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
      <div
        className={`ar-tab-pane ${activeTab === "sent" ? "active" : ""}`}
        id="nav-sent"
      >
        <SentTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
      <div
        className={`ar-tab-pane ${activeTab === "draft" ? "active" : ""}`}
        id="nav-draft"
      >
        <DraftTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
      <div
        className={`ar-tab-pane ${activeTab === "all" ? "active" : ""}`}
        id="nav-all-mail"
      >
        <AllEmailTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
      <div
        className={`ar-tab-pane ${activeTab === "spam" ? "active" : ""}`}
        id="nav-spam"
      >
        <SpamTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
      <div
        className={`ar-tab-pane ${activeTab === "important" ? "active" : ""}`}
        id="nav-important"
      >
        <ImportantTabPane
          tableData={tableData}
          indexOfFirstData={indexOfFirstData}
          indexOfLastData={indexOfLastData}
          currentPage={currentPage}
          totalPages={totalPages}
          paginate={paginate}
          pageNumbers={pageNumbers}
        />
      </div>
    </div>
  );
};
export default EmailTabContent;
