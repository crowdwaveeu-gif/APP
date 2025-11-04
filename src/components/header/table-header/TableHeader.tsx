import { useEffect, useRef, useState } from "react";
import { TableHeaderDataType } from "../../../types";
import { useAppDispatch } from "../../../redux/hooks";
import { toggleAddTaskModalOpen } from "../../../redux/features/addTaskModalSlice";
import { Link } from "react-router-dom";
type Props = {
  tableHeaderData: TableHeaderDataType[];
  tableHeading: string;
  showAddBtn?: boolean;
  showAddLink?: boolean;
};
const TableHeader = ({
  tableHeaderData,
  tableHeading,
  showAddBtn,
  showAddLink,
}: Props) => {
  const dispatch = useAppDispatch();
  const openAddModal = () => {
    dispatch(toggleAddTaskModalOpen());
  };
  // Table Filter Header
  const [filterDropdown, setFilterDropdown] = useState<boolean>(false);
  const headerFilterRef = useRef<HTMLDivElement>(null);

  const toggleFilterDropdown = () => {
    setFilterDropdown((prevState) => !prevState);
  };

  const handleHeaderFilterClickOutside = (event: MouseEvent) => {
    if (
      headerFilterRef.current &&
      !headerFilterRef.current.contains(event.target as Node)
    ) {
      setFilterDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleHeaderFilterClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleHeaderFilterClickOutside);
    };
  }, []);
  return (
    <div className="panel-header">
      <h5>{tableHeading}</h5>

      <div className="btn-box d-flex gap-2">
        <div className="tableSearch" id="tableSearch">
          <label>
            <input
              type="search"
              className="form-control"
              placeholder="Search..."
              aria-controls="targetAudienceTable"
            />
          </label>
        </div>

        <button className="btn btn-sm btn-icon btn-primary">
          <i className="fa-light fa-arrows-rotate"></i>
        </button>

        <div className="digi-dropdown dropdown dropstart" ref={headerFilterRef}>
          <button
            className="btn btn-sm btn-icon btn-primary"
            onClick={toggleFilterDropdown}
          >
            <i className="fa-regular fa-ellipsis-vertical"></i>
          </button>

          <ul
            className={`digi-dropdown-menu dropdown-menu ${
              filterDropdown ? "show" : ""
            }`}
          >
            <li className="dropdown-title">Show Table Title</li>
            {tableHeaderData.map((item) => (
              <li key={item.id}>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={item.inputId}
                  />
                  <label className="form-check-label" htmlFor={item.inputId}>
                    {item.label}
                  </label>
                </div>
              </li>
            ))}

            <li className="dropdown-title pb-1">Showing</li>
            <li>
              <div className="input-group">
                <input
                  type="number"
                  className="form-control w-50"
                  placeholder="10"
                />
                <button className="btn btn-primary w-50">Apply</button>
              </div>
            </li>
          </ul>
        </div>
        {showAddBtn && (
          <button
            className="btn btn-icon btn-sm btn-primary"
            onClick={openAddModal}
          >
            <i className="fa-light fa-plus"></i>
          </button>
        )}
        {showAddLink && (
          <Link className="btn btn-icon btn-sm btn-primary" to={"/add-product"}>
            <i className="fa-light fa-plus"></i>
          </Link>
        )}
      </div>
    </div>
  );
};
export default TableHeader;
