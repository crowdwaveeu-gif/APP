type Props<T> = {
  indexOfFirstData: number;
  indexOfLastData: number;
  dataList: T[];
  currentPage: number;
  paginate: (pageNumber: number) => void;
  pageNumbers: number[];
  totalPages: number;
  hideInfo?: boolean;
};

const TableBottomControls = <T,>({
  indexOfFirstData,
  indexOfLastData,
  dataList,
  currentPage,
  paginate,
  pageNumbers,
  totalPages,
  hideInfo,
}: Props<T>) => {
  return (
    <div className="table-bottom-control">
      {!hideInfo && (
        <div className="dataTables_info">
          Showing {indexOfFirstData + 1} to{" "}
          {indexOfLastData > dataList.length
            ? dataList.length
            : indexOfLastData}{" "}
          of {dataList.length}
        </div>
      )}
      <div className="dataTables_paginate paging_simple_numbers">
        <button
          className={`btn btn-primary previous ${
            currentPage === 1 ? "disabled" : ""
          }`}
          disabled={currentPage === 1}
          onClick={() => paginate(currentPage - 1)}
        >
          <i className="fa-light fa-angle-left"></i>
        </button>
        {pageNumbers.map((number, index) => (
          <button
            key={index}
            className={`btn btn-primary ${
              currentPage === number ? "current" : ""
            }`}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        <button
          className={`btn btn-primary next ${
            currentPage === totalPages ? "disabled" : ""
          }`}
          disabled={currentPage === totalPages}
          onClick={() => paginate(currentPage + 1)}
        >
          <i className="fa-light fa-angle-right"></i>
        </button>
      </div>
    </div>
  );
};
export default TableBottomControls;
