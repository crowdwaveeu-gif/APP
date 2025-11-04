import { useState } from "react";
import { emailData } from "../data";
import EmailLeftActions from "../components/email/EmailLeftActions";
import EmailTabContent from "../components/email/EmailTabContent";

const EmailPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const dataList = emailData;

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

  // Tab
  const [activeTab, setActiveTab] = useState<string>("inbox");
  const toggleTab = (tab: string) => {
    setActiveTab(tab);
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="email-panel d-flex rounded">
          <div className="panel rounded-0 border-end">
            <EmailLeftActions activeTab={activeTab} toggle={toggleTab} />
          </div>
          <div className="panel rounded-0">
            <EmailTabContent
              tableData={currentData}
              indexOfFirstData={indexOfFirstData}
              indexOfLastData={indexOfLastData}
              pageNumbers={pageNumbers}
              paginate={paginate}
              totalPages={totalPages}
              currentPage={currentPage}
              activeTab={activeTab}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default EmailPage;
