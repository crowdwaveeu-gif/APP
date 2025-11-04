import { useEffect, useRef, useState } from "react";
import DefinedRangeCalender from "../calender/DefinedRangeCalender";
import BulkActions from "../utils/dropdowns/BulkActions";
import EmployeeLength from "../utils/dropdowns/EmployeeLength";
import EmployeeOptions from "../utils/dropdowns/EmployeeOptions";
import StatusOptions from "../utils/dropdowns/StatusOptions";
import PriorityOptions from "../utils/dropdowns/PriorityOptions";
import CategoryList from "../utils/dropdowns/CategoryList";
import ProductType from "../utils/dropdowns/ProductType";
import ProductStock from "../utils/dropdowns/ProductStock";
import BulkMultipleActions from "../utils/dropdowns/BulkMultipleActions";
import OrderDropdown from "../utils/dropdowns/OrderDropdown";

type Props = {
  showPriority?: boolean;
  showStatus?: boolean;
  showDatePicker?: boolean;
  showEmployee?: boolean;
  showCategory?: boolean;
  showProductType?: boolean;
  showProductStock?: boolean;
  showMultipleAction?: boolean;
  showOrder?: boolean;
};
const TableFilter2 = ({
  showDatePicker,
  showPriority,
  showStatus,
  showEmployee,
  showCategory,
  showProductStock,
  showProductType,
  showMultipleAction,
  showOrder,
}: Props) => {
  // Define state for the selected values
  const [activeDropdown, setActiveDropdown] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setActiveDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const toggleDropdown = () => {
    setActiveDropdown((state) => !state);
  };
  return (
    <div className="table-filter-option" id="tableFilter-2">
      <div className="row align-items-center g-3">
        <div className="col-12 col-lg-9 col-xl-10">
          <div className="row g-3">
            <div className="col">
              <form className="row g-2">
                <div className="col">
                  {showMultipleAction ? (
                    <BulkMultipleActions />
                  ) : (
                    <BulkActions />
                  )}
                </div>
                <div className="col">
                  <button className="btn btn-primary w-100">Apply</button>
                </div>
              </form>
            </div>

            {showCategory && (
              <div className="col">
                <CategoryList />
              </div>
            )}
            {showOrder && (
              <div className="col">
                <OrderDropdown />
              </div>
            )}
            {showProductType && (
              <div className="col">
                <ProductType />
              </div>
            )}
            {showProductStock && (
              <div className="col">
                <ProductStock />
              </div>
            )}
            {showEmployee && (
              <div className="col">
                <EmployeeOptions />
              </div>
            )}
            {showStatus && (
              <div className="col">
                <StatusOptions />
              </div>
            )}

            {showDatePicker && (
              <div className="col position-relative">
                <DefinedRangeCalender />
              </div>
            )}

            {showPriority && (
              <div className="col">
                <PriorityOptions />
              </div>
            )}

            <div className="col">
              <button className="btn btn-primary h-100">
                <i className="fa-light fa-filter me-1"></i>
                Filter
              </button>
            </div>

            <div className="col">
              <div className="digi-dropdown dropdown" ref={dropdownRef}>
                <button
                  className={`btn btn-primary ${activeDropdown ? "show" : ""}`}
                  onClick={toggleDropdown}
                >
                  <i className="fa-regular fa-plus"></i>
                </button>
                <ul className={`dropdown-menu ${activeDropdown ? "show" : ""}`}>
                  <li className="dropdown-title">Filter Options</li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterTaskStatus"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterTaskStatus"
                      >
                        Task Status
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterDateRange"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterDateRange"
                      >
                        Date Range
                      </label>
                    </div>
                  </li>
                  <li>
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        id="filterTaskPriority"
                      />
                      <label
                        className="form-check-label"
                        htmlFor="filterTaskPriority"
                      >
                        Task Priority
                      </label>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="col-12 col-lg-3 col-xl-2 d-flex justify-content-end">
          <div id="employeeTableLength">
            <label className="d-flex align-items-center gap-2">
              <EmployeeLength />
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TableFilter2;
