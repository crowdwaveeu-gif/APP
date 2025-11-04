import { useState } from "react";
import TableFilter2 from "../components/filter/TableFilter2";
import TableHeader from "../components/header/table-header/TableHeader";
import AllProductTable from "../components/table/AllProductTable";
import { allProductData, allProductHeaderData } from "../data";
import TableBottomControls from "../components/utils/TableBottomControls";

const AllProductPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [dataPerPage] = useState(10);
  const [dataList, setDataList] = useState(allProductData);

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
    const updatedDataList = dataList.filter((item) => item.id !== id);
    setDataList(updatedDataList);
  };
  return (
    <div className="row g-4">
      <div className="col-12">
        <div className="panel">
          <TableHeader
            tableHeading="All Products"
            tableHeaderData={allProductHeaderData}
            showAddLink
          />

          <div className="panel-body">
            <div className="product-table-quantity">
              <ul>
                <li className="text-white">All (23)</li>
                <li>Published (19)</li>
                <li>Draft (05)</li>
                <li>Trush (05)</li>
              </ul>
            </div>

            <TableFilter2 showCategory showProductType showProductStock />

            <div className="table-responsive">
              <AllProductTable
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
export default AllProductPage;
