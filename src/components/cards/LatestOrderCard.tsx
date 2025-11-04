import { logisticOrderTableData } from "../../data";
import { useEffect, useRef, useState } from "react";
import TableBottomControls from "../utils/TableBottomControls";

const LatestOrderCard = () => {
  // Table
  const [currentPage, setCurrentPage] = useState(1);
  const [dataList, setDataList] = useState(logisticOrderTableData);
  const [dataPerPage] = useState(10);

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

  //   Dropdown
  const [activeDropdown, setActiveDropdown] = useState<number | null>(null);
  const dropdownRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (activeDropdown !== null && dropdownRefs?.current[activeDropdown]) {
        if (
          !dropdownRefs?.current[activeDropdown]?.contains(event.target as Node)
        ) {
          setActiveDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [activeDropdown]);

  const toggleDropdown = (dropdown: number) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownButtonClick = (dropdown: number) => {
    toggleDropdown(dropdown);
    if (activeDropdown === dropdown) {
      setActiveDropdown(null);
    } else {
      setActiveDropdown(dropdown);
    }
  };

  return (
    <div className="card full-height latest-order-card">
      <div className="card-header-area flex-wrap">
        <h3 className="card-title mb-0">Latest Orders</h3>
      </div>

      <div className="table-responsive lastest-order-table">
        <table className="table mt-3" id="orderList">
          <thead>
            <tr>
              <th>Products</th>
              <th>Order ID</th>
              <th>Date</th>
              <th>Customer name</th>
              <th>Status</th>
              <th>Amount</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {currentData.map((item) => (
              <tr key={item.id}>
                <td>{item.latest_product}</td>
                <td>#{item.order_id}</td>
                <td>{item.date}</td>
                <td>{item.customer_name}</td>
                <td>
                  <span
                    className={`status ${
                      item.status === "Delivered"
                        ? "success"
                        : item.status === "Canceled"
                        ? "danger"
                        : item.status === "Pending"
                        ? "warning"
                        : ""
                    }`}
                  ></span>{" "}
                  {item.status}
                </td>
                <td>${item.amount}.00</td>
                <td>
                  <div
                    className="dropdown ms-3 dropstart"
                    ref={(ref) => (dropdownRefs.current[item.id] = ref)}
                  >
                    <button
                      className={`btn pe-0 ${
                        activeDropdown === item.id ? "show" : ""
                      }`}
                      onClick={() => handleDropdownButtonClick(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="21"
                        height="5"
                        viewBox="0 0 21 5"
                        fill="none"
                      >
                        <path
                          d="M2.42308 5C1.78044 5 1.16412 4.73661 0.709703 4.26777C0.255288 3.79893 0 3.16304 0 2.5C0 1.83696 0.255288 1.20107 0.709703 0.732233C1.16412 0.263392 1.78044 0 2.42308 0C3.06572 0 3.68204 0.263392 4.13645 0.732233C4.59087 1.20107 4.84615 1.83696 4.84615 2.5C4.84615 3.16304 4.59087 3.79893 4.13645 4.26777C3.68204 4.73661 3.06572 5 2.42308 5ZM10.5 5C9.85736 5 9.24104 4.73661 8.78662 4.26777C8.33221 3.79893 8.07692 3.16304 8.07692 2.5C8.07692 1.83696 8.33221 1.20107 8.78662 0.732233C9.24104 0.263392 9.85736 0 10.5 0C11.1426 0 11.759 0.263392 12.2134 0.732233C12.6678 1.20107 12.9231 1.83696 12.9231 2.5C12.9231 3.16304 12.6678 3.79893 12.2134 4.26777C11.759 4.73661 11.1426 5 10.5 5ZM18.5769 5C17.9343 5 17.318 4.73661 16.8635 4.26777C16.4091 3.79893 16.1538 3.16304 16.1538 2.5C16.1538 1.83696 16.4091 1.20107 16.8635 0.732233C17.318 0.263392 17.9343 0 18.5769 0C19.2196 0 19.8359 0.263392 20.2903 0.732233C20.7447 1.20107 21 1.83696 21 2.5C21 3.16304 20.7447 3.79893 20.2903 4.26777C19.8359 4.73661 19.2196 5 18.5769 5Z"
                          fill="#B3B9C6"
                        />
                      </svg>
                    </button>
                    <ul
                      className={`dropdown-menu ${
                        activeDropdown === item.id ? "show" : ""
                      }`}
                    >
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="ti ti-refresh"></i>Update
                        </a>
                      </li>
                      <li>
                        <a
                          className="dropdown-item"
                          role="button"
                          onClick={() => handleDelete(item.id)}
                        >
                          <i className="ti ti-trash"></i>Delete
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          <i className="ti ti-details"></i>Details
                        </a>
                      </li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <TableBottomControls
        indexOfFirstData={indexOfFirstData}
        indexOfLastData={indexOfLastData}
        dataList={dataList}
        currentPage={currentPage}
        totalPages={totalPages}
        paginate={paginate}
        pageNumbers={pageNumbers}
        hideInfo
      />
    </div>
  );
};
export default LatestOrderCard;
